import React from 'react';
import {Box, useRestyle, spacing} from '@shopify/restyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const BottomTabBox = ({children}) => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const restyleProps = useRestyle([spacing], {
    height: `calc(100% - ${insets.top}px - ${insets.bottom}px - ${tabBarHeight}px)`,
  });

  return <Box {...restyleProps}>{children}</Box>;
};

export default BottomTabBox;
