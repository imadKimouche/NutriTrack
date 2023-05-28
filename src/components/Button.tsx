import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native/types';
import Text from '../atoms/Text';

type Props = TouchableOpacityProps & {
  title: string;
};

const Button = ({title, ...rest}: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
