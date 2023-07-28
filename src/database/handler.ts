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
  const query = `SELECT r.name, ri.alim_nom_fr FROM m_recipe as r LEFT JOIN m_recipe_ingredient AS ri ON r.id = ri.recipe_id WHERE id = ${id}`;
  // const query = `SELECT
  // r.id AS recipe_id,
  // r.name AS recipe_name,
  // r.photo AS recipe_photo,
  // r.quantity AS recipe_quantity,
  // r.time AS recipe_time,
  // ri.alim_code AS ingredient_id,
  // ri.alim_nom_fr AS ingredient_name,
  // ri.quantity AS ingredient_quantity,
  // s.text AS step_text,
  //  FROM
  // m_recipe AS r
  //  LEFT JOIN
  // m_recipe_ingredient AS ri ON r.id = ri.recipe_id
  //  LEFT JOIN
  // m_step AS s ON r.id = s.recipe_id
  //  WHERE
  // r.id = ${id}`;

  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        query,
        [],
        (_, results) => {
          console.log(results);

          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(row);
          }
          resolve(results);
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
