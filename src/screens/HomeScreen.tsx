import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@shopify/restyle';
import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Avatar from '../components/Avatar';
import BaseHeader from '../components/Header';
import ListItem from '../components/ListItem';
import TrackerCalendar from '../components/TrackerCalendar';
import {useAuth} from '../hooks/auth';
import {Meal, useDeleteDailyMeal, useUserDailyMeals} from '../hooks/meal';
import {useUserFitnessData} from '../hooks/userFitnessData';
import {MealType, useDashboardStore} from '../store/dashboard';
import {Theme} from '../style/theme';
import {extractInitials} from '../utils';
import {HomeStackParamList} from './HomeStackNavigator';
import Button from '../components/Button';

interface MealItemProps extends Meal {
  onLongPress: (id: number) => void;
}

const MealItem: React.FC<MealItemProps> = ({...meal}) => {
  return <ListItem title={meal.name} subtitle={`${meal.calories} kcal`} />;
};

const MealTypeItem: React.FC<{label: string; selected?: boolean; onPress: () => void}> = ({label, selected = false, onPress}) => {
  return (
    <Pressable
      flex={1}
      onPress={onPress}
      alignItems={'center'}
      justifyContent={'center'}
      style={{borderRadius: 12}}
      m={'xs'}
      bg={selected ? '$primaryWeak' : undefined}>
      <Text variant={selected ? 'link-x-small' : 'text-x-small'} color={selected ? '$bg' : '$body'}>
        {label}
      </Text>
    </Pressable>
  );
};

const MealTypeSelector: React.FC<{currentMealType: MealType; onMealTypePress: (mealType: MealType) => void}> = ({
  currentMealType,
  onMealTypePress,
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'stretch'}
      bg={'$bgWeak'}
      borderRadius={'sm'}
      height={32}
      justifyContent={'space-between'}
      mx={'m'}
      my={'s'}>
      <MealTypeItem label="Petit déj" selected={currentMealType === 'breakfast'} onPress={() => onMealTypePress('breakfast')} />
      <MealTypeItem label="Déjeuner" selected={currentMealType === 'lunch'} onPress={() => onMealTypePress('lunch')} />
      <MealTypeItem label="Diner" selected={currentMealType === 'dinner'} onPress={() => onMealTypePress('dinner')} />
      <MealTypeItem label="En-cas" selected={currentMealType === 'snack'} onPress={() => onMealTypePress('snack')} />
    </Box>
  );
};

const TotalCalorieBar: React.FC<{currentCalories: number; maxCalories: number}> = ({currentCalories, maxCalories}) => {
  const progressRatio = currentCalories <= maxCalories ? currentCalories / maxCalories : 1;
  const normalizedMaxCalories = Math.ceil(maxCalories);

  return (
    <Box alignSelf={'stretch'} py={'m'} px={'l'}>
      <Text variant={'text-medium'} color={'$header'}>
        Progression du jour
      </Text>
      <Box bg={'$secondaryBg'} my={'m'} borderRadius={'sm'} height={8} width={'100%'}>
        <Box
          bg={'$secondary'}
          borderTopLeftRadius={'sm'}
          borderBottomLeftRadius={'sm'}
          borderTopRightRadius={progressRatio >= 1 ? 'sm' : undefined}
          borderBottomRightRadius={progressRatio >= 1 ? 'sm' : undefined}
          height={8}
          width={`${progressRatio * 100}%`}
        />
      </Box>
      <Box alignItems={'flex-end'}>
        <Text variant={'text-x-small'} color={'$label'}>
          {currentCalories} kcal / {normalizedMaxCalories} kcal
        </Text>
      </Box>
    </Box>
  );
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const HomeScreen: React.FC<{navigation: HomeScreenNavigationProp}> = ({navigation}) => {
  const {spacing} = useTheme<Theme>();
  const {user} = useAuth();
  const initials = useMemo(() => {
    return extractInitials(user?.email ?? '');
  }, [user?.email]);
  const {currentSelectedDate, setCurrentSelectedDate, currentMealType, setCurrentMealType} = useDashboardStore(state => ({
    currentSelectedDate: state.selectedDate,
    setCurrentSelectedDate: state.setSelectedDate,
    currentMealType: state.selectedMealType,
    setCurrentMealType: state.setSelectedMealType,
  }));
  const {data} = useUserDailyMeals(currentSelectedDate);
  const {deleteDailyMeal} = useDeleteDailyMeal();
  const {userFitnessData} = useUserFitnessData();

  const currentDateMeals = data ?? {
    currentCalories: 0,
    currentCarbs: 0,
    currentFat: 0,
    currentProt: 0,
  };

  return (
    <Box bg={'$bgWeak'} flex={1}>
      <BaseHeader
        title="Suivi journalier"
        rightComponent={<Avatar label={initials} onPress={() => navigation.navigate('Settings')} />}
      />
      <Box flex={1} alignItems={'center'} py={'m'}>
        <TrackerCalendar
          currentDate={currentSelectedDate}
          onPress={selectedPickerDate => setCurrentSelectedDate(selectedPickerDate)}
        />
        <TotalCalorieBar currentCalories={currentDateMeals.currentCalories ?? 0} maxCalories={userFitnessData?.tdee ?? 0} />
        <MealTypeSelector currentMealType={currentMealType} onMealTypePress={setCurrentMealType} />
        <Button
          onPress={() => navigation.navigate('SearchMeal')}
          icon={'plus'}
          width={55}
          height={55}
          position="absolute"
          bottom={15}
          right={15}
          zIndex={1}
        />
        <Box flex={1} alignSelf={'stretch'}>
          {currentMealType in currentDateMeals && currentDateMeals[currentMealType] && (
            <FlatList
              contentContainerStyle={{padding: spacing.m}}
              data={currentDateMeals[currentMealType]}
              renderItem={({item}) => <MealItem {...item} onLongPress={deleteDailyMeal} />}
              keyExtractor={item => item.name}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
