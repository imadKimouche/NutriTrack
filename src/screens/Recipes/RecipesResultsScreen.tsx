import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader from '../../components/Header';
import {useSearchMealStore} from '../../store/ingredients';

const RecipesSearchResultsScreen = () => {
  const {addedIngredients} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
  }));

  return (
    <Box>
      <BaseHeader title="Recettes trouvées" />
      <Text>result</Text>
    </Box>
  );
};

export default RecipesSearchResultsScreen;
