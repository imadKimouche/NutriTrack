import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box';
import Input from '../../atoms/Input';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import FIcon from '../../components/FIcon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {Gender, useOnBoardingStore} from '../../store/onboarding';
import {generateHeightOptions, generateWeightOptions} from '../../utils';
import {OnboardingListItem} from './GoalTab';
import Picker from '../../components/Picker';
import TextInput from '../../components/TextInput';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Theme} from '../../style/theme';
import {useTheme} from '@shopify/restyle';

export const HEIGHT_OPTIONS = generateHeightOptions(120, 230, 1);
export const WEIGHT_OPTIONS = generateWeightOptions(30, 180, 1);

export type GenderItem = Omit<OnboardingListItem<Gender>, 'indication'>;

export const GENDERS: GenderItem[] = [
  {id: 'male', label: 'Homme', icon: 'user'},
  {id: 'female', label: 'Femme', icon: 'user'},
];

export const GenderListItem: React.FC<GenderItem & {selectedItem: Gender; setSelectedItem: (item: Gender) => void}> = ({
  id,
  label,
  icon,
  selectedItem,
  setSelectedItem,
}) => {
  const isSelected = id === selectedItem;

  return (
    <Pressable
      onPress={() => setSelectedItem(id)}
      flexDirection={'row'}
      alignItems={'center'}
      height={56}
      borderBottomWidth={1}
      borderBottomColor={'$divider'}
      borderStyle={'solid'}>
      <FIcon name={icon} size={26} color={isSelected ? '$iconActive' : '$iconRegular'} />
      <Box flex={1} px={'l'}>
        <Text variant={'body1'} color={isSelected ? '$link' : '$textBody'}>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export type AboutYouTabProps = {navigation: TabNavigationProp};

const AboutYouTab: React.FC<AboutYouTabProps> = ({navigation}) => {
  const {gender, setGender, setAge, age, height, setHeight, weight, setWeight} = useOnBoardingStore(state => ({
    gender: state.gender,
    setGender: state.setGender,
    age: state.age,
    setAge: state.setAge,
    height: state.height,
    setHeight: state.setHeight,
    weight: state.weight,
    setWeight: state.setWeight,
  }));
  const [ageStr, setAgeStr] = useState('');

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  return (
    <Box flex={1}>
      <BaseHeader title="A propos de toi" leftComponent={<GoBackButton onPress={() => navigation.navigate('activityLevel')} />} />
      <Box flex={1} p={'m'}>
        <Box>
          <Text variant={'subtitle2'}>Sexe</Text>
          {GENDERS.map(item => (
            <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
          ))}
        </Box>
        <Box mt={'s'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'}>Age</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flex: 0.55,
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <TextInput
              alignSelf={'stretch'}
              placeholder="Ton age"
              value={ageStr}
              onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
              inputPropPresets={'positiveNumber'}
            />
          </KeyboardAvoidingView>
        </Box>
        <Box mt={'s'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'}>Taille</Text>
          <Picker
            containerStyle={{flex: 0.6}}
            selectedValue={height}
            onValueChange={itemValue => setHeight(itemValue as typeof height)}>
            {HEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
        <Box mt={'s'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'}>Poids</Text>
          <Picker
            containerStyle={{flex: 0.6}}
            selectedValue={weight}
            onValueChange={itemValue => setWeight(itemValue as typeof weight)}>
            {WEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'} px={'xl'}>
        <Button
          label="Suivant"
          onPress={() => {
            navigation.navigate('nutritionPreferences');
          }}
          variant="primary-right"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default AboutYouTab;
