import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';

export const AddMealHeader: React.FC<NativeStackHeaderProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      width={'100%'}
      flexDirection={'row'}
      paddingHorizontal={'l'}
      alignItems={'center'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable flex={0.5} flexDirection={'row'} alignItems={'center'} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Suivi</Text>
      </Pressable>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>Ajout de repas</Text>
      </Box>
      <Box flex={0.5} />
    </Box>
  );
};

const AddMealScreen: React.FC<{}> = () => {
  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'}>
      <Box>
        <Text>Add Meal</Text>
      </Box>
    </Box>
  );
};

export default AddMealScreen;
