import React, {ReactNode, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from './Icon';

const Collapsible: React.FC<{title: string; open?: boolean; children: ReactNode}> = ({title, open = false, children}) => {
  const [isCollapsed, setIsCollapsed] = useState(!open);
  const animationValue = new Animated.Value(isCollapsed ? 0 : 1);
  const windowHeight = Dimensions.get('window').height;

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
    <Box>
      <Pressable flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} onPress={toggleCollapsible}>
        <Text variant={'h6'} textTransform={'capitalize'}>
          {title}
        </Text>
        <Box bg={'$buttonBgPrimaryDisabled'} borderRadius={'lg'} p={'xs'}>
          <Icon name={isCollapsed ? 'chevron-down' : 'chevron-left'} size={20} color={'$primary'} />
        </Box>
      </Pressable>
      <Animated.View style={{height: interpolatedHeight, overflow: 'hidden'}}>{children}</Animated.View>
    </Box>
  );
};

export default Collapsible;
