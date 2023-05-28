import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

const state = {
  isLoading: false,
  userToken: null,
  isSignout: false,
};

const SplashScreen = () => {
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

const SignUpScreen = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};

const ResetPassword = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export const MainNavigator = () => {
  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {state.userToken == null ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};
