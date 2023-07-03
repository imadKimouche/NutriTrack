import React from 'react';
import Box from '../atoms/Box';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GoalTab from '../screens/onboarding/GoalTab';
import ActivityLevelTab from '../screens/onboarding/ActivityLevelTab';
import AboutYouTab from '../screens/onboarding/AboutYouTab';

export type TopTabParams = {
  goal: undefined;
  activityLevel: undefined;
  aboutYou: undefined;
  nutritionPreferences: undefined;
};

export type TabNavigationProp = MaterialTopTabNavigationProp<TopTabParams>;
export type TabRouteProp = RouteProp<TopTabParams, keyof TopTabParams>;

const Tab = createMaterialTopTabNavigator<TopTabParams>();

export const OnboardingNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} style={{marginTop: insets.top}}>
      <Tab.Navigator tabBar={() => null}>
        <Tab.Screen name="goal" component={GoalTab} />
        <Tab.Screen name="activityLevel" component={ActivityLevelTab} />
        <Tab.Screen name="aboutYou" component={AboutYouTab} />
      </Tab.Navigator>
    </Box>
  );
};
