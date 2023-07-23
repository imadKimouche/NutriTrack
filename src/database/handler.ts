import SQLite from 'react-native-sqlite-storage';

function onDatabaseOpenSuccess() {
  console.log('database open');
}

function onDatabaseOpenError(err: SQLite.SQLError) {
  console.log(`database open error ${err.code}: ${err.message}`);
}

const databaseName = 'anses_ciqual';
const db = SQLite.openDatabase({name: databaseName, createFromLocation: 1}, onDatabaseOpenSuccess, onDatabaseOpenError);

export function searchIngredient(text: string): Promise<SQLite.ResultSet> {
  return new Promise((resolve, reject) => {
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
