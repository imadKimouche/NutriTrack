import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {useUserData} from '../hooks/userData';

const HomeScreen = () => {
  const {data} = useUserData();
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text>{data?.goal}</Text>
    </Box>
  );
};

export default HomeScreen;
