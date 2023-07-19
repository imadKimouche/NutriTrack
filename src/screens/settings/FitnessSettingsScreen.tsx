import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {useOnBoardingStore} from '../../store/onboarding';
import {HomeStackParamList} from '../HomeStackNavigator';
import {FitnessGoalListItem, FITNESS_GOALS} from '../onboarding/GoalTab';
import {ProfileSettingsItem, SaveButton} from './ProfileSettingsScreen';
import {ActivityLevelListItem, ACTIVITY_LEVELS} from '../onboarding/ActivityLevelTab';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import LoadingModal from '../../components/LoadingModal';

type BottomSheetType = 'fitnessGoal' | 'activityLevel' | undefined;
type FitnessSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const FitnessSettingsScreen: React.FC<{navigation: FitnessSettingsScreenNavigationProp}> = ({navigation}) => {
  const {fitnessGoal, setFitnessGoal, activityLevel, setActivityLevel, ...onboardingState} = useOnBoardingStore(state => state);
  const snapPointLow = useMemo(() => ['42%'], []);
  const {storeUFDAsync, storeUFDIsLoading} = useUserFitnessData();
  const [bottomSheetType, setBottomSheetType] = useState<BottomSheetType>(undefined);

  function saveSettings() {
    storeUFDAsync({
      fitnessGoal,
      activityLevel,
      age: onboardingState.age,
      height: onboardingState.height,
      weight: onboardingState.weight,
      gender: onboardingState.gender,
      allergies: onboardingState.allergies,
    }).finally(() => {
      bottomSheetRef.current?.close();
    });
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  function openBottomSheetFor(type: BottomSheetType) {
    if (type === undefined) {
      bottomSheetRef.current?.close();
    } else {
      setBottomSheetType(type);
      bottomSheetRef.current?.expand();
    }
  }

  return (
    <Box flex={1} bg={'$background'}>
      {storeUFDIsLoading && <LoadingModal label="Enregistrement en cours 🤞" />}
      <BaseHeader
        title="Fitness"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveButton onPress={saveSettings} />}
      />
      <ProfileSettingsItem
        label="Objectif fitness"
        value={fitnessGoal}
        onPress={() => {
          openBottomSheetFor('fitnessGoal');
        }}
      />
      <ProfileSettingsItem
        label="Niveau d'activité"
        value={activityLevel}
        onPress={() => {
          openBottomSheetFor('activityLevel');
        }}
      />
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPointLow} enablePanDownToClose={true}>
        {bottomSheetType === 'fitnessGoal' && (
          <Box px={'m'}>
            <Text mb={'s'} variant={'subtitle2'}>
              Objectif Fitness
            </Text>
            <FlatList
              data={FITNESS_GOALS}
              renderItem={({item}) => (
                <FitnessGoalListItem {...item} selectedItem={fitnessGoal} setSelectedItem={setFitnessGoal} />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        )}
        {bottomSheetType === 'activityLevel' && (
          <Box px={'m'}>
            <Text mb={'s'} variant={'subtitle2'}>
              Votre niveau d'activité
            </Text>
            <FlatList
              data={ACTIVITY_LEVELS}
              renderItem={({item}) => (
                <ActivityLevelListItem {...item} selectedItem={activityLevel} setSelectedItem={setActivityLevel} />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        )}
      </BottomSheet>
    </Box>
  );
};

export default FitnessSettingsScreen;
