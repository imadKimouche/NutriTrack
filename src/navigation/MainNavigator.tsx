import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {SignUpScreen} from '../screens/SignUpScreen';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import {
  UserSetupContextProps,
  UserSetupScreen,
} from '../screens/UserSetupScreen';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import HomeScreen from '../screens/Home';

export type RootStackParamList = {
  Home?: {userSetup: UserSetupContextProps};
  SignUp: undefined;
  UserSetup: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
// type SignUpScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'SignUp'
// >;
//
//
// type ResetPasswordScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'ResetPassword'
// >;
// type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'ResetPassword'
// >;
// const SplashScreen = () => {
//   return (
//     <Box>
//       <Text>Splash</Text>
//     </Box>
//   );
// };

const ResetPassword = () => {
  return (
    <Box>
      <Text>SignUp</Text>
    </Box>
  );
};

export const MainNavigator = () => {
  const {user, isNewUser} = useAuth();

  // if (state.isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            {isNewUser && (
              <Stack.Screen name="UserSetup" component={UserSetupScreen} />
            )}
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
