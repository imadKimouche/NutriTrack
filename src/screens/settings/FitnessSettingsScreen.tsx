import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useRef} from 'react';
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

type FitnessSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const FitnessSettingsScreen: React.FC<{navigation: FitnessSettingsScreenNavigationProp}> = ({navigation}) => {
  const {fitnessGoal, setFitnessGoal, activityLevel, setActivityLevel, ...onboardingState} = useOnBoardingStore(state => state);
  const snapPointLow = useMemo(() => ['42%'], []);
  const {storeUFDAsync, storeUFDIsLoading} = useUserFitnessData();

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
      closeAllBottomSheets();
    });
  }

  const bottomSheetRefs = {
    fitnessGoal: useRef<BottomSheet>(null),
    activityLevel: useRef<BottomSheet>(null),
  };

  function closeAllBsExcept(key: keyof typeof bottomSheetRefs) {
    Object.entries(bottomSheetRefs).forEach(([k, v]) => {
      k !== key ? v.current?.close() : undefined;
    });
  }

  function closeAllBottomSheets() {
    Object.values(bottomSheetRefs).forEach(v => {
      v.current?.close();
    });
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
        onPress={() => {
          bottomSheetRefs.fitnessGoal.current?.expand();
          closeAllBsExcept('fitnessGoal');
        }}
        label="Objectif fitness"
        value={fitnessGoal}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.activityLevel.current?.expand();
          closeAllBsExcept('activityLevel');
        }}
        label="Niveau d'activité"
        value={activityLevel}
      />
      <BottomSheet ref={bottomSheetRefs.fitnessGoal} index={-1} snapPoints={snapPointLow}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Objectif Fitness</Text>
          <FlatList
            data={FITNESS_GOALS}
            renderItem={({item}) => <FitnessGoalListItem {...item} selectedItem={fitnessGoal} setSelectedItem={setFitnessGoal} />}
            keyExtractor={item => item.id}
          />
        </Box>
      </BottomSheet>
      <BottomSheet ref={bottomSheetRefs.activityLevel} index={-1} snapPoints={snapPointLow}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Votre niveau d'activité</Text>
          <FlatList
            data={ACTIVITY_LEVELS}
            renderItem={({item}) => (
              <ActivityLevelListItem {...item} selectedItem={activityLevel} setSelectedItem={setActivityLevel} />
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default FitnessSettingsScreen;
