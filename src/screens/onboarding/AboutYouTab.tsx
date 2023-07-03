import React from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import Icon from '../../components/Icon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {ActivityLevel, Gender, useOnBoardingStore} from '../../store/onboarding';
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

const AboutYouTab: React.FC<AboutYouTabProps> = ({navigation}) => {
  const {gender, setGender, age, setAge, height, setHeight, weight, setWeight} = useOnBoardingStore(state => ({
    gender: state.gender,
    setGender: state.setGender,
    age: state.age,
    setAge: state.setAge,
    height: state.height,
    setHeight: state.setHeight,
    weight: state.weight,
    setWeight: state.setWeight,
  }));

  function skipOnBoarding() {}

  return (
    <Box flex={1}>
      <BaseHeader
        title="A propos de toi"
        leftComponent={<GoBackButton onPress={navigation.goBack} />}
        rightComponent={<SkipLabel onPress={skipOnBoarding} />}
      />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'subtitle1'}>
          Encore un peu
        </Text>
        <Box>
          <Text>Sexe</Text>
          {GENDERS.map(item => (
            <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
          ))}
        </Box>
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'}>
        <Button
          width={'32%'}
          label="Suivant"
          onPress={() => {
            navigation.navigate('aboutYou');
          }}
          variant="primary"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default AboutYouTab;
