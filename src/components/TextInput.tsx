import React from 'react';
import Input, {InputProps} from '../atoms/Input';
import {NativeSyntheticEvent, Platform, TextInputFocusEventData, TextInputProps} from 'react-native';
import Box from '../atoms/Box';
import FIcon from '../components/FIcon';
import Text from '../atoms/Text';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';

type Props = TextInputProps &
  InputProps & {
    icon?: string;
    inputPropPresets?: keyof typeof defaultInputProps;
    error?: string;
  };

const TextInput: React.FC<Props> = ({icon, inputPropPresets, error, value, ...rest}) => {
  const presetProps = inputPropPresets ? defaultInputProps[inputPropPresets] : {};
  const {colors} = useTheme<Theme>();

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onBlur) {
      rest.onBlur(event);
    }
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onFocus) {
      rest.onFocus(event);
    }
  };

  return (
    <Box marginBottom={'s'}>
      <Box
        bg={'$inputBg'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        px={'s'}
        borderStyle={'solid'}
        borderWidth={1}
        borderRadius={'sm'}
        borderColor={'$inputBorder'}>
        <FIcon name={icon} size={26} color={value?.length ? '$iconActive' : '$iconRegular'} />
        <Input
          {...rest}
          {...presetProps}
          value={value}
          bg={'$inputBg'}
          borderColor={'$inputBorder'}
          placeholderTextColor={colors.$inputPlaceholder}
          paddingHorizontal={'s'}
          paddingVertical={'m'}
          borderRadius={'sm'}
          flex={1}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{padding: 0}}
        />
      </Box>
      {error && <Text color={'$error'}>{error}</Text>}
    </Box>
  );
};

const defaultInputProps: {[id: string]: Partial<InputProps>} = {
  firstName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    autoComplete: 'name-given',
    textContentType: 'givenName',
  },
  lastName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    autoComplete: 'name-family',
    textContentType: 'familyName',
  },
  businessName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    textContentType: 'organizationName',
  },
  password: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'password',
    textContentType: 'password',
  },
  newPassword: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'password-new',
    secureTextEntry: true,
    textContentType: Platform.OS === 'ios' ? undefined : 'newPassword',
    passwordRules: 'minlength: 8; required: lower; required: upper; required: digit;',
  },
  email: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'email',
    inputMode: 'email',
    keyboardType: 'email-address',
    textContentType: 'emailAddress',
  },
  phoneNumber: {
    autoComplete: 'tel',
    inputMode: 'tel',
    keyboardType: 'phone-pad',
    textContentType: 'telephoneNumber',
  },
  positiveNumber: {
    keyboardType: 'number-pad',
  },
} as const;

export default TextInput;
