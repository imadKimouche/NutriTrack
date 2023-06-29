import React from 'react';
import {BoxProps, ResponsiveValue, useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import {ActivityIndicator} from 'react-native';

type LoaderProps = {
  color?: keyof Theme['colors'];
  variant?: ResponsiveValue<
    'primary' | 'outlined',
    {
      phone: number;
      tablet: number;
    }
  >;
} & BoxProps<Theme>;

const Loader: React.FC<LoaderProps> = ({color, ...rest}) => {
  const theme = useTheme<Theme>();
  // let v = useResponsiveProp(variant) || 'primary';

  return <ActivityIndicator {...(color ? {color: theme.colors[color]} : {})} {...rest} />;
};

export default Loader;
