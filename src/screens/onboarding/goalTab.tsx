import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import FIcon from '../../components/FIcon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {FitnessGoal, useOnBoardingStore} from '../../store/onboarding';

export type OnboardingListItem<T> = {
  id: T;
  label: string;
  icon: string;
  indication: string;
};

type FitnessGoalItem = OnboardingListItem<FitnessGoal>;

export const FITNESS_GOALS: FitnessGoalItem[] = [
  {id: 'gain', label: 'Prise de masse', icon: 'chevrons-up', indication: 'Je veux passer au niveau supérieur'},
  {id: 'lose', label: 'Perte de poids', icon: 'chevrons-down', indication: 'Je veux maigrir'},
  {id: 'maintain', label: 'Résistance', icon: 'circle', indication: 'Je cherche a me tonifier'},
  {id: 'recomposition', label: 'Recomposition', icon: 'refresh-cw', indication: 'Éliminer gras et ganger en muscle'},
];

export const FitnessGoalListItem: React.FC<FitnessGoalItem & {selectedItem: FitnessGoal; onPress: () => void}> = ({
  id,
  label,
  icon,
  indication,
  selectedItem,
  onPress,
}) => {
  const isSelected = id === selectedItem;

  return (
    <Pressable
      onPress={onPress}
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
        <Text variant={'body2'} color={isSelected ? '$link' : '$textBody'}>
          {indication}
        </Text>
      </Box>
    </Pressable>
  );
};

export type GoalTabProps = {navigation: TabNavigationProp};

const GoalTab: React.FC<GoalTabProps> = ({navigation}) => {
  const fitnessGoal = useOnBoardingStore(state => state.fitnessGoal);

  const setFitnessGoal = useOnBoardingStore(state => state.setFitnessGoal);

  return (
    <Box flex={1}>
      <BaseHeader title="Objectif" />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'subtitle1'}>
          Quel est ton objectif ?
        </Text>
        <FlatList
          scrollEnabled={false}
          data={FITNESS_GOALS}
          renderItem={({item}) => (
            <FitnessGoalListItem {...item} selectedItem={fitnessGoal} onPress={() => setFitnessGoal(item.id)} />
          )}
          keyExtractor={item => item.id}
        />
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'}>
        <Button
          width={'32%'}
          label="Suivant"
          onPress={() => {
            navigation.navigate('activityLevel');
          }}
          variant="primary-right"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default GoalTab;
