import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResponsiveValue} from '@shopify/restyle';
import React from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import Icon from '../../components/Icon';
import {signOut} from '../../hooks/auth';
import {Theme} from '../../style/theme';
import {HomeStackParamList} from '../HomeStackNavigator';

type SettingsItemProps = {
  label: string;
  icon: string;
  onPress: () => void;
  bg: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  c: keyof Theme['colors'];
};
const SettingsItem: React.FC<SettingsItemProps> = ({label, icon, onPress, bg, c}) => {
  return (
    <Pressable flexDirection={'row'} alignItems={'center'} onPress={onPress} p={'s'} px={'m'}>
      <Box width={42} height={42} marginRight={'m'} borderRadius={'md'} bg={bg} alignItems={'center'} justifyContent={'center'}>
        <Icon name={icon} size={18} color={c} />
      </Box>
      <Text variant={'subtitle1'}>{label}</Text>
    </Pressable>
  );
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Settings'>;
const SettingsScreen: React.FC<{navigation: SettingsScreenNavigationProp}> = ({navigation}) => {
  return (
    <Box flex={1} bg={'$background'}>
      <BaseHeader title="Paramètres" leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      <SettingsItem
        label="Profil"
        bg={'$modalShadowDrop'}
        c={'$primary'}
        icon="user"
        onPress={() => navigation.navigate('ProfileSettings')}
      />
      <SettingsItem
        label="Fitness"
        bg={'$modalShadowDrop'}
        c={'$primary'}
        icon="chevrons-up"
        onPress={() => navigation.navigate('FitnessSettings')}
      />
      <SettingsItem label="Se déconnecter" bg={'$logoutIconBackground'} c={'$logoutIcon'} icon="log-out" onPress={signOut} />
    </Box>
  );
};

export default SettingsScreen;
