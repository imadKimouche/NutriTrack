import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';

export type HeaderProps = {
  leftComponent?: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
};

const BaseHeader: React.FC<HeaderProps> = ({leftComponent, title, rightComponent}) => {
  return (
    <Box
      bg={'$background'}
      borderBottomWidth={1}
      borderColor={'$listItemDivider'}
      height={50}
      flexDirection={'row'}
      alignItems={'center'}
      alignSelf={'flex-start'}>
      <Box flex={0.3}>{leftComponent}</Box>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'h6'}>{title}</Text>
      </Box>
      <Box flex={0.3} alignItems={'center'} justifyContent={'center'}>
        {rightComponent}
      </Box>
    </Box>
  );
};

export default BaseHeader;
