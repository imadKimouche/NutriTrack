import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import HomeStackNavigator from '../screens/HomeStackNavigator';
import {OnboardingNavigator} from './OnboardingNavigator';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import {useUserFitnessData} from '../hooks/userFitnessData';

export type RootStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
  // TODO investigate userFitnessData refresh multiple times
  const {userFitnessData, isLoading, isError} = useUserFitnessData();

  if (isLoading) {
    return (
      <Box flex={1} bg={'$screenBackground'} alignItems={'center'} justifyContent={'center'}>
        <Text variant={'body1'}>Je prépare ton programme...</Text>
      </Box>
    );
  }

  if (isError) {
    <Box flex={1} bg={'$screenBackground'} alignItems={'center'} justifyContent={'center'}>
      <Text variant={'body1'}>Une erreur s'est produite</Text>
    </Box>;
  }

  if (userFitnessData) {
    return <HomeStackNavigator />;
  }

  return <OnboardingNavigator />;
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
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
