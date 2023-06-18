import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../screens/SignUpScreen';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import {UserSetupScreen} from '../screens/UserSetupScreen';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from '../screens/HomeStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useUserData} from '../hooks/userData';
import {User} from 'firebase/auth';

export type RootStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
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

const Landing = () => {
  const {data, isLoading, isError, error} = useUserData();

  if (isLoading) {
    return (
      <Box flex={1} bg={'$background'} alignItems={'center'} justifyContent={'center'}>
        <Text variant={'labelSmall'}>Je prépare ton programme...</Text>
      </Box>
    );
  }

  if (isError) {
    <Box flex={1} bg={'$background'} alignItems={'center'} justifyContent={'center'}>
      <Text variant={'errorSmall'}>{error}</Text>
    </Box>;
  }

  if (data) {
    return <HomeStackNavigator />;
  }

  return <UserSetupScreen />;
};

export const MainNavigator = () => {
  // const {user} = useAuth();
  const user = {
    email: 'imad.kim@gmail.com',
    uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  };

  // if (state.isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Screen name="Landing" component={Landing} />
          ) : (
            <>
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
