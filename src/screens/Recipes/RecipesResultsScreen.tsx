import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {FlatList, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import {useSearchRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps} from '../../navigation/RecipesStackNavigator';
import {useSearchMealStore} from '../../store/ingredients';
import {Theme} from '../../style/theme';

export type Recipe = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  time: string;
  isFavorite: boolean;
};

export type RecipeListItemProps = {
  onRecipePress: () => void;
  recipe: Recipe;
};

export const RecipeListItem: React.FC<RecipeListItemProps> = ({recipe, onRecipePress}) => {
  const {spacing, borderRadii} = useTheme<Theme>();
  return (
    <Pressable onPressIn={onRecipePress} m={'m'} borderRadius={'xs'} bg={'$screenBackground'} width={150} height={150}>
      <ImageBackground
        source={{uri: recipe.image}}
        defaultSource={require('../../assets/recipe_placeholder.png')}
        style={{flex: 1, borderRadius: borderRadii.xs}}
        imageStyle={{borderRadius: borderRadii.xs}}>
        <LinearGradient
          colors={['transparent', 'transparent', 'black']}
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            padding: spacing.s,
            borderRadius: borderRadii.xs,
          }}>
          <Text variant={'subtitle1'} color={'$buttonTextPrimary'} numberOfLines={1}>
            {recipe.name}
          </Text>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Icon name="clock" color={'$buttonTextPrimary'} />
            <Text ml={'xs'} variant={'caption'} color={'$buttonTextPrimary'}>
              {recipe.time}
            </Text>
            <Text color={'$buttonTextPrimary'}> - </Text>
            <Icon name="users" color={'$buttonTextPrimary'} />
            <Text ml={'xs'} variant={'caption'} color={'$buttonTextPrimary'}>
              {recipe.quantity}
            </Text>
          </Box>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export type SearchRecipe = Recipe & {matching_ingredients_count: number; missing_ingredients: string};

const RecipesSearchResultsScreen: React.FC<{navigation: RecipesStackNavigationProps<'recipesSearchResult'>}> = ({navigation}) => {
  const {addedIngredients} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
  }));
  const {data, isLoading, fetchNextPage, isFetchingNextPage} = useSearchRecipe(addedIngredients);
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Box flex={1} style={{paddingBottom: insets.bottom + bottomTabBarHeight}}>
      <BaseHeader leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} title={'Recettes trouvées'} />
      {isLoading ? (
        <Loader />
      ) : (
        <Box alignSelf={'stretch'} alignItems={'center'}>
          <FlatList
            numColumns={2}
            data={data}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.2}
            ListFooterComponent={isFetchingNextPage ? <Loader color="$primary" /> : undefined}
            renderItem={({item}) => (
              <RecipeListItem recipe={item} onRecipePress={() => navigation.navigate('recipeDetails', {recipe_id: item.id})} />
            )}
            keyExtractor={item => `${item.id}-${item.name}`}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipesSearchResultsScreen;
