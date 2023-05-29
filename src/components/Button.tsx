import React from 'react';
import Text from '../atoms/Text';
import {TouchableOpacity, TouchableOpacityProps} from '../atoms/Touchable';

type Props = TouchableOpacityProps & {
  label: string;
};

const Button = ({label, ...rest}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      bg={'$primary'} // replace with variants
      width={320}
      height={52}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={'md'}>
      <Text color={'$background'}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
