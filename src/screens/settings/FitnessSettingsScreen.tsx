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
import {ActivityLevelListItem, ACTIVITY_LEVELS} from '../onboarding/ActivityLevelTab';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import LoadingModal from '../../components/LoadingModal';
import ListItem from '../../components/ListItem';

type BottomSheetType = 'fitnessGoal' | 'activityLevel' | undefined;
type FitnessSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const FitnessSettingsScreen: React.FC<{navigation: FitnessSettingsScreenNavigationProp}> = ({navigation}) => {
  const {fitnessGoal, setFitnessGoal, activityLevel, setActivityLevel} = useOnBoardingStore(state => state);
  const snapPointLow = useMemo(() => ['42%'], []);
  const {storeUFDAsync, storeUFDIsLoading} = useUserFitnessData();
  const [bottomSheetType, setBottomSheetType] = useState<BottomSheetType>(undefined);

  function saveSettings() {
    storeUFDAsync({
      fitnessGoal,
      activityLevel,
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

  const fitnessSettings = [
    {id: 'fitnessGoal', label: 'objectif fitness', value: fitnessGoal ?? 'Aucun'},
    {id: 'activityLevel', label: "niveau d'activité", value: activityLevel ?? 'Aucun'},
  ];

  return (
    <Box flex={1} bg={'$bgWeak'}>
      {storeUFDIsLoading && <LoadingModal label="Enregistrement en cours 🤞" />}
      <BaseHeader
        title="Profile"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={
          <Text variant={'text-small'} color={'$primary'} onPress={saveSettings}>
            Enregistrer
          </Text>
        }
      />
      <Box p={'m'}>
        {fitnessSettings.map(setting => (
          <ListItem
            key={setting.id}
            variant={bottomSheetType === setting.id ? 'active' : undefined}
            title={setting.label}
            rightComponent={
              <Text variant={'text-small-tight'} color={'$label'}>
                {setting.value ?? ''}
              </Text>
            }
            rightComponentProps={{flex: 0.5, alignItems: 'flex-end'}}
            onPress={() => openBottomSheetFor(setting.id as BottomSheetType)}
          />
        ))}
      </Box>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPointLow}
        onClose={() => setBottomSheetType(undefined)}
        enablePanDownToClose={true}>
        {bottomSheetType === 'fitnessGoal' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Objectif Fitness
            </Text>
            <FlatList
              data={FITNESS_GOALS}
              renderItem={({item}) => (
                <FitnessGoalListItem {...item} selectedItem={fitnessGoal} onPress={() => setFitnessGoal(item.id)} />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        )}
        {bottomSheetType === 'activityLevel' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
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
