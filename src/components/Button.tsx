import {createRestyleComponent, createVariant, VariantProps} from '@shopify/restyle';
import React from 'react';
import Box from '../atoms/Box';
import Pressable, {PressableProps} from '../atoms/Pressable';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {Theme} from '../style/theme';
import Icon from './Icon';
import Loader from './Loader';

type PropsBase = PressableProps & VariantProps<Theme, 'buttonVariants'>;
const ButtonBase = createRestyleComponent<PropsBase, Theme>([createVariant({themeKey: 'buttonVariants'})], Pressable);

type TextProps = Omit<TextPropsBase, 'variant'>;
const ButtonTextBase = createRestyleComponent<TextProps & VariantProps<Theme, 'buttonTextVariants'>, Theme>(
  [createVariant({themeKey: 'buttonTextVariants'})],
  Text,
);

// svgIcon?: React.FC<SvgProps>;
type ButtonProps = {label: string; icon?: string; loading?: boolean};

const Button = ({label, variant, icon, loading, ...rest}: PropsBase & ButtonProps) => {
  return (
    <ButtonBase
      variant={variant}
      width={320}
      paddingHorizontal={'m'}
      height={52}
      justifyContent={'space-around'}
      alignItems={'center'}
      flexDirection={'row'}
      disabled={loading}
      {...rest}>
      <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
        <Box flex={1} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          {loading ? (
            <Loader color={variant === 'primary' ? '$buttonTextPrimary' : '$primary'} />
          ) : (
            <ButtonTextBase variant={variant}>{label}</ButtonTextBase>
          )}
          {icon !== undefined && <Icon name={icon} color={'$buttonTextPrimary'} size={18} marginLeft={'s'} />}
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default Button;
