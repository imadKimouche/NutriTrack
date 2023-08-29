import React, {forwardRef} from 'react';
import {
  ColorProps,
  useRestyle,
  spacing,
  border,
  backgroundColor,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
  SpacingProps,
  color,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  typography,
  TypographyProps,
  SpacingShorthandProps,
  spacingShorthand,
  LayoutProps,
  layout,
  useTheme,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {TextInput as RNTextInput} from 'react-native';
import {Theme} from '../style/theme';

type RestyleProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'tiInputVariants'>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  color,
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  backgroundColorShorthand,
  typography,
  layout,
  createVariant({themeKey: 'tiInputVariants'}),
]);

export type InputProps = React.ComponentPropsWithRef<typeof RNTextInput> &
  RestyleProps & {
    placeholderColor?: keyof Theme['colors'];
  };

const Input = forwardRef<RNTextInput, InputProps>(({placeholderColor, ...rest}, ref) => {
  const props = useRestyle(restyleFunctions, rest as any);
  const theme = useTheme<Theme>();
  const placeholderTextColorProp = placeholderColor;
  const placeholderTextColorValue = placeholderTextColorProp && theme.colors[placeholderTextColorProp];
  return <RNTextInput ref={ref} {...props} placeholderTextColor={placeholderTextColorValue} />;
});

export default Input;
