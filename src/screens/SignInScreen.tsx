import React from 'react';
import DishImage from '../assets/dish-illustration.svg';
import GoogleIcon from '../assets/icons8-google.svg';
import AppleIcon from '../assets/icons8-apple.svg';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import TextInput from '../components/TextInput';
import {Controller} from 'react-hook-form';
import {useSignin, useSignInWithGoogle} from '../hooks/auth';
import Button from '../components/Button';
import {TouchableOpacity} from '../atoms/Touchable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import StatusBar from '../components/StatusBar';
import {Dimensions, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {useKeyboardIsVisible} from '../hooks/keyboard';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import Pressable from '../atoms/Pressable';

// type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;
type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export const SignInScreen = () => {
  const {form, onSubmit, mutation: submitMutation} = useSignin();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const {control} = form;
  const {spacing} = useTheme<Theme>();
  const {keyboardVisible} = useKeyboardIsVisible();
  const {signInWithGoogle, isLoading: signInGoogleLoading} = useSignInWithGoogle();

  const goToSignupSceen = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Box bg={'$screenBackground'} flex={1}>
      <StatusBar />
      <Box justifyContent={'center'} alignItems={'center'}>
        <DishImage width={keyboardVisible ? 0 : Dimensions.get('window').width} />
      </Box>
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
                returnKeyType={'next'}
                onSubmitEditing={onSubmit}
              />
            )}
            name="password"
          />

          <Pressable p={'xs'} alignSelf={'flex-end'} onPress={goToSignupSceen}>
            <Text variant={'link-small'} color={'$header'} textAlign={'right'}>
              Créer un compte
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
        {submitMutation.error && (
          <Box>
            <Text variant={'body2'}>{submitMutation.error.message}</Text>
          </Box>
        )}
      </Box>
      <Box flex={1} alignItems={'center'} justifyContent={'center'} px={'xl'} p={'l'}>
        <Button
          variant={'primary'}
          label="Se connecter"
          onPress={onSubmit}
          loading={submitMutation.isLoading}
          disabled={signInGoogleLoading}
          mb={'s'}
        />
        <Button
          variant={'outline-left'}
          icon="b-google"
          label="se connecter avec google"
          onPress={() => signInWithGoogle()}
          loading={signInGoogleLoading}
          disabled={submitMutation.isLoading}
          mb={'s'}
        />
        <Button variant={'outline-left'} icon="b-apple" label="se connecter avec apple" onPress={onSubmit} />
      </Box>
    </Box>
  );
};
