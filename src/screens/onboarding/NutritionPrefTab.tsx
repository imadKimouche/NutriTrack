import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {ActivityLevel, FitnessGoal, FoodAllergy, useOnBoardingStore} from '../../store/onboarding';
import {OnboardingListItem} from './GoalTab';
import NoGlutenImage from '../../assets/sans-gluten.svg';
import NoDiaryImage from '../../assets/lait.svg';
import NoNutImage from '../../assets/cacahuete.svg';
import NoShellfishImage from '../../assets/crevette.svg';
import NoSoyImage from '../../assets/soja.svg';
import NoEggsImage from '../../assets/des-oeufs.svg';
import NoGrainImage from '../../assets/farine.svg';
import {SvgProps} from 'react-native-svg';
import {calculateBMR} from '../../utils';
import {useUserFitnessData} from '../../hooks/userFitnessData';
import ListItem from '../../components/ListItem';

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

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  minimal: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

const CALORIES_MODIFIERS: Record<FitnessGoal, number> = {
  gain: 200,
  lose: -200,
  maintain: 0,
  recomposition: -100,
};

export type AboutYouTabProps = {navigation: TabNavigationProp};

const NutritionPrefTab: React.FC<AboutYouTabProps> = ({navigation}) => {
  const {allergies, toggleAllergy} = useOnBoardingStore(state => ({
    allergies: state.allergies,
    toggleAllergy: state.toggleAllergy,
  }));
  // const {fitnessGoal, activityLevel, age, gender, height, weight} = useOnBoardingStore(state => ({
  //   fitnessGoal: state.fitnessGoal,
  //   activityLevel: state.activityLevel,
  //   age: state.age,
  //   gender: state.gender,
  //   height: state.height,
  //   weight: state.weight,
  // }));
  // const {storeUserFitnessData, storeUFDIsLoading} = useUserFitnessData();

  function setUserData() {
    // const bmr = calculateBMR(gender, age, height, weight);
    // const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel] + CALORIES_MODIFIERS[fitnessGoal];
    // storeUserFitnessData({fitnessGoal, activityLevel, gender, age, height, weight, allergies, tdee});
    navigation.navigate('signup');
  }

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader title="Nutrition" leftComponent={<GoBackButton onPress={() => navigation.navigate('aboutYou')} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'text-medium'}>
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
