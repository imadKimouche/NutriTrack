import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import Icon from '../../components/Icon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {FitnessGoal, useOnBoardingStore} from '../../store/onboarding';

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

export const FitnessGoalListItem: React.FC<
  FitnessGoalItem & {selectedItem: FitnessGoal; setSelectedItem: (item: FitnessGoal) => void}
> = ({id, label, icon, indication, selectedItem, setSelectedItem}) => {
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
        <Text variant={'body2'} color={isSelected ? '$primary' : '$labelOff'}>
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

  function skipOnBoarding() {}

  return (
    <Box flex={1}>
      <BaseHeader title="Objectif" rightComponent={<SkipLabel onPress={skipOnBoarding} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'subtitle1'}>
          Quel est ton objectif ?
        </Text>
        <FlatList
          scrollEnabled={false}
          data={FITNESS_GOALS}
          renderItem={({item}) => <FitnessGoalListItem {...item} selectedItem={fitnessGoal} setSelectedItem={setFitnessGoal} />}
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
          variant="primary"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default GoalTab;
