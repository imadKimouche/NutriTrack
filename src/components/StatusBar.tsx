import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import {Theme} from '../style/theme';
import {StatusBar as NativeStatusBar} from 'react-native';

const StatusBar: React.FC<{backgroundColor?: keyof Theme['colors']; style?: 'light' | 'dark'}> = ({
  backgroundColor = '$navbarBg',
  style = 'dark',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Box style={{height: insets.top, backgroundColor: backgroundColor}}>
      <NativeStatusBar
        barStyle={style === 'dark' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor={backgroundColor}
      />
    </Box>
  );
};

export default StatusBar;
