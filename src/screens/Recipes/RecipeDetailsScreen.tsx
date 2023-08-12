import {useTheme} from '@shopify/restyle';
import React from 'react';
import {Image, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Collapsible from '../../components/Collapsible';
import BaseHeader, {GoBackButton} from '../../components/Header';
import HeartIcon from '../../components/Heart';
import Icon from '../../components/Icon';
import {Ingredient, useRecipe, useToggleFavoriteRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps, RecipesStackRouteProps} from '../../navigation/RecipesStackNavigator';
import {Theme} from '../../style/theme';

const StepListItem: React.FC<{step: string; index: number}> = ({step, index}) => {
  return (
    <Box flexDirection={'row'} bg={'$cardBackground'} borderRadius={'xs'} p={'s'} m={'s'}>
      <Text mr={'s'} variant={'subtitle2'}>
        {index + 1}
      </Text>
      <Text variant={'body1'}>{step}</Text>
    </Box>
  );
};

const IngredientListItem: React.FC<{ingredient: Ingredient}> = ({ingredient}) => {
  const {borderRadii} = useTheme<Theme>();

  return (
    <Box bg={'$cardBackground'} borderRadius={'sm'} p={'s'} my={'xs'} flexDirection={'row'} alignItems={'center'}>
      <Image source={{uri: ingredient.image}} style={{width: 50, height: 50, borderRadius: borderRadii.sm}} />
      <Text flex={1} ml={'m'} variant={'subtitle1'} textTransform={'capitalize'}>
        {ingredient.name}
      </Text>
      <Box flexDirection={'row'}>
        <Text variant={'subtitle2'} color={'$textLabel'}>
          {`${ingredient.quantity} ${ingredient.unit !== 'N/A' ? ingredient.unit : ''}`}
        </Text>
      </Box>
    </Box>
  );
};

const RecipeDetailsScreen: React.FC<{
  navigation: RecipesStackNavigationProps<'recipeDetails'>;
  route: RecipesStackRouteProps<'recipeDetails'>;
}> = ({navigation, route}) => {
  const {recipe_id} = route.params;
  const {data: recipe} = useRecipe(recipe_id);
  const {borderRadii, spacing} = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const {toggleFavoriteRecipe} = useToggleFavoriteRecipe();

  return (
    <Box flex={1} style={{paddingBottom: insets.bottom}}>
      <BaseHeader
        title={recipe?.name ?? 'Détails'}
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={
          <Pressable onPress={() => recipe && toggleFavoriteRecipe(recipe.id)}>
            <HeartIcon size={24} color={'$primary'} fillColor={recipe?.isFavorite ? '$primary' : '$iconRegular'} />
          </Pressable>
        }
      />
      {recipe && (
        <ScrollView style={{padding: spacing.s}}>
          <Box my={'s'} mb={'xl'}>
            <Image
              source={{uri: recipe.image}}
              style={{
                height: 200,
                resizeMode: 'cover',
                borderRadius: borderRadii.sm,
                marginHorizontal: spacing.l,
              }}
            />
            <Box
              position={'absolute'}
              bottom={-25}
              alignSelf={'center'}
              bg={'$cardBackground'}
              flexDirection={'row'}
              p={'m'}
              borderRadius={'md'}
              alignItems={'center'}
              justifyContent={'space-around'}>
              <Box flexDirection={'row'} alignItems={'center'} mr={'l'}>
                <Icon name="users" size={20} color={'$primary'} />
                <Text ml={'s'} variant={'h6'}>
                  {recipe.quantity}
                </Text>
              </Box>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Icon name="clock" size={20} color={'$primary'} />
                <Text ml={'s'} variant={'h6'}>
                  {recipe.time}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box px={'s'} py={'xs'}>
            <Collapsible title={`ingrédients (${recipe.ingredients.length})`} open={true}>
              {recipe.ingredients.map(ing => (
                <IngredientListItem key={ing.id} ingredient={ing} />
              ))}
            </Collapsible>
          </Box>
          <Box px={'s'} py={'xs'}>
            <Collapsible title={`Étapes (${recipe.time})`}>
              {recipe.steps.map((step, index) => (
                <StepListItem key={index} step={step} index={index} />
              ))}
            </Collapsible>
          </Box>
        </ScrollView>
      )}
    </Box>
  );
};

export default RecipeDetailsScreen;
