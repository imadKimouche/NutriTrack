import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import {Theme} from '../style/theme';
import {StatusBar as NativeStatusBar} from 'react-native';
import {useTheme} from '@shopify/restyle';

const StatusBar: React.FC<{backgroundColor?: keyof Theme['colors']; style?: 'light' | 'dark'}> = ({
  backgroundColor,
  style = 'dark',
}) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme<Theme>();

  return (
    <Box bg={backgroundColor ?? '$bgWeak'} style={{height: insets.top}}>
      <NativeStatusBar
        barStyle={style === 'dark' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor={colors[backgroundColor ?? '$bgWeak']}
      />
    </Box>
  );
};

export default StatusBar;
