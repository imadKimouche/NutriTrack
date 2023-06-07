import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../screens/SignUpScreen';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {SignInScreen} from '../screens/SignInScreen';
import {signOut, useAuth} from '../hooks/auth';
import Button from '../components/Button';
import {UserSetupScreen} from '../screens/UserSetupScreen';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  UserSetup: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Home'
// >;
//
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

const HomeScreen = () => {
  async function logout() {
    await signOut();
  }
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text>Home</Text>
      <Button label="Se déco" onPress={logout} />
    </Box>
  );
};

export const MainNavigator = () => {
  const {user} = useAuth();

  // if (state.isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="UserSetup" component={UserSetupScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};
