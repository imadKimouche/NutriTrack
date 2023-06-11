import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import {signOut} from '../hooks/auth';

type SettingsItemProps = {
  label: string;
  onPress: () => void;
};
const SettingsItem: React.FC<SettingsItemProps> = ({label, onPress}) => {
  return (
    <Pressable flexDirection={'row'} alignItems={'center'} onPress={onPress} p={'m'}>
      <Box
        width={42}
        height={42}
        marginRight={'m'}
        borderRadius={'md'}
        bg={'$logoutIconBackground'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Icon name="log-out" size={18} color={'$logoutIcon'} />
      </Box>
      <Text variant={'buttonLabel'}>{label}</Text>
    </Pressable>
  );
};

const SettingsScreen = () => {
  return (
    <Box flex={1} bg={'$background'}>
      <SettingsItem label="Se déconnecter" onPress={signOut} />
    </Box>
  );
};

export default SettingsScreen;
