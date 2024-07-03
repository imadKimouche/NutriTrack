import React, {ReactNode, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import FIcon from './FIcon';
import {useTheme} from '@shopify/restyle';
import {Theme} from '#/style/theme';

const Collapsible: React.FC<{title: string; open?: boolean; children: ReactNode}> = ({title, open = false, children}) => {
  const {spacing} = useTheme<Theme>();
  const [isCollapsed, setIsCollapsed] = useState(!open);
  const animationValue = new Animated.Value(isCollapsed ? 0 : 1);
  const windowHeight = Dimensions.get('screen').height;

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
    Animated.timing(animationValue, {
      toValue: isCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const interpolatedHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight],
  });

  return (
    <Box borderWidth={1} borderColor={'$line'} borderRadius={'sm'}>
      <Pressable flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} onPress={toggleCollapsible}>
        <Text m={'m'} variant={'text-x-small'} fontWeight={'bold'} textTransform={'capitalize'} color={'$header'}>
          {title}
        </Text>
        <FIcon mr={'m'} name={'plus'} size={18} color={'$header'} />
      </Pressable>
      <Animated.View
        style={{height: interpolatedHeight, overflow: 'hidden', paddingVertical: spacing.s, paddingHorizontal: spacing.m}}>
        {children}
      </Animated.View>
    </Box>
  );
};

export default Collapsible;
