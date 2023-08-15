import React, {useEffect, useState} from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {Gender, useOnBoardingStore} from '../../store/onboarding';
import {generateHeightOptions, generateWeightOptions} from '../../utils';
import {OnboardingListItem} from './GoalTab';
import Picker from '../../components/Picker';
import TextInput from '../../components/TextInput';
import {KeyboardAvoidingView, Platform} from 'react-native';
import ListItem from '../../components/ListItem';

export const HEIGHT_OPTIONS = generateHeightOptions(120, 230, 1);
export const WEIGHT_OPTIONS = generateWeightOptions(30, 180, 1);

export type GenderItem = Omit<OnboardingListItem<Gender>, 'indication'>;

export const GENDERS: GenderItem[] = [
  {id: 'male', label: 'Homme', icon: 'user'},
  {id: 'female', label: 'Femme', icon: 'user'},
];

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
  const canAdvance = gender !== undefined && age !== undefined;

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader
        title="À propos de vous"
        leftComponent={<GoBackButton onPress={() => navigation.navigate('activityLevel')} />}
      />
      <Box flex={1} p={'m'}>
        <Box mb={'m'}>
          <Text variant={'text-small'} color={'$header'}>
            Quel est votre sexe ?
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
        <Box mb={'m'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'} color={'$header'}>
            Age
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flex: 0.55,
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <TextInput
              alignSelf={'stretch'}
              placeholder="Entrez votre age"
              value={ageStr}
              onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
              inputPropPresets={'positiveNumber'}
            />
          </KeyboardAvoidingView>
        </Box>
        <Box mb={'m'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'} color={'$header'}>
            Taille
          </Text>
          <Picker
            containerStyle={{flex: 0.6}}
            selectedValue={height}
            onValueChange={itemValue => setHeight(itemValue as typeof height)}>
            {HEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text variant={'text-small'} color={'$header'}>
            Poids
          </Text>
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
          onPress={() => navigation.navigate('nutritionPreferences')}
          alignSelf={'stretch'}
          label="Suivant"
          variant={canAdvance ? 'primary-right' : 'primary-right-disabled'}
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default AboutYouTab;
