import React, {useState} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Pressable from '../atoms/Pressable';
import {SafeAreaView} from 'react-native';
import {ObjectiveTab} from './ObjectivesTab';
import {MesurementsTab} from './MesurementsTab';
import {AllergiesTab} from './AllergiesTab';
import {RouteProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {UserSetupContext, UserSetupContextProps, UserSetupContextType} from '../context/userSetup';

export type TopTabParams = {
  Objectives: undefined;
  Mesurements: undefined;
  Allergies: undefined;
};

export type TabNavigationProp = MaterialTopTabNavigationProp<TopTabParams>;
export type TabRouteProp = RouteProp<TopTabParams, keyof TopTabParams>;

const Tab = createMaterialTopTabNavigator<TopTabParams>();

const LOTabBar: React.FC<MaterialTopTabBarProps> = ({state, descriptors, navigation}) => {
  return (
    <Box flexDirection={'row'} bg={'$background'} width={'100%'} height={44} paddingHorizontal={'m'}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
              <Text variant={'bodySmall'}>{label.toString()}</Text>
            </Box>
            <Box height={4} width={'100%'} bg={isFocused ? '$primary' : '$slideTabBackground'} />
          </Pressable>
        );
      })}
    </Box>
  );
};

// ------- USER SETUP CONTEXT -------

type UserSetupContextProviderProps = {
  children: React.ReactNode;
};

export const UserSetupContextProvider: React.FC<UserSetupContextProviderProps> = ({children}) => {
  const [userSetup, setUserSetup] = useState<UserSetupContextProps>({
    goal: '',
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <UserSetupContextProvider>
        <Tab.Navigator initialRouteName="Objectives" tabBar={props => <LOTabBar {...props} />}>
          <Tab.Screen name="Objectives" component={ObjectiveTab} />
          <Tab.Screen name="Mesurements" component={MesurementsTab} />
          <Tab.Screen name="Allergies" component={AllergiesTab} />
        </Tab.Navigator>
      </UserSetupContextProvider>
    </SafeAreaView>
  );
};
