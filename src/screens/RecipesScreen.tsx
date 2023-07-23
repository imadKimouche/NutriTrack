import React, {useEffect, useState} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import BaseHeader from '../components/Header';
import Searchbar from '../components/Searchbar';
import {searchIngredient} from '../database/handler';

const RecipesScreen = () => {
  const [ingredient, setIngredient] = useState<string>('');
  const [results, setResults] = useState<{nom_fr: string; alim_code: number}[]>([]);

  useEffect(() => {
    if (ingredient.trim().length === 0) {
      setResults([]);
    }
    searchIngredient(ingredient)
      .then(queryResult => {
        const len = queryResult.rows.length;
        let compiledRows = [];
        for (let i = 0; i < len; i++) {
          let row = queryResult.rows.item(i) as {nom_fr: string; alim_code: number};
          compiledRows.push(row);
        }
        setResults(compiledRows);
      })
      .catch(err => {
        console.log(err);
        setResults([]);
      });
  }, [ingredient]);

  return (
    <Box bg={'$background'} flex={1} alignItems={'center'}>
      <BaseHeader title="Recettes" />
      <Box p={'s'}>
        <Searchbar onSubmitEditing={setIngredient} placeholder="Miel, ail, citron..." />
      </Box>
      <Box>
        {results.map(result => {
          return <Text>{result.nom_fr}</Text>;
        })}
      </Box>
    </Box>
  );
};

export default RecipesScreen;
