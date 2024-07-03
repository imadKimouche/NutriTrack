import SQLite from 'react-native-sqlite-storage';

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

export async function queryGetAll<T = any>(query: string, args: any[] = [], transformerFn?: (data: any) => T): Promise<T[]> {
  return new Promise(async (resolve, reject) => {
    Database.getInstance()
      .then(db => {
        db.executeSql(query, args)
          .then(([results]) => {
            let data = [];
            for (let i = 0; i < results.rows.length; i++) {
              let item = results.rows.item(i);
              if (transformerFn) {
                item = transformerFn(item);
              }
              data.push(item);
            }
            resolve(data);
          })
          .catch(e => {
            reject(`queryGetAll failed: ${JSON.stringify(e)}`);
          });
      })
      .catch(e => `queryGetAll db is undefined: ${JSON.stringify(e)}`);
  });
}

export function queryGetOne<T = any>(query: string, args: any[] = [], transformerFn?: (data: any) => T): Promise<T | null> {
  return new Promise((resolve, reject) => {
    Database.getInstance()
      .then(db => {
        db.executeSql(query, args)
          .then(([results]) => {
            if (results.rows.length === 0) {
              resolve(null);
            } else {
              let item = results.rows.item(0);
              if (transformerFn) {
                item = transformerFn(item);
              }
              resolve(item);
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });
}
