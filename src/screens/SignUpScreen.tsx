import React from 'react';
import DishImage from '../assets/dish-illustration.svg';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';
import {Controller} from 'react-hook-form';
import {useSignup} from '../hooks/auth';
import Button from '../components/Button';
import {RootStackParamList} from '../navigation/MainNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Dimensions, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import {useKeyboardIsVisible} from '../hooks/keyboard';
import BaseHeader, {GoBackButton} from '../components/Header';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'signUp'>;
export const SignUpScreen = ({navigation}: {navigation: SignUpScreenNavigationProp}) => {
  const {form, onSubmit, mutation: submitMutation} = useSignup();
  const {control, watch} = form;
  const password = watch('password', ''); // Retrieve value of the 'password' field
  const {spacing} = useTheme<Theme>();
  const {keyboardVisible} = useKeyboardIsVisible();

  return (
    <Box bg={'$screenBackground'} flex={1}>
      <BaseHeader title="Céer un compte" leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      <Box justifyContent={'center'} alignItems={'center'}>
        <DishImage width={keyboardVisible ? 0 : Dimensions.get('window').width} />
      </Box>
      <Box flex={1} alignItems={'center'} justifyContent={'space-between'}>
        <Image source={require('../assets/logo-180x180.png')} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', paddingHorizontal: spacing.xl}}>
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
                mb={'s'}
                inputPropPresets={'email'}
                hint={error?.message}
                variant={error ? 'error' : undefined}
                icon={'mail'}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                mb={'s'}
                inputPropPresets={'newPassword'}
                hint={error?.message}
                variant={error ? 'error' : undefined}
                icon={'lock'}
                placeholder="Mot de passe"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={onSubmit}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === password || 'Passwords do not match',
            }}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <TextInput
                inputPropPresets={'newPassword'}
                hint={error?.message}
                variant={error ? 'error' : undefined}
                icon={'lock'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={onSubmit}
                placeholder="Confirmer mot de passe"
              />
            )}
            name="confirmPassword"
          />
        </KeyboardAvoidingView>
        {submitMutation.error && (
          <Box>
            <Text variant={'body2'}>{submitMutation.error.message}</Text>
          </Box>
        )}
      </Box>
      <Box flex={0.5} alignItems={'center'} justifyContent={'center'} p={'l'}>
        <Button
          variant={'primary'}
          alignSelf={'stretch'}
          label="créer mon compte"
          onPress={onSubmit}
          loading={submitMutation.isLoading}
        />
      </Box>
    </Box>
  );
};
