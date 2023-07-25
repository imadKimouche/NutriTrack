import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import IngredientsSearchScreen from '../screens/Recipes/IngredientsSearchScreen';
import RecipesSearchResultsScreen from '../screens/Recipes/RecipesResultsScreen';
import {RouteProp} from '@react-navigation/native';

export type RecipesStackParamList = {
  ingredientSearch: undefined;
  recipesSearchResult: undefined;
  recipeDetails: undefined;
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
      <Stack.Screen name="ingredientSearch" component={IngredientsSearchScreen} />
      <Stack.Screen name="recipesSearchResult" component={RecipesSearchResultsScreen} />
    </Stack.Navigator>
  );
};

export default RecipesStackNavigator;
