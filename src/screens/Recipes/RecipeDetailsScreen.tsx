import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {useRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps, RecipesStackRouteProps} from '../../navigation/RecipesStackNavigator';

const RecipeDetailsScreen: React.FC<{
  navigation: RecipesStackNavigationProps<'recipeDetails'>;
  route: RecipesStackRouteProps<'recipeDetails'>;
}> = ({navigation, route}) => {
  const {recipe_id} = route.params;
  const {data, isLoading} = useRecipe(recipe_id);

  return (
    <Box flex={1}>
      <BaseHeader title={data ? data.name : '...'} leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      {data && <Text>{data.name}</Text>}
    </Box>
  );
};

export default RecipeDetailsScreen;
