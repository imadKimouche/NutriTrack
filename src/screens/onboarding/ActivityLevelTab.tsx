import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import FIcon from '../../components/FIcon';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {ActivityLevel, useOnBoardingStore} from '../../store/onboarding';
import {OnboardingListItem} from './GoalTab';

type ActivityLevelItem = OnboardingListItem<ActivityLevel>;

export const ACTIVITY_LEVELS: ActivityLevelItem[] = [
  {id: 'minimal', label: 'Sédentaire', icon: 'monitor', indication: "Travail de bureau, min d'activité"},
  {id: 'light', label: 'Léger', icon: 'chevrons-down', indication: 'Exercice 1-3 fois par semaine'},
  {id: 'moderate', label: 'Modéré', icon: 'clock', indication: 'Exercice 3-5 fois par semaine'},
  {id: 'active', label: 'Actif', icon: 'chevrons-up', indication: 'Exercice 6-7 fois par semaine'},
  {id: 'extreme', label: 'Très actif', icon: 'zap', indication: 'exercice très intense/sport et travail physique'},
];

export const ActivityLevelListItem: React.FC<
  ActivityLevelItem & {selectedItem: ActivityLevel; setSelectedItem: (item: ActivityLevel) => void}
> = ({id, label, icon, indication, selectedItem, setSelectedItem}) => {
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
        <Text variant={'body2'} color={isSelected ? '$link' : '$textBody'}>
          {indication}
        </Text>
      </Box>
    </Pressable>
  );
};

export type ActivityLevelTabProps = {navigation: TabNavigationProp};

const ActivityLevelTab: React.FC<ActivityLevelTabProps> = ({navigation}) => {
  const activityLevel = useOnBoardingStore(state => state.activityLevel);
  const setActivityLevel = useOnBoardingStore(state => state.setActivityLevel);

  return (
    <Box flex={1}>
      <BaseHeader title="Niveau d'activité" leftComponent={<GoBackButton onPress={navigation.goBack} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'subtitle1'}>
          Quel est ton niveau d'activité ?
        </Text>
        <FlatList
          data={ACTIVITY_LEVELS}
          renderItem={({item}) => (
            <ActivityLevelListItem {...item} selectedItem={activityLevel} setSelectedItem={setActivityLevel} />
          )}
          keyExtractor={item => item.id}
        />
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'}>
        <Button
          width={'32%'}
          label="Suivant"
          onPress={() => {
            navigation.navigate('aboutYou');
          }}
          variant="primary-medium-right"
          icon="chevron-right"
        />
      </Box>
    </Box>
  );
};

export default ActivityLevelTab;
