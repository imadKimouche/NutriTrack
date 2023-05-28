import React, {useState} from 'react';
import Input, {InputProps} from '../atoms/Input';
import {TextInputProps} from 'react-native';
import Box from '../atoms/Box';
import Icon from '../components/Icon';

type Props = TextInputProps &
  InputProps & {
    icon: string;
    inputPropPresets?: keyof typeof defaultInputProps;
  };

const TextInput: React.FC<Props> = ({icon, inputPropPresets, ...rest}) => {
  const presetProps = inputPropPresets
    ? defaultInputProps[inputPropPresets]
    : {};
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = value => {
    setValue(value);
  };

  return (
    <Box
      flexDirection={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      paddingRight={'m'}
      paddingLeft={'m'}
      borderStyle={'solid'}
      borderWidth={1}
      borderRadius={'xs'}
      borderColor={'$textInputBorderColor'}>
      <Icon
        name={icon}
        size={28}
        color={
          value.length
            ? '$inputFocusColor'
            : isFocused
            ? '$inputFocusColor'
            : '$textInputColor'
        }
      />
      <Input
        {...rest}
        {...presetProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        bg={'$textInputBackground'}
        borderColor={'transparent'}
        paddingLeft={'s'}
        style={{padding: 0}}
      />
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
    passwordRules:
      'minlength: 8; required: lower; required: upper; required: digit;',
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
