import {createText} from '@shopify/restyle';
import React from 'react';
import FontAwesomeBrands from 'react-native-vector-icons/FontAwesome5';
import {Theme} from '../style/theme';

type IconPropsBase = React.ComponentProps<typeof FontAwesomeBrands>;

const BrandIcon = createText<Theme, IconPropsBase>(FontAwesomeBrands);
export type FIconProps = React.ComponentProps<typeof BrandIcon>;

export default BrandIcon;
