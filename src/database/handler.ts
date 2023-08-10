import SQLite from 'react-native-sqlite-storage';
import {Ingredient} from '../hooks/meal';
import {Recipe} from '../screens/Recipes/RecipesResultsScreen';

function onDatabaseOpenSuccess() {
  console.log('database open');
}

function onDatabaseOpenError(err: SQLite.SQLError) {
  console.log(`database open error ${err.code}: ${err.message}`);
}

const databaseName = 'recipes.db';
const db = SQLite.openDatabase({name: databaseName, createFromLocation: 1}, onDatabaseOpenSuccess, onDatabaseOpenError);

export function searchIngredient(text?: string): Promise<SQLite.ResultSet | []> {
  return new Promise((resolve, reject) => {
    if (text === undefined || text.trim().length === 0) {
      resolve([]);
    }
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        `
		SELECT
		  id,
		  name,
		  image,
		  unit
		FROM
		  Ingredient
		WHERE
		  name LIKE '%' || ? || '%';
	`,
        [text],
        (_, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export function searchRecipe(ingredients: Ingredient[], page: number, itemsPerPage: number = 10): Promise<SQLite.ResultSet | []> {
  const ingredientsStr = ingredients.map(ingredient => `'${ingredient.name}'`).join(', ');
  const query = `
  				SELECT
				  r.id,
				  r.name,
				  r.image,
				  r.quantity,
				  r.time,
				  COUNT(ri.ingredient_id) AS matching_ingredients_count,
				  (
					SELECT
					  GROUP_CONCAT(i.name)
					FROM
					  Ingredient AS i
					WHERE
					  i.name IN (${ingredientsStr}) 
					  AND i.id NOT IN (SELECT ingredient_id FROM Recipe_Ingredients WHERE recipe_id = r.id)
				  ) AS missing_ingredients
					FROM
					  Recipe AS r
					INNER JOIN
					  Recipe_Ingredients AS ri ON r.id = ri.recipe_id
					INNER JOIN
					  Ingredient AS i ON ri.ingredient_id = i.id
					WHERE
					  i.name IN (${ingredientsStr}) 
					GROUP BY
					  r.id
					ORDER BY
					  matching_ingredients_count DESC
	  LIMIT ${itemsPerPage} OFFSET ${(page - 1) * itemsPerPage};`;

  return new Promise((resolve, reject) => {
    if (ingredients.length === 0) {
      resolve([]);
    }
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        query,
        [],
        (_, results) => {
          resolve(results);
        },
        (_, err) => {
          if (err) {
            reject('searchRecipe' + err.message);
          }
        },
      );
    });
  });
}

export function getRecipe(id: number): Promise<SQLite.ResultSet> {
  const query = `
			SELECT
				r.id AS recipe_id,
				r.name AS recipe_name,
				r.image AS recipe_image,
				r.quantity AS recipe_quantity,
				r.time AS recipe_time,
				r.is_favorite AS recipe_is_favorite,
				r.instructions AS recipe_instructions,
				i.id AS ingredient_id,
				i.name AS ingredient_name,
				i.image AS ingredient_image,
				i.unit AS ingredient_unit,
				ri.quantity AS ingredient_quantity
			FROM
				Recipe AS r
			JOIN
				Recipe_Ingredients AS ri ON r.id = ri.recipe_id
			JOIN
				Ingredient AS i ON ri.ingredient_id = i.id
			WHERE
				r.id = ${id};`;

  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        query,
        [],
        (_, results) => resolve(results),
        (_, err) => {
          if (err) {
            reject('getRecipe' + err.message);
          }
        },
      );
    });
  });
}

export async function getFavoriteRecipes() {
  const query = 'SELECT * FROM Recipe AS r WHERE r.is_favorite = 1;';
  const result: SQLite.ResultSet = await new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        query,
        [],
        (_, results) => resolve(results),
        (_, err) => {
          if (err) {
            reject('getRecipe' + err.message);
          }
        },
      );
    });
  });

  const recipes: Recipe[] = [];
  if (result && result.rows.length) {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      recipes.push({
        id: row.id,
        name: row.name,
        image: row.image,
        quantity: row.quantity,
        time: row.time,
        isFavorite: row.is_favorite === 1,
      });
    }
  }
  return recipes;
}

export async function toggleRecipeFavoriteStatus(id: number): Promise<boolean> {
  const selectQuery = 'SELECT is_favorite FROM Recipe WHERE id = ?';
  const updateQuery = 'UPDATE Recipe SET is_favorite = ? WHERE id = ?;';

  return await new Promise(resolve => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        selectQuery,
        [id],
        (tx1, selectResult) => {
          if (selectResult && selectResult.rows.length) {
            console.log('getRecipe', selectResult.rows.raw());
            const isFavoriteValue = selectResult.rows.item(0).is_favorite;
            tx1.executeSql(
              updateQuery,
              [isFavoriteValue === 0 ? 1 : 0, id],
              (_, __) => {
                resolve(true);
              },
              (_, err) => {
                if (err) {
                  resolve(false);
                }
              },
            );
          } else {
            resolve(false);
          }
        },
        (_, err) => {
          if (err) {
            resolve(false);
          }
        },
      );
    });
  });
}
