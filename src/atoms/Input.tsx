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
  createRestyleComponent,
  createVariant,
  layout,
  LayoutProps,
  ResponsiveValue,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
  typography,
  TypographyProps,
  useResponsiveProp,
  useRestyle,
  useTheme,
  VariantProps,
} from '@shopify/restyle';
import React, {forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInput,
  TextInputProps,
} from 'react-native';
import {Theme} from '../style/theme';

// type RestyleProps = VariantProps<Theme, 'inputVariants'> &
//   SpacingProps<Theme> &
//   SpacingShorthandProps<Theme> &
//   BorderProps<Theme> &
//   BackgroundColorProps<Theme> &
//   BackgroundColorShorthandProps<Theme> &
//   ShadowProps<Theme> &
//   ColorProps<Theme> &
//   TypographyProps<Theme> &
//   LayoutProps<Theme> &
//   TextInputProps;

type RestyleProps = VariantProps<Theme, 'inputVariants'> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  TextInputProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

export type InputProps = RestyleProps;

const Input = (inputProps: InputProps) => {
  const props = useRestyle(restyleFunctions, inputProps);

  return <TextInput {...props} />;
};

export default Input;
