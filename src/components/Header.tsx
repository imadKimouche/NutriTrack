import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';

export type HeaderProps = {
  leftComponent?: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
};

export function BaseHeader({leftComponent, title, rightComponent}: HeaderProps) {
  return (
    <Box>
      <Box flex={1}>{leftComponent}</Box>
      <Box flex={1}>
        <Text variant={'headerTitle'}>{title}</Text>
      </Box>
      <Box flex={1}>{rightComponent}</Box>
    </Box>
  );
}
