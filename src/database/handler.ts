import SQLite from 'react-native-sqlite-storage';
import {Ingredient} from '../hooks/meal';

function onDatabaseOpenSuccess() {
  console.log('database open');
}

function onDatabaseOpenError(err: SQLite.SQLError) {
  console.log(`database open error ${err.code}: ${err.message}`);
}

const databaseName = 'anses_ciqual';
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
		  alim_code,
		  nom_fr
		FROM
		  aliment
		WHERE
		  nom_fr LIKE '%' || ? || '%';
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
  const query = `SELECT
		r.id, 
		r.name, 
		r.photo, 
		r.quantity, 
		r.time,
		COUNT(ri.alim_code) AS matching_ingredients_count
	  FROM
		m_recipe AS r
	  INNER JOIN
		m_recipe_ingredient AS ri ON r.id = ri.recipe_id
	  INNER JOIN
		aliment AS a ON ri.alim_code = a.alim_code
	  WHERE
		a.nom_fr IN (${ingredients.map(ingredient => `'${ingredient.name}'`).join(', ')})
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
          console.log('query result', results);
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
