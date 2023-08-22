import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';
import {Controller} from 'react-hook-form';
import {useSignin, useSignInWithGoogle} from '../hooks/auth';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import {Image, KeyboardAvoidingView, Platform} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import Divider from '../components/Divider';
import BaseHeader, {GoBackButton} from '../components/Header';

// type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;
type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'signIn'>;

export const SignInScreen = () => {
  const {form, onSubmit, mutation: submitMutation} = useSignin();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const {control} = form;
  const {spacing} = useTheme<Theme>();
  const {signInWithGoogle, isLoading: signInGoogleLoading} = useSignInWithGoogle();

  return (
    <Box bg={'$bgWeak'} flex={1}>
      <BaseHeader title="Se connecter" leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      <Box flex={1.2} alignItems={'center'} justifyContent={'space-between'}>
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
        </KeyboardAvoidingView>
      </Box>
      <Box flex={1} alignItems={'center'} justifyContent={'center'} px={'xl'} p={'l'}>
        <Button
          variant={'primary'}
          alignSelf={'stretch'}
          label="Se connecter"
          onPress={onSubmit}
          loading={submitMutation.isLoading}
          disabled={signInGoogleLoading}
          mb={'s'}
        />
        <Divider />
        <Button
          variant={'outline-left'}
          alignSelf={'stretch'}
          icon="b-google"
          label="se connecter avec google"
          onPress={() => signInWithGoogle()}
          loading={signInGoogleLoading}
          disabled={submitMutation.isLoading}
          my={'s'}
        />
        <Button
          variant={'outline-left'}
          alignSelf={'stretch'}
          icon="b-apple"
          label="se connecter avec apple"
          onPress={onSubmit}
        />
      </Box>
    </Box>
  );
};
