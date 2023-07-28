import React from 'react';
import {Image} from 'react-native';
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
      {data && (
        <Box>
          <Image source={{uri: data.photo}} style={{height: 250, width: 250, alignSelf: 'center'}} />
          <Box p={'s'}>
            <Text variant={'subtitle1'}>Ingrédients</Text>
            {data.ingredients.map(ing => {
              return <Text>{ing.name}</Text>;
            })}
          </Box>
          <Box p={'s'}>
            <Text variant={'subtitle1'}>Etapes</Text>
            {data.steps.map(step => {
              return <Text>{step}</Text>;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDetailsScreen;
