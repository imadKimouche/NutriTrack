import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResponsiveValue} from '@shopify/restyle';
import React from 'react';
import Box from '../../atoms/Box';
import BaseHeader, {GoBackButton} from '../../components/Header';
import FIcon from '../../components/FIcon';
import ListItem from '../../components/ListItem';
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
  return <ListItem onPress={onPress} title={label} leftComponent={<FIcon name={icon} size={18} color={c} />} />;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Settings'>;
const SettingsScreen: React.FC<{navigation: SettingsScreenNavigationProp}> = ({navigation}) => {
  return (
    <Box flex={1} bg={'$screenBackground'}>
      <BaseHeader title="Paramètres" leftComponent={<GoBackButton onPress={navigation.goBack} />} />
      <SettingsItem
        label="Profil"
        bg={'$cardBackground'}
        c={'$primary'}
        icon="user"
        onPress={() => navigation.navigate('ProfileSettings')}
      />
      <SettingsItem
        label="Fitness"
        bg={'$cardBackground'}
        c={'$primary'}
        icon="chevrons-up"
        onPress={() => navigation.navigate('FitnessSettings')}
      />
      <SettingsItem label="Se déconnecter" bg={'$cardBackground'} c={'$error'} icon="log-out" onPress={signOut} />
    </Box>
  );
};

export default SettingsScreen;
