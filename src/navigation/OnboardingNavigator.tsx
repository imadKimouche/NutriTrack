import React, {useState} from 'react';
import Box from '../atoms/Box';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {UserSetupContext, UserSetupContextProps, UserSetupContextType} from '../context/userSetup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GoalTab from '../screens/onboarding/goalTab';

export type TopTabParams = {
  goal: undefined;
  activityLevel: undefined;
  aboutYou: undefined;
  nutritionPreferences: undefined;
};

export type TabNavigationProp = MaterialTopTabNavigationProp<TopTabParams>;
export type TabRouteProp = RouteProp<TopTabParams, keyof TopTabParams>;

const Tab = createMaterialTopTabNavigator<TopTabParams>();

// ------- USER SETUP CONTEXT -------

type UserSetupContextProviderProps = {
  children: React.ReactNode;
};

export const UserSetupContextProvider: React.FC<UserSetupContextProviderProps> = ({children}) => {
  const [userSetup, setUserSetup] = useState<UserSetupContextProps>({
    goal: '',
    age: 10,
    sexe: 'Homme', // TODO replace with a generic type
    height: '150',
    weight: '50',
    allergies: [],
  });

  const contextValue: UserSetupContextType = {
    userSetup,
    setUserSetup,
  };

  return <UserSetupContext.Provider value={contextValue}>{children}</UserSetupContext.Provider>;
};

export const OnboardingNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} style={{marginTop: insets.top}}>
      <UserSetupContextProvider>
        <Tab.Navigator tabBar={() => null}>
          <Tab.Screen name="goal" component={GoalTab} />
        </Tab.Navigator>
      </UserSetupContextProvider>
    </Box>
  );
};
