import React from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import BaseHeader from '../../components/Header';

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

export type GoalTabProps = {};

const GoalTab: React.FC<GoalTabProps> = () => {
  function skipOnBoarding() {}

  return (
    <Box flex={1}>
      <BaseHeader title="Objectif" rightComponent={<SkipLabel onPress={skipOnBoarding} />} />
    </Box>
  );
};

export default GoalTab;
