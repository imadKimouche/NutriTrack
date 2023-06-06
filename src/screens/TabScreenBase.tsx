import React, {ReactNode} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Button from '../components/Button';

type TabScreenBaseProps = {
  title: string;
  children: ReactNode;
  buttonTitle: string;
  onPress: () => void;
};

export const TabScreenBase: React.FC<TabScreenBaseProps> = ({
  title,
  children,
  buttonTitle,
  onPress,
}) => {
  return (
    <Box flex={1} bg={'$background'} alignItems={'center'}>
      <Box flex={1} justifyContent={'center'}>
        <Text variant={'h6'}>{title}</Text>
      </Box>
      <Box width={'100%'} flex={1}>
        {children}
      </Box>
      <Box flex={1} justifyContent={'center'}>
        <Button label={buttonTitle} onPress={onPress} variant="primary" />
      </Box>
    </Box>
  );
};
