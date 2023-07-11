import React from 'react';
import DishImage from '../assets/dish-illustration.svg';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';
import {Controller} from 'react-hook-form';
import {useSignin} from '../hooks/auth';
import Button from '../components/Button';
import {TouchableOpacity} from '../atoms/Touchable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainNavigator';

// type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;
type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export const SignInScreen = () => {
  const {form, onSubmit, mutation: submitMutation} = useSignin();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const {control} = form;

  const goToSignupSceen = () => {
    navigation.navigate('SignUp');
  };

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
          <Controller
            control={control}
            rules={{
              required: 'Email is required', // TODO add localization i18n
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <TextInput
                inputPropPresets={'email'}
                icon={'mail'}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error?.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must not exceed 20 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <TextInput
                inputPropPresets={'newPassword'}
                icon={'lock'}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error?.message}
              />
            )}
            name="password"
          />

          <TouchableOpacity onPress={goToSignupSceen}>
            <Text variant={'body2'} textAlign={'right'} paddingVertical={'s'}>
              Créer un compte
            </Text>
          </TouchableOpacity>
        </Box>
        {submitMutation.error && (
          <Box>
            <Text variant={'body2'}>{submitMutation.error.message}</Text>
          </Box>
        )}
      </Box>
      <Box flex={0.5} alignItems={'center'} justifyContent={'center'} pb={'l'}>
        <Button variant={'primary'} label="Se connecter" onPress={onSubmit} loading={submitMutation.isLoading} />
      </Box>
    </Box>
  );
};
