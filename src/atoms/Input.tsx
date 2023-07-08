import React from 'react';
import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import {TextInput, TextInputProps} from 'react-native';
import {Theme} from '../style/theme';

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
  backgroundColorShorthand,
  layout,
]);

export type InputProps = RestyleProps;

const Input = (inputProps: InputProps) => {
  const props = useRestyle(restyleFunctions, inputProps);

  return <TextInput {...props} />;
};

export default Input;
