import React from 'react';
import {FlatList} from 'react-native';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {useOnBoardingStore} from '../../store/onboarding';

const SkipLabel: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'row'}
      flex={1}
      alignSelf={'stretch'}>
      <Text variant={'headerSkipLabel'}>Ignorer</Text>
    </Pressable>
  );
};

export type ActivityLevelTabProps = {navigation: TabNavigationProp};

const ActivityLevelTab: React.FC<ActivityLevelTabProps> = ({navigation}) => {
  const activityLevel = useOnBoardingStore(state => state.activityLevel);
  const setActivityLevel = useOnBoardingStore(state => state.setActivityLevel);

  function skipOnBoarding() {}

  return (
    <Box flex={1}>
      <BaseHeader title="Objectif" rightComponent={<SkipLabel onPress={skipOnBoarding} />} />
      <Box flex={1} px={'m'}>
        <Text py={'l'} variant={'h7'}>
          Quel est ton niveau d'activité ?
        </Text>
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

export default ActivityLevelTab;
