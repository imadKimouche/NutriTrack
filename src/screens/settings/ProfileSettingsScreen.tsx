import React, {useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import LoadingModal from '../../components/LoadingModal';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import {useOnBoardingStore} from '../../store/onboarding';
import {HomeStackParamList} from '../HomeStackNavigator';
import {GENDERS, HEIGHT_OPTIONS, WEIGHT_OPTIONS} from '../onboarding/AboutYouTab';
import {ALLERGIES} from '../onboarding/NutritionPrefTab';
import BottomSheetTextInput from '../../components/BottomSheetTextInput';
import ListItem from '../../components/ListItem';
import Picker from '../../components/Picker';

type BottomSheetType = 'height' | 'weight' | 'age' | 'gender' | 'allergies' | undefined;
export const ProfileSettingsItem: React.FC<{label: string; value: string; onPress: () => void}> = ({label, value, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      flexDirection={'row'}
      justifyContent={'space-between'}
      p={'m'}
      borderBottomWidth={1}
      borderColor={'$divider'}
      bg={'$cardBackground'}>
      <Text variant={'body1'}>{label}</Text>
      <Text variant={'body2'}>{value}</Text>
    </Pressable>
  );
};

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProfileSettings'>;
const ProfileSettingsScreen: React.FC<{navigation: ProfileSettingsScreenNavigationProp}> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {allergies, toggleAllergy} = useOnBoardingStore(state => ({
    allergies: state.allergies,
    toggleAllergy: state.toggleAllergy,
  }));
  const {height, setHeight} = useOnBoardingStore(state => ({height: state.height, setHeight: state.setHeight}));
  const {weight, setWeight} = useOnBoardingStore(state => ({weight: state.weight, setWeight: state.setWeight}));
  const {age, setAge} = useOnBoardingStore(state => ({age: state.age, setAge: state.setAge}));
  const {gender, setGender} = useOnBoardingStore(state => ({gender: state.gender, setGender: state.setGender}));

  const {storeUFDAsync, storeUFDIsLoading} = useUserFitnessData();
  const [bottomSheetType, setBottomSheetType] = useState<BottomSheetType>(undefined);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['30%', '70%'], []);
  const [ageStr, setAgeStr] = useState(age?.toString() ?? '');

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  function saveSettings() {
    storeUFDAsync({
      age,
      height,
      weight,
      gender,
      allergies,
    }).finally(() => {
      bottomSheetRef.current?.close();
    });
  }

  function openBottomSheetFor(type: BottomSheetType) {
    if (type === undefined) {
      bottomSheetRef.current?.close();
    } else {
      setBottomSheetType(type);
      if (type === 'allergies') {
        bottomSheetRef.current?.snapToIndex(1);
      } else {
        bottomSheetRef.current?.snapToIndex(0);
      }
    }
  }

  const profileSettings = [
    {id: 'height', label: 'taille', value: `${height} cm`},
    {id: 'weight', label: 'poids', value: `${weight} kg`},
    {id: 'age', label: 'age', value: `${age ? age + ' ans' : ''}`},
    {id: 'gender', label: 'genre', value: gender},
    {id: 'allergies', label: 'allérgies', value: ''},
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
        {profileSettings.map(setting => (
          <ListItem
            variant={bottomSheetType === setting.id ? 'active' : undefined}
            key={setting.id}
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
        keyboardBehavior="interactive"
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        onClose={() => setBottomSheetType(undefined)}
        snapPoints={snapPoints}
        bottomInset={insets.bottom}>
        {bottomSheetType === 'age' && (
          <Box px={'m'} flex={1} justifyContent={'flex-start'}>
            <Text py={'xs'} variant={'text-medium'}>
              Age
            </Text>
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
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Genre
            </Text>
            {GENDERS.map(item => (
              <ListItem
                key={item.id}
                onPress={() => setGender(item.id)}
                variant={item.id === gender ? 'active' : undefined}
                title={item.label}
              />
            ))}
          </Box>
        )}
        {bottomSheetType === 'height' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Renseignez votre taille
            </Text>
            <Picker
              itemStyle={{height: 110}}
              selectedValue={height}
              onValueChange={itemValue => setHeight(itemValue as typeof height)}>
              {HEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}

        {bottomSheetType === 'weight' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Renseignez votre poids
            </Text>
            <Picker
              itemStyle={{height: 110}}
              selectedValue={weight}
              onValueChange={itemValue => setWeight(itemValue as typeof weight)}>
              {WEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}
        {bottomSheetType === 'allergies' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Allérgies
            </Text>
            {ALLERGIES.map(item => {
              const added = allergies.includes(item.id);
              return (
                <ListItem
                  key={item.id}
                  onPress={() => toggleAllergy(item.id)}
                  title={item.label}
                  variant={added ? 'active' : undefined}
                  leftComponent={<item.icon width={30} height={30} />}
                />
              );
            })}
          </Box>
        )}
      </BottomSheet>
    </Box>
  );
};

export default ProfileSettingsScreen;
