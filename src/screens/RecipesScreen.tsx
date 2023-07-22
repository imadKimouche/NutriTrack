import React from 'react';
import Box from '../atoms/Box';

const RecipesScreen = () => {
  const SQLite = require('react-native-sqlite-storage');
  SQLite.openDatabase(
    {name: 'anses_ciqual', createFromLocation: 1},
    () => {
      console.log('database open');
    },
    (err: any) => {
      console.log('failed to open database', err);
    },
  );

  return <Box></Box>;
};

export default RecipesScreen;
