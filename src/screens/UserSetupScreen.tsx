import React, {useState} from 'react';
import Box from '../atoms/Box';
import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {ObjectiveTab} from './ObjectivesTab';
import {MesurementsTab} from './MesurementsTab';
import {AllergiesTab} from './AllergiesTab';
import {RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {UserSetupContext, UserSetupContextProps, UserSetupContextType} from '../context/userSetup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InfoTab} from './InfoTab';

export type TopTabParams = {
  Info: undefined;
  Objectives: undefined;
  Mesurements: undefined;
  Allergies: undefined;
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

export const UserSetupScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} style={{marginTop: insets.top}}>
      <UserSetupContextProvider>
        <Tab.Navigator initialRouteName="Info" tabBar={() => null}>
          <Tab.Screen name="Info" component={InfoTab} />
          <Tab.Screen name="Objectives" component={ObjectiveTab} />
          <Tab.Screen name="Mesurements" component={MesurementsTab} />
          <Tab.Screen name="Allergies" component={AllergiesTab} />
        </Tab.Navigator>
      </UserSetupContextProvider>
    </Box>
  );
};
