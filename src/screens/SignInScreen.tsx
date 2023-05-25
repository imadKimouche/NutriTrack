import React from 'react';
import {Text, View} from 'react-native';
import DishImage from '../assets/dish-illustration.svg';

export const SignInScreen = () => {
  return (
    <View>
      <DishImage width={400} height={400} />
      <Text>Sign in</Text>
    </View>
  );
};
