import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {Theme} from '../style/theme';
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
  bg?: keyof Theme['colors'];
  leftComponent?: React.ReactNode;
  title?: string;
  rightComponent?: React.ReactNode;
};

const BaseHeader: React.FC<HeaderProps> = ({bg = '$transparent', leftComponent, title, rightComponent}) => {
  return (
    <Box bg={bg}>
      <StatusBar backgroundColor={bg} />
      <Box bg={bg} height={50} flexDirection={'row'} alignItems={'center'} alignSelf={'flex-start'}>
        <Box flex={0.5}>{leftComponent}</Box>
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          {title && (
            <Text variant={'text-large'} textAlign={'center'} color={'$header'}>
              {title}
            </Text>
          )}
        </Box>
        <Box flex={0.5} alignItems={'center'} justifyContent={'center'}>
          {rightComponent}
        </Box>
      </Box>
    </Box>
  );
};

export default BaseHeader;
