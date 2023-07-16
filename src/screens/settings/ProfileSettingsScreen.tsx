import React, {useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import Icon from '../../components/Icon';
import LoadingModal from '../../components/LoadingModal';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import {useOnBoardingStore} from '../../store/onboarding';
import {HomeStackParamList} from '../HomeStackNavigator';
import {GenderListItem, GENDERS, HEIGHT_OPTIONS, WEIGHT_OPTIONS} from '../onboarding/AboutYouTab';
import {ALLERGIES, AllergyListItem} from '../onboarding/NutritionPrefTab';
import BottomSheetTextInput from '../../components/BottomSheetTextInput';
import {FlatList} from 'react-native';

export const SaveButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable alignSelf={'stretch'} onPress={onPress} alignItems={'flex-end'} mr={'m'}>
      <Icon name="check" size={24} color={'$primary'} />
    </Pressable>
  );
};

type BottomSheetType = 'height' | 'weight' | 'age' | 'gender' | 'allergies' | undefined;
export const ProfileSettingsItem: React.FC<{label: string; value: string; onPress: () => void}> = ({label, value, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      flexDirection={'row'}
      justifyContent={'space-between'}
      p={'m'}
      borderBottomWidth={1}
      borderColor={'$listItemDivider'}
      bg={'$background'}>
      <Text variant={'body1'}>{label}</Text>
      <Text variant={'body2'}>{value}</Text>
    </Pressable>
  );
};

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const ProfileSettingsScreen: React.FC<{navigation: ProfileSettingsScreenNavigationProp}> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {
    fitnessGoal,
    activityLevel,
    allergies,
    toggleAllergy,
    age,
    setAge,
    gender,
    setGender,
    height,
    setHeight,
    weight,
    setWeight,
  } = useOnBoardingStore(state => ({
    fitnessGoal: state.fitnessGoal,
    activityLevel: state.activityLevel,
    age: state.age,
    setAge: state.setAge,
    gender: state.gender,
    setGender: state.setGender,
    height: state.height,
    setHeight: state.setHeight,
    weight: state.weight,
    setWeight: state.setWeight,
    allergies: state.allergies,
    toggleAllergy: state.toggleAllergy,
  }));
  const {storeUFDAsync, storeUFDIsLoading} = useUserFitnessData();
  const [bottomSheetType, setBottomSheetType] = useState<BottomSheetType>(undefined);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoint = useMemo(() => ['30%'], []);
  const [ageStr, setAgeStr] = useState(age?.toString() ?? '');

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  function saveSettings() {
    storeUFDAsync({
      fitnessGoal,
      activityLevel,
      age,
      height,
      weight,
      gender,
      allergies,
    }).finally(() => {});
  }

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
        title="Profile"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveButton onPress={saveSettings} />}
      />
      <ProfileSettingsItem label="Taille" value={`${height} cm`} onPress={() => openBottomSheetFor('height')} />
      <ProfileSettingsItem label="Poids" value={`${weight} kg`} onPress={() => openBottomSheetFor('weight')} />
      <ProfileSettingsItem label="Age" value={`${age} ans`} onPress={() => openBottomSheetFor('age')} />
      <ProfileSettingsItem label="Genre" value={gender} onPress={() => openBottomSheetFor('gender')} />
      <ProfileSettingsItem label="Allérgies" value={''} onPress={() => openBottomSheetFor('allergies')} />
      <BottomSheet
        keyboardBehavior="interactive"
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoint}
        bottomInset={insets.bottom}>
        {bottomSheetType === 'age' && (
          <Box p={'m'} flex={1} justifyContent={'flex-start'}>
            <Text variant={'subtitle2'}>Age</Text>
            <BottomSheetTextInput
              value={ageStr}
              onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              returnKeyType="done"
              marginTop={'m'}
            />
          </Box>
        )}
        {bottomSheetType === 'gender' && (
          <Box p={'m'}>
            <Text variant={'subtitle2'}>Sexe</Text>
            {GENDERS.map(item => (
              <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
            ))}
          </Box>
        )}
        {bottomSheetType === 'height' && (
          <Box p={'m'}>
            <Text variant={'subtitle2'}>Taille</Text>
            <Picker itemStyle={{height: 110}} selectedValue={height} onValueChange={itemValue => setHeight(itemValue)}>
              {HEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}

        {bottomSheetType === 'weight' && (
          <Box p={'m'}>
            <Text variant={'subtitle2'}>Poids</Text>
            <Picker itemStyle={{height: 110}} selectedValue={weight} onValueChange={itemValue => setWeight(itemValue)}>
              {WEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}
        {bottomSheetType === 'allergies' && (
          <Box p={'m'}>
            <Text variant={'subtitle2'} mb={'m'}>
              Allérgies
            </Text>
            <FlatList
              data={ALLERGIES}
              renderItem={({item}) => (
                <AllergyListItem key={item.id} {...item} selectedItems={allergies} onPress={toggleAllergy} />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        )}
      </BottomSheet>
    </Box>
  );
};

export default ProfileSettingsScreen;
