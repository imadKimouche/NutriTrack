import {RouteProp} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import {HomeStackParamList} from './HomeStackNavigator';

type MealScreenRouteProp = RouteProp<HomeStackParamList, 'Meal'>;

export const MealHeader: React.FC<NativeStackHeaderProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const mealRoute = route as MealScreenRouteProp;

  let headerTitle = mealRoute.params.meal.name;
  headerTitle = headerTitle.length > 15 ? headerTitle.slice(0, 12) + '...' : headerTitle;

  return (
    <Box
      width={'100%'}
      flexDirection={'row'}
      paddingHorizontal={'l'}
      alignItems={'center'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable
        flex={0.5}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Ajout...</Text>
      </Pressable>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'} fontSize={12}>
          {headerTitle}
        </Text>
      </Box>
      <Box flex={0.5} />
    </Box>
  );
};

const MealScreen: React.FC<{route: MealScreenRouteProp}> = ({route}) => {
  return (
    <Box>
      <Text>meal</Text>
      <Text>{route.params.meal.name}</Text>
    </Box>
  );
};

export default MealScreen;
