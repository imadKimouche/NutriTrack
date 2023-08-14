import React from 'react';
import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  color,
  ColorProps,
  composeRestyleFunctions,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  SpacingShorthandProps,
  typography,
  TypographyProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import {TextInput, TextInputProps} from 'react-native';
import {Theme} from '../style/theme';

type RestyleProps = VariantProps<Theme, 'tiInputVariants'> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  TypographyProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  backgroundColorShorthand,
  color,
  typography,
  layout,
  createVariant({themeKey: 'tiInputVariants'}),
]);

export type InputProps = RestyleProps & TextInputProps;

const Input = (inputProps: InputProps) => {
  const props = useRestyle(restyleFunctions, inputProps);

  return <TextInput {...props} />;
};

export default Input;
