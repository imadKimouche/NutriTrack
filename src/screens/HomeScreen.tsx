import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@shopify/restyle';
import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import Box from '../atoms/Box';
import Image from '../atoms/Image';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import BaseHeader from '../components/Header';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import {useAuth} from '../hooks/auth';
import {Meal, useDeleteDailyMeal, useUserDailyMeals} from '../hooks/meal';
import {useUserFitnessData} from '../hooks/userFitnessData';
import {MealType, useDashboardStore} from '../store/dashboard';
import {Theme} from '../style/theme';
import {extractInitials, getSurroundingDates} from '../utils';
import {HomeStackParamList} from './HomeStackNavigator';

// TODO make dateItem card variants (import from Figma)

const ProfileSettingsIcon: React.FC<{email?: string | null; onPress: () => void}> = ({email, onPress}) => {
  const initials = useMemo(() => {
    return extractInitials(email);
  }, [email]);

  return (
    <Pressable
      onPress={onPress}
      width={40}
      height={40}
      borderRadius={'lg'}
      alignItems={'center'}
      justifyContent={'center'}
      borderColor={'$buttonBorderOutline'}
      borderStyle={'solid'}
      borderWidth={1}
      bg={'$buttonBgOutline'}>
      <Text variant={'h6'} color={'$buttonTextOutline'}>
        {initials}
      </Text>
    </Pressable>
  );
};

const DatePicker: React.FC<{currentDate: string; onPress: (date: string) => void}> = ({currentDate, onPress}) => {
  const dates = getSurroundingDates(currentDate, 2, 2); // get 2 days before, 2 days after

  return (
    <Box flexDirection={'row'} justifyContent={'space-around'} alignSelf={'stretch'} p={'m'}>
      {dates.map(date => {
        const selected = currentDate === date;
        const dateSplit = date.split('-');
        const dayInWeek = dateSplit[0];
        const day = dateSplit[1];

        return (
          <Pressable
            key={date}
            onPress={() => onPress(date)}
            width={58}
            height={78}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            bg={selected ? '$buttonBgPrimary' : '$buttonBgOutline'}
            borderRadius={'sm'}>
            <Text color={selected ? '$buttonTextPrimary' : '$textBody'} variant={'body2'}>
              {dayInWeek}
            </Text>
            <Text color={selected ? '$buttonTextPrimary' : '$textLabel'} variant={'subtitle1'}>
              {day}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
};

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
      bg={selected ? '$buttonBgPrimary' : undefined}>
      <Text variant={selected ? 'subtitle2' : 'body2'} color={selected ? '$buttonTextPrimary' : '$textBody'}>
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
      bg={'$cardBackground'}
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
      <Text variant={'subtitle1'}>Progression du jour</Text>
      <Box bg={'$cardBackground'} my={'s'} borderRadius={'sm'} height={8} width={'100%'}>
        <Box
          bg={'$info'}
          borderTopLeftRadius={'sm'}
          borderBottomLeftRadius={'sm'}
          borderTopRightRadius={progressRatio >= 1 ? 'sm' : undefined}
          borderBottomRightRadius={progressRatio >= 1 ? 'sm' : undefined}
          height={8}
          width={`${progressRatio * 100}%`}
        />
      </Box>
      <Box alignItems={'flex-end'}>
        <Text variant={'subtitle2'}>
          {currentCalories} kcal / {normalizedMaxCalories} kcal
        </Text>
      </Box>
    </Box>
  );
};

const Fab: React.FC<{icon: string; onPress: () => void}> = ({icon, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      bg={'$buttonBgPrimary'}
      width={48}
      height={48}
      zIndex={2}
      borderRadius={'sm'}
      alignItems={'center'}
      justifyContent={'center'}
      position={'absolute'}
      bottom={16}
      right={16}>
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        borderStyle={'solid'}
        borderRadius={'lg'}
        borderWidth={1}
        borderColor={'$buttonTextPrimary'}
        width={26}
        height={26}>
        <Icon name={icon} color={'$buttonTextPrimary'} size={20} />
      </Box>
    </Pressable>
  );
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const HomeScreen: React.FC<{navigation: HomeScreenNavigationProp}> = ({navigation}) => {
  const {spacing} = useTheme<Theme>();
  const {user} = useAuth();
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
    <Box bg={'$screenBackground'} flex={1}>
      <BaseHeader
        title="Suivi journalier"
        rightComponent={<ProfileSettingsIcon email={user?.email} onPress={() => navigation.navigate('Settings')} />}
      />
      <Box bg={'$screenBackground'} flex={1} alignItems={'center'}>
        <DatePicker
          currentDate={currentSelectedDate}
          onPress={selectedPickerDate => setCurrentSelectedDate(selectedPickerDate)}
        />
        <TotalCalorieBar currentCalories={currentDateMeals.currentCalories ?? 0} maxCalories={userFitnessData?.tdee ?? 0} />
        <MealTypeSelector currentMealType={currentMealType} onMealTypePress={setCurrentMealType} />
        <Fab icon="plus" onPress={() => navigation.navigate('SearchMeal')} />
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
