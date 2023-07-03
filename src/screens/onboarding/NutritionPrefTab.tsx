import React from 'react';
import Box from '../../atoms/Box';
import Input from '../../atoms/Input';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import Icon from '../../components/Icon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {Gender, useOnBoardingStore} from '../../store/onboarding';
import {OnboardingListItem} from './GoalTab';

const GoBackButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} alignItems={'center'} justifyContent={'center'}>
      <Icon name="arrow-left" color={'$labelOff'} size={24} />
    </Pressable>
  );
};
const SkipLabel: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'row'}
      flex={1}
      alignSelf={'stretch'}>
      <Text variant={'subtitle2'} color={'$labelOff'}>
        Ignorer
      </Text>
    </Pressable>
  );
};

type GenderItem = Omit<OnboardingListItem<Gender>, 'indication'>;

const GENDERS: GenderItem[] = [
  {id: 'male', label: 'Homme', icon: 'user'},
  {id: 'female', label: 'Femme', icon: 'user'},
];

const GenderListItem: React.FC<GenderItem & {selectedItem: Gender; setSelectedItem: (item: Gender) => void}> = ({
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
      borderBottomColor={'$listItemDivider'}
      borderStyle={'solid'}>
      <Icon name={icon} size={26} color={isSelected ? '$primary' : '$labelOff'} />
      <Box flex={1} px={'l'}>
        <Text variant={'body1'} color={isSelected ? '$primary' : 'black'}>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export type AboutYouTabProps = {navigation: TabNavigationProp};

const NutritionPrefTab: React.FC<AboutYouTabProps> = ({navigation}) => {
  const {allergies, addAllergy, removeAllergy, clearAllergies} = useOnBoardingStore(state => ({
    allergies: state.allergies,
    addAllergy: state.addAllergy,
    removeAllergy: state.removeAllergy,
    clearAllergies: state.clearAllergies,
  }));

  function skipOnBoarding() {}

  return (
    <Box flex={1}>
      <BaseHeader
        title="Nutrition"
        leftComponent={<GoBackButton onPress={navigation.goBack} />}
        rightComponent={<SkipLabel onPress={skipOnBoarding} />}
      />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'subtitle1'}>
          Est-tu allérgique?
        </Text>
        <Box>
          {GENDERS.map(item => (
            <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
          ))}
        </Box>
        <Box mt={'s'}>
          <Text variant={'subtitle2'}>Age</Text>
          <Input
            value={age.toString()}
            onChangeText={value => setAge(parseInt(value, 10))}
            padding={'s'}
            marginVertical={'s'}
            keyboardType="numeric"
            borderWidth={1}
            borderColor={'$textInputBorderColor'}
            borderRadius={'xs'}
          />
        </Box>
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'}>
        <Button
          width={'32%'}
          label="Suivant"
          onPress={() => {
            navigation.navigate('nutritionPreferences');
          }}
          variant="primary"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default NutritionPrefTab;
