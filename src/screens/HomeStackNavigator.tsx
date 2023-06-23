/* eslint react/no-unstable-nested-components: 0 */ // --> OFF
//https://github.com/react-navigation/react-navigation/issues/11371
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '../components/Icon';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import HomeScreen from './HomeScreen';
import RecipesScreen from './RecipesScreen';
import HeaderWithSettings from '../components/HeaderWithSettings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from './SettingsScreen';
import AddMealScreen, {AddMealHeader} from './AddMealScreen';
import MealScreen, {MealHeader} from './MealScreen';
import {Meal} from '../hooks/meal';

const BottomTabIcon = ({name, focused, size}: {name: string; focused: boolean; size: number}) => {
  return <Icon name={name} size={size} color={focused ? '$primary' : '$tabBarInactiveTint'} />;
};

export type HomeStackParamList = {
  HomeTabNavigator: undefined;
  AddMeal: undefined;
  Meal: {meal: Meal};
  Settings: undefined;
};

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
// type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="HomeTabNavigator" component={HomeTabNavigator} />
      <Stack.Screen name="AddMeal" options={{header: AddMealHeader}} component={AddMealScreen} />
      <Stack.Screen name="Meal" options={{header: MealHeader}} component={MealScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  const {colors} = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={{
        header: props => <HeaderWithSettings {...props} />,
        tabBarStyle: {backgroundColor: colors.$tabBarBackground, height: 93},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Suivi journalier',
          tabBarActiveTintColor: colors.$primary,
          tabBarInactiveTintColor: colors.$tabBarInactiveTint,
          tabBarIcon: props => <BottomTabIcon name="home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          title: 'Recettes',
          tabBarActiveTintColor: colors.$primary,
          tabBarInactiveTintColor: colors.$tabBarInactiveTint,
          tabBarIcon: props => <BottomTabIcon name="book" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStackNavigator;
