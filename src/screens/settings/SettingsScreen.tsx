import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Icon from '../../components/Icon';
import {signOut} from '../../hooks/auth';
import {HomeStackParamList} from '../HomeStackNavigator';

type SettingsItemProps = {
  label: string;
  icon: string;
  onPress: () => void;
};
const SettingsItem: React.FC<SettingsItemProps> = ({label, icon, onPress}) => {
  return (
    <Pressable flexDirection={'row'} alignItems={'center'} onPress={onPress} p={'s'}>
      <Box
        width={42}
        height={42}
        marginRight={'m'}
        borderRadius={'md'}
        bg={'$logoutIconBackground'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Icon name={icon} size={18} color={'$logoutIcon'} />
      </Box>
      <Text variant={'subtitle1'}>{label}</Text>
    </Pressable>
  );
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Settings'>;
const SettingsScreen: React.FC<{navigation: SettingsScreenNavigationProp}> = ({navigation}) => {
  return (
    <Box flex={1} bg={'$background'}>
      <SettingsItem label="Profil" icon="user" onPress={() => navigation.navigate('ProfileSettings')} />
      <SettingsItem label="Se déconnecter" icon="log-out" onPress={signOut} />
    </Box>
  );
};

export default SettingsScreen;
