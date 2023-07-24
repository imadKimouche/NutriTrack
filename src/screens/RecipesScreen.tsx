import React, {useState} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import BaseHeader from '../components/Header';
import Searchbar from '../components/Searchbar';
import {useSearchIngredient} from '../hooks/meal';

const RecipesScreen = () => {
  const [ingredient, setIngredient] = useState<string>('');
  const {data} = useSearchIngredient(ingredient);

  return (
    <Box bg={'$background'} flex={1} alignItems={'center'}>
      <BaseHeader title="Recettes" />
      <Box p={'s'}>
        <Searchbar onSubmitEditing={setIngredient} placeholder="Miel, ail, citron..." />
      </Box>
      <Box>{data && data.map(ingr => <Text>{ingr.name}</Text>)}</Box>
    </Box>
  );
};

export default RecipesScreen;
