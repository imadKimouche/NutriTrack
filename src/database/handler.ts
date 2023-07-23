import SQLite from 'react-native-sqlite-storage';

function onDatabaseOpenSuccess() {
  console.log('database open');
}

function onDatabaseOpenError(err: SQLite.SQLError) {
  console.log(`database open error ${err.code}: ${err.message}`);
}

const databaseName = 'anses_ciqual';
SQLite.enablePromise(true);
const db = SQLite.openDatabase({name: databaseName, createFromLocation: 1}, onDatabaseOpenSuccess, onDatabaseOpenError);

export function searchIngredient(text: string) {
  db.transaction(async (tx: SQLite.Transaction) => {
    const [_, results] = await tx.executeSql(
      `
		SELECT
		  a.alim_code,
		  a.nom_fr AS aliment_nom_fr,
		  c.const_code,
		  c.nom_fr AS constituant_nom_fr,
		  c.unit
		FROM
		  aliment a
		LEFT JOIN
		  composition comp ON a.alim_code = comp.alim_code
		LEFT JOIN
		  constituant c ON comp.const_code = c.const_code
		WHERE
		  a.nom_fr LIKE '%' || ? || '%';
	`,
      [text],
    );

    var len = results.rows.length;
    for (let i = 0; i < len; i++) {
      let row = results.rows.item(i);
      console.log(`${row.nom_en}`);
    }
  });
}
