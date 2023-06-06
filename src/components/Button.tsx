import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import Pressable, {PressableProps} from '../atoms/Pressable';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {Theme} from '../style/theme';

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

const Button = ({label, variant, ...rest}: PropsBase & {label: string}) => {
  return (
    <ButtonBase
      variant={variant}
      width={320}
      height={52}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}>
      <ButtonTextBase variant={variant}>{label}</ButtonTextBase>
    </ButtonBase>
  );
};

export default Button;
