import {Database, queryGetAll} from '.';
import {Ingredient} from '../hooks/meal';
import {Recipe, SearchRecipe} from '../screens/Recipes/RecipesResultsScreen';

export async function searchIngredient(text?: string, limit: number = 10) {
  if (text === undefined || text.trim().length === 0) {
    return;
  }

  const ingredientTransformer = (rawIngredient: any) => {
    return {
      id: rawIngredient.id,
      name: rawIngredient.name,
      image: rawIngredient.image,
      unit: rawIngredient.unit,
      quantity: rawIngredient.quantity ?? undefined,
    } as Ingredient;
  };

  const ingredients = await queryGetAll(
    "SELECT id, name, image, unit FROM Ingredient WHERE name LIKE '%' || ? || '%' LIMIT ?;",
    [text, limit],
    ingredientTransformer,
  );

  return ingredients;
}

export async function findRecipe(ingredients: Ingredient[], offset: number = 0, limit: number = 10) {
  const ingredientsStr = ingredients.map(ingredient => `'${ingredient.name}'`).join(', ');
  const query = `
  				SELECT
				  r.id as id,
				  r.name as name,
				  r.image as image,
				  r.quantity as quantity,
				  r.time as time,
          r.is_favorite as is_favorite,
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

  const recipes = await queryGetAll(
    query,
    [],
    raw =>
      ({
        id: raw.id,
        name: raw.name,
        image: raw.image,
        quantity: raw.quantity,
        time: raw.time,
        matching_ingredients_count: raw.matching_ingredients_count,
        missing_ingredients: raw.missing_ingredients,
        isFavorite: raw.is_favorite === 1,
      } as SearchRecipe),
  );

  return {recipes, offset};
}

export async function getRecipe(id: number) {
  if (!id) {
    return;
  }

  const query = `
			SELECT
				r.id AS id,
				r.name AS name,
				r.image AS image,
				r.quantity AS quantity,
				r.time AS time,
				r.is_favorite AS is_favorite,
				r.instructions AS instructions,
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

  type RecipeSearchRow = Recipe & {
    ingrId: number;
    ingrName: string;
    ingrImage: string;
    ingrUnit: string;
    ingrQuantity: number;
    instructions: string;
  };
  const recipeTransformer = (raw: any) => {
    return {
      id: raw.id,
      name: raw.name,
      image: raw.image,
      quantity: raw.quantity,
      time: raw.time,
      isFavorite: raw.is_favorite,
      ingrId: raw.ingredient_id,
      ingrName: raw.ingredient_name,
      ingrImage: raw.ingredient_image,
      ingrUnit: raw.ingredient_unit,
      ingrQuantity: raw.ingredient_quantity,
      instructions: raw.instructions,
    } as RecipeSearchRow;
  };

  const recipes = await queryGetAll<RecipeSearchRow>(query, [], recipeTransformer);

  if (recipes.length !== 0) {
    return {
      id: recipes[0].id,
      name: recipes[0].name,
      image: recipes[0].image,
      quantity: recipes[0].quantity,
      time: recipes[0].time,
      isFavorite: recipes[0].isFavorite,
      ingredients: recipes.map(r => ({
        id: r.ingrId,
        name: r.ingrName,
        image: r.ingrImage,
        unit: r.ingrUnit,
        quantity: r.ingrQuantity,
      })),
      steps: recipes[0].instructions
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean),
    };
  }
}

export async function getFavoriteRecipes() {
  const query = 'SELECT * FROM Recipe AS r WHERE r.is_favorite = 1;';
  const recipes = await queryGetAll<Recipe>(query, [], raw => ({
    id: raw.id,
    name: raw.name,
    image: raw.image,
    quantity: raw.quantity,
    time: raw.time,
    isFavorite: raw.is_favorite,
  }));

  return recipes;
}

export async function toggleRecipeFavoriteStatus(id: number) {
  const selectQuery = 'SELECT is_favorite FROM Recipe WHERE id = ?';
  const updateQuery = 'UPDATE Recipe SET is_favorite = ? WHERE id = ?;';

  const db = await Database.getInstance();
  return db.transaction(tx => {
    tx.executeSql(selectQuery, [id], (_, result) => {
      const isFavorite = !!result.rows.item(0).is_favorite;
      tx.executeSql(updateQuery, [!isFavorite, id]);
    });
  });
}
