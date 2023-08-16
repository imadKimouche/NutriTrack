import React from 'react';
import {createMaterialTopTabNavigator, MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {CompositeScreenProps, RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import GoalTab from '../screens/onboarding/GoalTab';
import ActivityLevelTab from '../screens/onboarding/ActivityLevelTab';
import AboutYouTab from '../screens/onboarding/AboutYouTab';
import NutritionPrefTab from '../screens/onboarding/NutritionPrefTab';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './MainNavigator';

export type TopTabParams = {
  goal: undefined;
  activityLevel: undefined;
  aboutYou: undefined;
  nutritionPreferences: undefined;
};

export type NutritionPrefTabScreenProp = CompositeScreenProps<
  MaterialTopTabScreenProps<TopTabParams, 'nutritionPreferences'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type TabNavigationProp = MaterialTopTabNavigationProp<TopTabParams>;
export type TabRouteProp = RouteProp<TopTabParams, keyof TopTabParams>;

const Tab = createMaterialTopTabNavigator<TopTabParams>();

export const OnboardingNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => null}>
      <Tab.Screen name="goal" component={GoalTab} />
      <Tab.Screen name="activityLevel" component={ActivityLevelTab} />
      <Tab.Screen name="aboutYou" component={AboutYouTab} />
      <Tab.Screen name="nutritionPreferences" component={NutritionPrefTab} />
    </Tab.Navigator>
  );
};
