import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  composeRestyleFunctions,
  LayoutProps,
  spacing,
  SpacingProps,
  border,
  backgroundColor,
  useRestyle,
  color,
  layout,
} from '@shopify/restyle';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Theme} from '../style/theme';

export type IconProps = React.ComponentProps<typeof Feather>;

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([spacing, border, backgroundColor, color, layout]);

type Props = Omit<IconProps, 'color'> & RestyleProps;

const Icon: React.FC<Props> = ({...rest}) => {
  const props = useRestyle(restyleFunctions, rest);
  return <Feather {...props} />;
};

export default Icon;
