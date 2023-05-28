import React from 'react';
import DishImage from '../assets/dish-illustration.svg';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';
import {useForm, Controller} from 'react-hook-form';
import Touchable from '../atoms/Touchable';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignInScreen = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    const {email, password, confirmPassword} = data;
    console.log(email);
  });

  const password = watch('password', ''); // Retrieve value of the 'password' field

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
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                inputPropPresets={'email'}
                icon={'mail'}
                height={56}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text>{errors.email?.message}</Text>}

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
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                inputPropPresets={'newPassword'}
                icon={'lock'}
                height={56}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === password || 'Passwords do not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                inputPropPresets={'newPassword'}
                icon={'lock'}
                height={56}
                placeholder="Confirmer mot de passe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text>{errors.confirmPassword.message}</Text>
          )}

          <Text
            variant={'labelSmall'}
            textAlign={'right'}
            paddingVertical={'s'}>
            J'ai déjà un compte
          </Text>
        </Box>
      </Box>
      <Box flex={0.5} alignItems={'center'} justifyContent={'center'} pb={'l'}>
        <Touchable
          bg={'$primary'}
          width={320}
          height={52}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'md'}
          onPress={onSubmit}>
          <Text color={'$background'}>Créer un compte</Text>
        </Touchable>
      </Box>
    </Box>
  );
};
