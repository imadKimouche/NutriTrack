import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader from '../../components/Header';
import Loader from '../../components/Loader';
import {useSearchRecipe} from '../../hooks/meal';
import {useSearchMealStore} from '../../store/ingredients';

const RecipesSearchResultsScreen = () => {
  const {addedIngredients} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
  }));
  const {data, isLoading} = useSearchRecipe(addedIngredients);

  return (
    <Box>
      <BaseHeader title="Recettes trouvées" />
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {data !== undefined &&
            Array.isArray(data) &&
            data.map(item => {
              return <Text>{item.name}</Text>;
            })}
        </Box>
      )}
    </Box>
  );
};

export default RecipesSearchResultsScreen;
