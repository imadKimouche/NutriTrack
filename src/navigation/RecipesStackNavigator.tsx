import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import IngredientsSearchScreen from '../screens/Recipes/IngredientsSearchScreen';
import RecipesSearchResultsScreen from '../screens/Recipes/RecipesResultsScreen';
import RecipeDetailsScreen from '../screens/Recipes/RecipeDetailsScreen';

export type RecipesStackParamList = {
  ingredientSearch: undefined;
  recipesSearchResult: undefined;
  recipeDetails: {recipe_id: number};
};

export type RecipesStackRouteProps<T extends keyof RecipesStackParamList> = RouteProp<RecipesStackParamList, T>;
export type RecipesStackNavigationProps<T extends keyof RecipesStackParamList> = NativeStackNavigationProp<
  RecipesStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RecipesStackParamList>();

const RecipesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ingredientSearch" getComponent={() => IngredientsSearchScreen} />
      <Stack.Screen name="recipesSearchResult" getComponent={() => RecipesSearchResultsScreen} />
      <Stack.Screen name="recipeDetails" getComponent={() => RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RecipesStackNavigator;
