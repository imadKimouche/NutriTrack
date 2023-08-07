import SQLite from 'react-native-sqlite-storage';
import {Ingredient} from '../hooks/meal';

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

export function getRecipe(
  id: number,
): Promise<{recipe: SQLite.ResultSet; ingredients: SQLite.ResultSet; steps: SQLite.ResultSet}> {
  const queryRecipe = `SELECT * FROM recipe WHERE id = ${id}`;
  const queryRecipeIngredients = `SELECT * FROM m_recipe_ingredient WHERE recipe_id = ${id}`;
  const queryRecipeSteps = `SELECT * FROM m_step WHERE recipe_id = ${id}`;

  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        queryRecipe,
        [],
        (tx1, recipe) => {
          tx1.executeSql(
            queryRecipeIngredients,
            [],
            (tx2, ingredients) => {
              tx2.executeSql(
                queryRecipeSteps,
                [],
                (_, steps) => {
                  resolve({recipe, ingredients, steps});
                },

                (_, err) => {
                  if (err) {
                    reject('getRecipe' + err.message);
                  }
                },
              );
            },
            (_, err) => {
              if (err) {
                reject('getRecipe' + err.message);
              }
            },
          );
        },
        (_, err) => {
          if (err) {
            reject('getRecipe' + err.message);
          }
        },
      );
    });
  });
}
