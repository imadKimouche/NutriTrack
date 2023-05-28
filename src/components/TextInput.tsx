import React, {useState} from 'react';
import Input, {InputProps} from '../atoms/Input';
import {LayoutChangeEvent, TextInputProps} from 'react-native';
import Box from '../atoms/Box';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';

type Props = TextInputProps & InputProps & {icon: string};

const TextInput: React.FC<Props> = ({placeholder, icon, ...rest}) => {
  const theme = useTheme<Theme>();
  const {$textInputColor, $inputFocusColor} = theme.colors;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      {...rest}
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
        color={isFocused ? $inputFocusColor : $textInputColor}
      />
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        variant={isFocused ? 'success' : 'default'}
        placeholder={placeholder}
        bg={'$textInputBackground'}
        borderColor={'transparent'}
        paddingLeft={'s'}
        style={{padding: 0}}
      />
    </Box>
  );
};

export default TextInput;
