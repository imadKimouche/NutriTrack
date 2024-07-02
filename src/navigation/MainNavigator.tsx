import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import HomeStackNavigator from '../screens/HomeStackNavigator';
import {OnboardingNavigator} from './OnboardingNavigator';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SignInScreen} from '../screens/SignInScreen';
import {useAuth} from '../hooks/auth';
import DishImage from '../assets/dish-illustration.svg';
import {Dimensions, Image} from 'react-native';
import StatusBar from '../components/StatusBar';
import Button from '../components/Button';

export type RootStackParamList = {
  landing: undefined;
  signUp: undefined;
  signIn: undefined;
  resetPassword: undefined;
  onboarding: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ResetPassword = () => {
  return (
    <Box>
      <Text>SignUp</Text>
    </Box>
  );
};

const Landing: React.FC<{navigation: NativeStackNavigationProp<RootStackParamList, 'landing'>}> = ({navigation}) => {
  return (
    <Box flex={1} bg={'$bgWeak'}>
      <StatusBar />
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <DishImage width={Dimensions.get('window').width} />
        <Image source={require('../assets/logo-180x180.png')} />
      </Box>
      <Box flex={0.5} alignItems={'center'} justifyContent={'center'}>
        <Button label="Commencer" width={'90%'} onPress={() => navigation.navigate('onboarding')} />
        <Box flexDirection={'row'}>
          <Text variant={'link-small'} mr={'xs'}>
            Vous avez déjà un compte ?
          </Text>
          <Text onPress={() => navigation.navigate('signIn')} variant={'link-small'} color={'$primary'}>
            Se connecter
          </Text>
        </Box>
      </Box>
    </Box>
  );
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
            <>
              <Stack.Screen name="home" getComponent={() => HomeStackNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen name="landing" component={Landing} />
              <Stack.Screen name="onboarding" component={OnboardingNavigator} />
              <Stack.Screen name="signIn" component={SignInScreen} />
              <Stack.Screen name="signUp" component={SignUpScreen} />
              <Stack.Screen name="resetPassword" component={ResetPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
