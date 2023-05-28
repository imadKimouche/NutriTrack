import React from 'react';
import Input, {InputProps} from '../atoms/Input';
import {TextInputProps} from 'react-native';

type Props = TextInputProps & InputProps;

const TextInput: React.FC<Props> = ({...rest}) => {
  return (
    <Input
      {...rest}
      variant={'default'}
      borderRadius={'xs'}
      paddingLeft={'m'}
      paddingRight={'m'}
      bg={'$textInputBackground'}
      borderColor={'$textInputBorderColor'}
      borderStyle={'solid'}
      borderWidth={1}
    />
  );
};

export default TextInput;
