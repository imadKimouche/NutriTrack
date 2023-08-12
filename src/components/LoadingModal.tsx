import React from 'react';
import {Dimensions} from 'react-native';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Loader from './Loader';

const LoadingModal: React.FC<{label?: string}> = ({label}) => {
  const {height, width} = Dimensions.get('window');

  return (
    <Box
      position={'absolute'}
      left={(width - width * 0.6) / 2}
      top={(height - height * 0.12) / 2}
      alignItems={'center'}
      justifyContent={'center'}
      height={height * 0.12}
      width={width * 0.6}
      borderRadius={'xs'}
      zIndex={5}
      borderWidth={1}
      borderColor={'$primary'}
      bg={'$modalBackground'}>
      <Loader color={'$primary'} />
      {label !== undefined && (
        <Text py={'s'} variant={'subtitle2'}>
          {label}
        </Text>
      )}
    </Box>
  );
};

export default LoadingModal;
