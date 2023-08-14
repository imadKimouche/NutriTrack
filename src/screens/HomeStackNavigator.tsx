/* eslint react/no-unstable-nested-components: 0 */ // --> OFF
//https://github.com/react-navigation/react-navigation/issues/11371
import React from 'react';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FIcon from '../components/FIcon';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import HomeScreen from './HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {Meal} from '../hooks/meal';
import SearchMealScreen from './SearchMealScreen';
import AddMealScreen from './AddMealScreen';
import ProfileSettingsScreen from './settings/ProfileSettingsScreen';
import FitnessSettingsScreen from './settings/FitnessSettingsScreen';
import BarCodeScannerScreen from './BarCodeScannerScreen';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../navigation/MainNavigator';
import RecipesSearchResultsScreen from './Recipes/RecipesResultsScreen';
import RecipesStackNavigator from '../navigation/RecipesStackNavigator';

const BottomTabIcon = ({name, focused, size}: {name: string; focused: boolean; size: number}) => {
  return <FIcon name={name} size={size} color={focused ? '$iconActive' : '$iconRegular'} />;
};

export type HomeStackParamList = {
  HomeTabNavigator: undefined;
  SearchMeal: undefined;
  BarCodeScanner: undefined;
  AddMeal: {meal: Meal};
  Settings: undefined;
  ProfileSettings: undefined;
  FitnessSettings: undefined;
  RecipesSearchResult: undefined;
};

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
// type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
      <Stack.Screen name="SearchMeal" component={SearchMealScreen} />
      <Stack.Screen name="AddMeal" component={AddMealScreen} />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScannerScreen} />
      <Stack.Screen name="Settings" options={{title: 'Paramètres'}} component={SettingsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="FitnessSettings" component={FitnessSettingsScreen} />
      <Stack.Screen name="RecipesSearchResult" component={RecipesSearchResultsScreen} />
    </Stack.Navigator>
  );
};

export type HomeTabParamList = {
  Home: undefined;
  Recipes: undefined;
};

export type HomeTabNavigationProps<T extends keyof HomeTabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, T>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type HomeTabRouteProps<T extends keyof HomeTabParamList> = RouteProp<HomeTabParamList, T>;

const HomeTabNavigator = () => {
  const {colors} = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: colors.$iconActive,
          tabBarInactiveTintColor: colors.$iconRegular,
          tabBarIcon: props => <BottomTabIcon name="calendar" {...props} />,
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesStackNavigator}
        options={{
          tabBarActiveTintColor: colors.$iconActive,
          tabBarInactiveTintColor: colors.$iconRegular,
          tabBarIcon: props => <BottomTabIcon name="book" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStackNavigator;
