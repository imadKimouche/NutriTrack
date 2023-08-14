import React from 'react';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/theme';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

export type LoaderProps = {
  color?: keyof Theme['colors'];
} & ActivityIndicatorProps;

const Loader: React.FC<LoaderProps> = ({color, ...rest}) => {
  const {colors} = useTheme<Theme>();

  return <ActivityIndicator color={color ? colors[color] : undefined} {...rest} />;
};

export default Loader;
