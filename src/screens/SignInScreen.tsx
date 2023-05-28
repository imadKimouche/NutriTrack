import React from 'react';
import {Button} from 'react-native';
import DishImage from '../assets/dish-illustration.svg';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';

export const SignInScreen = () => {
  return (
    <Box bg={'$windowBackground'} flex={1}>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <DishImage width={390} height={210} />
      </Box>
      <Box flex={1}>
        <Text variant={'h1'} textAlign={'center'}>
          LeftoverFit
        </Text>
        <Box bg={'red'} flex={1}>
          <TextInput placeholder="Email" />
          <TextInput placeholder="Mot de passe" />
          <TextInput placeholder="Confirmer mot de passe" />
        </Box>
      </Box>
      <Box flex={1}>
        <Button title="Créer un compte" />
      </Box>
    </Box>
  );
};
