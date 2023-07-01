import React from 'react';
import Input, {InputProps} from '../atoms/Input';
import {NativeSyntheticEvent, TextInputFocusEventData, TextInputProps} from 'react-native';
import Box from '../atoms/Box';
import Icon from '../components/Icon';
import Text from '../atoms/Text';

type Props = TextInputProps &
  InputProps & {
    icon?: string;
    inputPropPresets?: keyof typeof defaultInputProps;
    error?: string;
  };

const TextInput: React.FC<Props> = ({icon, inputPropPresets, error, value, ...rest}) => {
  const presetProps = inputPropPresets ? defaultInputProps[inputPropPresets] : {};

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
        bg={'$background'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        paddingRight={'m'}
        paddingLeft={'m'}
        borderStyle={'solid'}
        borderWidth={1}
        borderRadius={'xs'}
        borderColor={'$textInputBorderColor'}>
        <Icon name={icon} size={28} color={value?.length ? '$foreground' : '$textInputColor'} />
        <Input
          {...rest}
          {...presetProps}
          value={value}
          bg={'$textInputBackground'}
          borderColor={'transparent'}
          paddingHorizontal={'s'}
          flex={1}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{padding: 0}}
        />
      </Box>
      {error && <Text color={'$textError'}>{error}</Text>}
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
