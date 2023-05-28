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
      <Box flex={1.2} alignItems={'center'} justifyContent={'space-between'}>
        <Text variant={'h1'} textAlign={'center'}>
          LeftoverFit
        </Text>
        <Box width={'80%'} flex={1} justifyContent={'center'}>
          <TextInput
            icon={'mail'}
            height={56}
            width={'100%'}
            placeholder="Email"
            marginVertical={'s'}
          />
          <TextInput
            icon={'lock'}
            height={56}
            width={'100%'}
            placeholder="Mot de passe"
          />
          <TextInput
            icon={'lock'}
            height={56}
            width={'100%'}
            placeholder="Confirmer mot de passe"
            marginVertical={'s'}
          />
          <Text variant={'labelSmall'} textAlign={'right'}>
            J'ai déjà un compte
          </Text>
        </Box>
      </Box>
      <Box flex={0.5} alignItems={'center'} justifyContent={'center'} pb={'l'}>
        <Button title="Créer un compte" />
      </Box>
    </Box>
  );
};
