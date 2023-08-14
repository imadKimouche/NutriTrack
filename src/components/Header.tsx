import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import FIcon from './FIcon';
import StatusBar from './StatusBar';

export const GoBackButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} alignItems={'flex-start'} ml={'m'} justifyContent={'center'}>
      <FIcon name="arrow-left" color={'$iconRegular'} size={24} />
    </Pressable>
  );
};

export type HeaderProps = {
  leftComponent?: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
};

const BaseHeader: React.FC<HeaderProps> = ({leftComponent, title, rightComponent}) => {
  return (
    <Box>
      <StatusBar backgroundColor="$navbarBg" />
      <Box bg={'$navbarBg'} height={50} flexDirection={'row'} alignItems={'center'} alignSelf={'flex-start'}>
        <Box flex={0.5}>{leftComponent}</Box>
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text variant={'h6'} textAlign={'center'}>
            {title}
          </Text>
        </Box>
        <Box flex={0.5} alignItems={'center'} justifyContent={'center'}>
          {rightComponent}
        </Box>
      </Box>
    </Box>
  );
};

export default BaseHeader;
