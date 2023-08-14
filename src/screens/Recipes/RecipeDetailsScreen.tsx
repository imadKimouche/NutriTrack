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
import FIcon from '../../components/FIcon';
import ListItem from '../../components/ListItem';
import {useRecipe, useToggleFavoriteRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps, RecipesStackRouteProps} from '../../navigation/RecipesStackNavigator';
import {Theme} from '../../style/theme';

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
                <FIcon name="users" size={20} color={'$primary'} />
                <Text ml={'s'} variant={'h6'}>
                  {recipe.quantity}
                </Text>
              </Box>
              <Box flexDirection={'row'} alignItems={'center'}>
                <FIcon name="clock" size={20} color={'$primary'} />
                <Text ml={'s'} variant={'h6'}>
                  {recipe.time}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box px={'s'} py={'xs'}>
            <Collapsible title={`ingrédients (${recipe.ingredients.length})`} open={true}>
              {recipe.ingredients.map(ing => (
                <ListItem
                  key={ing.id}
                  leftComponent={<Image source={{uri: ing.image}} style={{width: 50, height: 50}} />}
                  title={ing.name}
                  rightComponent={
                    <Text variant={'subtitle2'} color={'$textLabel'}>
                      {`${ing.quantity} ${ing.unit !== 'N/A' ? ing.unit : ''}`}
                    </Text>
                  }
                />
              ))}
            </Collapsible>
          </Box>
          <Box px={'s'} py={'xs'}>
            <Collapsible title={`Étapes (${recipe.time})`}>
              {recipe.steps.map((step, index) => (
                <ListItem
                  key={index}
                  leftComponent={
                    <Text variant={'h6'} color={'$textLabel'}>
                      {index + 1}
                    </Text>
                  }
                  title={step}
                />
              ))}
            </Collapsible>
          </Box>
        </ScrollView>
      )}
    </Box>
  );
};

export default RecipeDetailsScreen;
