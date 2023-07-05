import React from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import {useUserFitnessData} from '../../hooks/userFitnessData';

const ProfileSettingsScreen: React.FC = () => {
  const {userFitnessData} = useUserFitnessData();

  return (
    <Box>
      <Pressable
        onPress={() => {}}
        flexDirection={'row'}
        justifyContent={'space-between'}
        p={'m'}
        borderBottomWidth={1}
        borderColor={'$listItemDivider'}
        bg={'$background'}>
        <Text variant={'body1'}>Taille</Text>
        <Text variant={'body2'}>{userFitnessData?.height} cm</Text>
      </Pressable>
    </Box>
  );
};

export default ProfileSettingsScreen;
