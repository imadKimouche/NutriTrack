import SQLite from 'react-native-sqlite-storage';
import {Ingredient} from '../hooks/meal';
import {Recipe, SearchRecipe} from '../screens/Recipes/RecipesResultsScreen';

export class Database {
  private static instance: SQLite.SQLiteDatabase | null = null;
  private static DATABASE_NAME = 'recipes.db';

  public static async getInstance() {
    if (Database.instance === null) {
      SQLite.enablePromise(true);
      Database.instance = await SQLite.openDatabase(
        {name: this.DATABASE_NAME, createFromLocation: 1},
        () => console.log('database open'),
        () => console.log('database open error'),
      );
    }
    return Database.instance;
  }
}

export async function searchIngredient(text?: string) {
  if (text === undefined || text.trim().length === 0) {
    return;
  }

  const db = await Database.getInstance();
  const ingredients: Ingredient[] = [];

  const results = await db.executeSql("SELECT id, name, image, unit FROM Ingredient WHERE name LIKE '%' || ? || '%';", [text]);
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      ingredients.push({id: row.id, name: row.name, image: row.image, unit: row.unit});
    }
  });

  return ingredients;
}

export async function searchRecipe(ingredients: Ingredient[], offset: number = 0, limit: number = 10) {
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
	  LIMIT ${limit} OFFSET ${offset * limit};`;

  const db = await Database.getInstance();
  const results = await db.executeSql(query);

  const recipes: SearchRecipe[] = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      recipes.push({
        id: row.id,
        name: row.name,
        image: row.image,
        quantity: row.quantity,
        time: row.time,
        matching_ingredients_count: row.matching_ingredients_count,
        missing_ingredients: row.missing_ingredients,
        isFavorite: row.is_favorite === 1,
      });
    }
  });

  return {recipes, offset};
}

export async function getRecipe(id: number) {
  if (!id) {
    return;
  }

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

  // TODO: protect id here: potential sql injections ?

  const db = await Database.getInstance();

  const results = await db.executeSql(query);
  // const recipe: CompleteRecipe;
  if (results && results[0]) {
    const data = results[0].rows.raw();
    return data;
    // let completeRecipe: CompleteRecipe = {
    //   id: 0,
    //   name: '',
    //   image: '',
    //   quantity: 0,
    //   time: '',
    //   ingredients: [],
    //   steps: [],
    //   isFavorite: false,
    // };
    // if (raw.rows.length) {
    //   completeRecipe.id = raw.rows.item(0).recipe_id;
    //   completeRecipe.name = raw.rows.item(0).recipe_name;
    //   completeRecipe.image = raw.rows.item(0).recipe_image;
    //   completeRecipe.quantity = raw.rows.item(0).recipe_quantity;
    //   completeRecipe.isFavorite = raw.rows.item(0).recipe_is_favorite;
    //   completeRecipe.time = raw.rows.item(0).recipe_time;
    //   completeRecipe.steps = raw.rows
    //     .item(0)
    //     .recipe_instructions.split('\n')
    //     .filter((s: string) => s.trim() !== '');

    //   for (let i = 0; i < raw.rows.length; i++) {
    //     const row = raw.rows.item(i);
    //     completeRecipe.ingredients.push({
    //       id: row.ingredient_id,
    //       name: row.ingredient_name,
    //       image: row.ingredient_image,
    //       unit: row.ingredient_unit,
    //       quantity: row.ingredient_quantity,
    //     });
    //   }
  }
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
