import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader from '../../components/Header';
import {HomeStackParamList} from '../HomeStackNavigator';
import {GoBackButton} from '../onboarding/NutritionPrefTab';
import {SaveButton} from './ProfileSettingsScreen';

type FitnessSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const FitnessSettingsScreen: React.FC<{navigation: FitnessSettingsScreenNavigationProp}> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  function saveSettings() {}

  return (
    <Box flex={1} style={{paddingTop: insets.top}}>
      <BaseHeader
        title="Profile"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveButton onPress={saveSettings} />}
      />
      <Text>Fitness goal</Text>
    </Box>
  );
};

export default FitnessSettingsScreen;
