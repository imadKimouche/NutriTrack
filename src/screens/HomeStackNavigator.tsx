/* eslint react/no-unstable-nested-components: 0 */ // --> OFF
//https://github.com/react-navigation/react-navigation/issues/11371
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '../components/Icon';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import HomeScreen from './HomeScreen';
import RecipesScreen from './RecipesScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {Meal} from '../hooks/meal';
import SearchMealScreen from './SearchMealScreen';
import AddMealScreen from './AddMealScreen';
import ProfileSettingsScreen from './settings/ProfileSettingsScreen';
import FitnessSettingsScreen from './settings/FitnessSettingsScreen';
import BarCodeScannerScreen from './BarCodeScannerScreen';

const BottomTabIcon = ({name, focused, size}: {name: string; focused: boolean; size: number}) => {
  return <Icon name={name} size={size} color={focused ? '$primary' : '$tabBarInactiveTint'} />;
};

export type HomeStackParamList = {
  HomeTabNavigator: undefined;
  SearchMeal: undefined;
  BarCodeScanner: undefined;
  AddMeal: {meal: Meal};
  Settings: undefined;
  ProfileSettings: undefined;
  FitnessSettings: undefined;
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
    </Stack.Navigator>
  );
};

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
          tabBarActiveTintColor: colors.$primary,
          tabBarInactiveTintColor: colors.$tabBarInactiveTint,
          tabBarIcon: props => <BottomTabIcon name="calendar" {...props} />,
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarActiveTintColor: colors.$primary,
          tabBarInactiveTintColor: colors.$tabBarInactiveTint,
          tabBarIcon: props => <BottomTabIcon name="book" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStackNavigator;
