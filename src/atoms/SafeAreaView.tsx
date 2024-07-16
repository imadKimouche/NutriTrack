import React from 'react';
import {Platform, SafeAreaView as SafeAreaViewBase} from 'react-native';
import {SafeAreaView as SafeAreaViewContextBase} from 'react-native-safe-area-context';

import {createBox} from '@shopify/restyle';
import {Theme} from '#/style/theme';

const BaseComponent = Platform.OS === 'ios' ? SafeAreaViewBase : SafeAreaViewContextBase;

const SafeAreaView = createBox<Theme>(BaseComponent);
export type SafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export default SafeAreaView;
