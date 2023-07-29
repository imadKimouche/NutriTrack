import React from 'react';
import {FlatList, Image} from 'react-native';
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
  const {data: recipe, isLoading} = useRecipe(recipe_id);

  return (
    <Box flex={1}>
      <BaseHeader title={'Détails'} leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      {recipe && (
        <Box>
          <Image source={{uri: recipe.photo}} style={{height: 200, width: '100%', alignSelf: 'center', resizeMode: 'contain'}} />
          <Box alignItems={'center'} my={'s'}>
            <Text variant={'h6'} textAlign={'center'}>
              {recipe.name}
            </Text>
          </Box>

          <Box p={'s'}>
            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Text variant={'subtitle1'}>Ingrédients</Text>
              <Text variant={'subtitle2'} color={'$labelOff'}>
                {`${recipe.ingredients.length} ${recipe.ingredients.length > 1 ? 'ingrédients' : 'ingrédient'}`}
              </Text>
            </Box>
            <FlatList
              data={recipe.ingredients}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <Box bg={'$background1'} borderRadius={'xs'} p={'s'}>
                    <Text variant={'body2'}>{item.name}</Text>
                    <Box flexDirection={'row'}>
                      <Text variant={'caption'} color={'$labelOff'}>
                        {item.quantity}
                      </Text>
                      <Text variant={'caption'} color={'$labelOff'} ml={'xs'}>
                        {item.unit ?? 'parts'}
                      </Text>
                    </Box>
                  </Box>
                );
              }}
              keyExtractor={item => `${item.code}-${item.name}`}
            />
          </Box>
          <Box p={'s'}>
            <Text variant={'subtitle1'}>Etapes</Text>
            {recipe.steps.map(step => {
              return <Text>{step}</Text>;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDetailsScreen;
