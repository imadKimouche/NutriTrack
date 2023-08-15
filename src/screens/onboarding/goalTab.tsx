import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import FIcon from '../../components/FIcon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {FitnessGoal, useOnBoardingStore} from '../../store/onboarding';
import ListItem from '../../components/ListItem';

export type OnboardingListItem<T> = {
  id: T;
  label: string;
  icon: string;
  indication: string;
};

type FitnessGoalItem = OnboardingListItem<FitnessGoal>;

export const FITNESS_GOALS: FitnessGoalItem[] = [
  {id: 'lose', label: 'Perdre du poids', icon: 'chevrons-down', indication: 'Je veux maigrir'},
  {id: 'maintain', label: 'Stabiliser mon poids', icon: 'circle', indication: 'Je veux garder la forme'},
  {id: 'gain', label: 'Prendre du poids', icon: 'chevrons-up', indication: 'Je veux prendre du muscle'},
  {id: 'recomposition', label: 'Recomposition', icon: 'refresh-cw', indication: 'Je veux remoduler ma silhouette'},
];

export const FitnessGoalListItem: React.FC<FitnessGoalItem & {selectedItem?: FitnessGoal; onPress: () => void}> = ({
  id,
  label,
  icon,
  indication,
  selectedItem,
  onPress,
}) => {
  const selected = id === selectedItem;

  return (
    <ListItem
      onPress={onPress}
      variant={selected ? 'active' : undefined}
      title={label}
      subtitle={indication}
      leftComponent={<FIcon name={icon} size={24} color={selected ? '$primary' : undefined} />}
    />
  );
};

export type GoalTabProps = {navigation: TabNavigationProp};

const GoalTab: React.FC<GoalTabProps> = ({navigation}) => {
  const {fitnessGoal, setFitnessGoal} = useOnBoardingStore(state => ({
    fitnessGoal: state.fitnessGoal,
    setFitnessGoal: state.setFitnessGoal,
  }));

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader title="Objectif" leftComponent={<GoBackButton onPress={navigation.goBack} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'text-medium'}>
          Quel est votre objectif ?
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
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'} px={'xl'}>
        <Button
          onPress={() => navigation.navigate('activityLevel')}
          alignSelf={'stretch'}
          label="Suivant"
          variant={fitnessGoal === undefined ? 'primary-right-disabled' : 'primary-right'}
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default GoalTab;
