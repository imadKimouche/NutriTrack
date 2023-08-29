import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {TopTabParams} from '../../navigation/OnboardingNavigator';
import {FoodAllergy, useOnBoardingStore} from '../../store/onboarding';
import {OnboardingListItem} from './GoalTab';
import NoGlutenImage from '../../assets/sans-gluten.svg';
import NoDiaryImage from '../../assets/lait.svg';
import NoNutImage from '../../assets/cacahuete.svg';
import NoShellfishImage from '../../assets/crevette.svg';
import NoSoyImage from '../../assets/soja.svg';
import NoEggsImage from '../../assets/des-oeufs.svg';
import NoGrainImage from '../../assets/farine.svg';
import {SvgProps} from 'react-native-svg';
import ListItem from '../../components/ListItem';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/MainNavigator';

type FoodAllergyItem = Omit<OnboardingListItem<FoodAllergy>, 'indication' | 'icon'> & {icon: React.FC<SvgProps>};

export const ALLERGIES: FoodAllergyItem[] = [
  {
    id: 'gluten',
    label: 'Allergie au gluten',
    icon: NoGlutenImage,
  },
  {
    id: 'diary',
    label: 'Allergie aux produits laitiers',
    icon: NoDiaryImage,
  },
  {
    id: 'nut',
    label: 'Allergie aux fruits à coque',
    icon: NoNutImage,
  },
  {
    id: 'shellfish',
    label: 'Allergie aux crustacés et aux poissons',
    icon: NoShellfishImage,
  },
  {
    id: 'eggs',
    label: 'Allergie aux œufs',
    icon: NoEggsImage,
  },
  {
    id: 'soy',
    label: 'Allergie au soja',
    icon: NoSoyImage,
  },
  {
    id: 'grain',
    label: 'Allergie au sésame',
    icon: NoGrainImage,
  },
];

type NutritionPrefTabScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<TopTabParams, 'nutritionPreferences'>,
  NativeStackScreenProps<RootStackParamList>
>;

const NutritionPrefTab: React.FC<NutritionPrefTabScreenProps> = ({navigation}) => {
  const {allergies, toggleAllergy} = useOnBoardingStore(state => ({
    allergies: state.allergies,
    toggleAllergy: state.toggleAllergy,
  }));

  function setUserData() {
    navigation.navigate('signUp');
  }

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader title="Nutrition" leftComponent={<GoBackButton onPress={() => navigation.navigate('aboutYou')} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'text-medium'} color={'$header'}>
          Avez-vous des allérgies ?
        </Text>
        <Box>
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
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'} px={'xl'}>
        <Button
          onPress={setUserData}
          alignSelf={'stretch'}
          label="Accéder à mon suivi"
          variant={'primary-right'}
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default NutritionPrefTab;
