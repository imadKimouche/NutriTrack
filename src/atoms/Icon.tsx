import React from 'react';
import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  color,
  ColorProps,
  composeRestyleFunctions,
  LayoutProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import {Theme} from '../style/theme';
import * as RNVIIcon from 'react-native-vector-icons/Feather';

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

type RestyleProps = VariantProps<Theme, 'iconVariants'> &
  // BackgroundColorProps<Theme> &
  // LayoutProps<Theme> &
  // BackgroundColorProps<Theme> &
  // BackgroundColorShorthandProps<Theme> &
  // ColorProps<Theme> &
  typeof RNVIIcon;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  backgroundColor,
  backgroundColorShorthand,
  color,
]);

type IconProps = RestyleProps;

const Icon = (iconProps: IconProps) => {
  const props = useRestyle(restyleFunctions, iconProps);

  return <RNVIIcon {...props} />;
};

export default Icon;
