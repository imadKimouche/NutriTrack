import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import HomeStackNavigator from '../screens/HomeStackNavigator';
import {OnboardingNavigator} from './OnboardingNavigator';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import {useUserFitnessData} from '../hooks/userFitnessData';
import {useOnBoardingStore} from '../store/onboarding';
import {StatusBar as NativeStatusBar} from 'react-native';
import {Theme} from '../style/theme';
import {useTheme} from '@shopify/restyle';

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
  const {userFitnessData, isLoading, isError} = useUserFitnessData();
  const {updateStore} = useOnBoardingStore(state => state);

  useEffect(() => {
    if (userFitnessData) {
      updateStore(userFitnessData);
    }
  }, [updateStore, userFitnessData]);

  if (isLoading) {
    return (
      <Box flex={1} bg={'$background'} alignItems={'center'} justifyContent={'center'}>
        <Text variant={'body1'}>Je prépare ton programme...</Text>
      </Box>
    );
  }

  if (isError) {
    <Box flex={1} bg={'$background'} alignItems={'center'} justifyContent={'center'}>
      <Text variant={'body1'}>Une erreur s'est produite</Text>
    </Box>;
  }

  // if (userFitnessData) {
  //   return <HomeStackNavigator />;
  // }

  return <OnboardingNavigator />;
};

const StatusBar: React.FC = () => {
  const {colors} = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  return (
    <Box bg={'$background'} style={{height: insets.top}}>
      <NativeStatusBar animated={true} backgroundColor={colors.$background} />
    </Box>
  );
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
      <StatusBar />
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
