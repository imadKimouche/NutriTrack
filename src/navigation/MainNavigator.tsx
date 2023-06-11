import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../screens/SignUpScreen';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import {UserSetupScreen} from '../screens/UserSetupScreen';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from '../screens/HomeNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useUserData} from '../hooks/userData';

export type RootStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  // UserSetup: undefined;
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

const Landing = () => {
  const {data, isLoading} = useUserData();
  console.log('userData', data);

  if (isLoading) {
    return (
      <Box flex={1} bg={'$background'} alignItems={'center'} justifyContent={'center'}>
        <Text variant={'labelSmall'}>Je prépare ton programme...</Text>
      </Box>
    );
  }

  if (data) {
    return <HomeNavigator />;
  }

  return <UserSetupScreen />;
};

export const MainNavigator = () => {
  const {user} = useAuth();

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
