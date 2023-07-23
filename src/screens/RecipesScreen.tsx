import React from 'react';
import Box from '../atoms/Box';
import Button from '../components/Button';
import {searchIngredient} from '../database/handler';

const RecipesScreen = () => {
  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'}>
      <Button
        label="search"
        onPress={() => {
          searchIngredient('miel');
        }}
      />
    </Box>
  );
};

export default RecipesScreen;
