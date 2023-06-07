import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import Box from '../atoms/Box';
import Pressable, {PressableProps} from '../atoms/Pressable';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {Theme} from '../style/theme';
import Icon from './Icon';

type PropsBase = PressableProps & VariantProps<Theme, 'buttonVariants'>;

const ButtonBase = createRestyleComponent<PropsBase, Theme>(
  [createVariant({themeKey: 'buttonVariants'})],
  Pressable,
);

type TextProps = Omit<TextPropsBase, 'variant'>;

const ButtonTextBase = createRestyleComponent<
  TextProps & VariantProps<Theme, 'textButtonVariants'>,
  Theme
>([createVariant({themeKey: 'textButtonVariants'})], Text);

const Button = ({
  label,
  variant,
  icon,
  ...rest
}: PropsBase & {label: string; icon?: string}) => {
  return (
    <ButtonBase
      variant={variant}
      width={320}
      paddingHorizontal={'m'}
      height={52}
      justifyContent={'space-around'}
      alignItems={'center'}
      flexDirection={'row'}
      {...rest}>
      <ButtonTextBase variant={variant}>{label}</ButtonTextBase>
      {icon !== undefined && (
        <Icon name={icon} color={'$background'} size={18} />
      )}
    </ButtonBase>
  );
};

export default Button;
