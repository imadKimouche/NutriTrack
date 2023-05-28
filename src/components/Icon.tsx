import {ColorProps, useResponsiveProp, useTheme} from '@shopify/restyle';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Theme} from '../style/theme';

export type IconProps = React.ComponentProps<typeof Feather>;
type Props = Omit<IconProps, 'color'> & ColorProps<Theme>;

const Icon: React.FC<Props> = ({color = '$foreground', ...rest}) => {
  const theme = useTheme<Theme>();
  const colorProp = useResponsiveProp(color);
  const vColor = theme.colors[colorProp || '$foreground'];
  return <Feather {...rest} color={vColor} />;
};

export default Icon;
