import {createText} from '@shopify/restyle';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Theme} from '../style/theme';

type IconPropsBase = React.ComponentProps<typeof Feather>;

const FIcon = createText<Theme, IconPropsBase>(Feather);
export type FIconProps = React.ComponentProps<typeof FIcon>;

export default FIcon;
