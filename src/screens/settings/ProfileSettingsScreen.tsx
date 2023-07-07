import BottomSheet from '@gorhom/bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Input from '../../atoms/Input';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader from '../../components/Header';
import Icon from '../../components/Icon';
import LoadingModal from '../../components/LoadingModal';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import {useOnBoardingStore} from '../../store/onboarding';
import {HomeStackParamList} from '../HomeStackNavigator';
import {GenderListItem, GENDERS, HEIGHT_OPTIONS, WEIGHT_OPTIONS} from '../onboarding/AboutYouTab';
import {ALLERGIES, AllergyListItem, GoBackButton} from '../onboarding/NutritionPrefTab';

export const SaveButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} alignItems={'center'} justifyContent={'center'}>
      <Icon name="check" size={24} color={'$primary'} />
    </Pressable>
  );
};

export const ProfileSettingsItem: React.FC<{onPress: () => void; label: string; value: string}> = ({onPress, label, value}) => {
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
  const bottomSheetRefs = {
    height: useRef<BottomSheet>(null),
    weight: useRef<BottomSheet>(null),
    age: useRef<BottomSheet>(null),
    gender: useRef<BottomSheet>(null),
    allergies: useRef<BottomSheet>(null),
  };

  const snapPointLow = useMemo(() => ['33%'], []);
  const snapPointTop = useMemo(() => ['60%'], []);
  const [ageStr, setAgeStr] = useState(age?.toString() ?? '');

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

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

  function saveSettings() {
    storeUFDAsync({
      fitnessGoal,
      activityLevel,
      age,
      height,
      weight,
      gender,
      allergies,
    }).finally(() => {
      closeAllBottomSheets();
    });
  }

  return (
    <Box flex={1} style={{paddingTop: insets.top}}>
      {storeUFDIsLoading && <LoadingModal label="Enregistrement en cours 🤞" />}
      <BaseHeader
        title="Profile"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveButton onPress={saveSettings} />}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.height.current?.expand();
          closeAllBsExcept('height');
        }}
        label="Taille"
        value={`${height} cm`}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.weight.current?.expand();
          closeAllBsExcept('weight');
        }}
        label="Poids"
        value={`${weight} kg`}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.age.current?.expand();
          closeAllBsExcept('age');
        }}
        label="Age"
        value={`${age} ans`}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.gender.current?.expand();
          closeAllBsExcept('gender');
        }}
        label="Sexe"
        value={gender}
      />
      <ProfileSettingsItem
        onPress={() => {
          bottomSheetRefs.allergies.current?.expand();
          closeAllBsExcept('allergies');
        }}
        label="Allérgies"
        value={''}
      />
      <BottomSheet ref={bottomSheetRefs.age} index={-1} snapPoints={snapPointLow} bottomInset={insets.bottom}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Age</Text>
          <Input
            value={ageStr}
            onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
            padding={'s'}
            marginVertical={'s'}
            keyboardType="numeric"
            borderWidth={1}
            borderColor={'$textInputBorderColor'}
            borderRadius={'xs'}
          />
        </Box>
      </BottomSheet>
      <BottomSheet ref={bottomSheetRefs.gender} index={-1} snapPoints={snapPointLow}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Sexe</Text>
          {GENDERS.map(item => (
            <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
          ))}
        </Box>
      </BottomSheet>
      <BottomSheet ref={bottomSheetRefs.height} index={-1} snapPoints={snapPointLow}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Taille</Text>
          <Picker itemStyle={{height: 110}} selectedValue={height} onValueChange={itemValue => setHeight(itemValue)}>
            {HEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
      </BottomSheet>
      <BottomSheet ref={bottomSheetRefs.weight} index={-1} snapPoints={snapPointLow}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Poids</Text>
          <Picker itemStyle={{height: 110}} selectedValue={weight} onValueChange={itemValue => setWeight(itemValue)}>
            {WEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
      </BottomSheet>
      <BottomSheet ref={bottomSheetRefs.allergies} index={-1} snapPoints={snapPointTop}>
        <Box p={'m'}>
          <Text variant={'subtitle2'}>Allérgies</Text>
          {ALLERGIES.map(item => (
            <AllergyListItem key={item.id} {...item} selectedItems={allergies} onPress={toggleAllergy} />
          ))}
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default ProfileSettingsScreen;
