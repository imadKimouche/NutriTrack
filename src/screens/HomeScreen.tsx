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
  return (
    <ListItem
      title={meal.name}
      subtitle={`${meal.calories} kcal`}
      rightComponent={
        <Text variant={'text-small-tight'} color={'$label'}>
          {meal.portion}
          {meal.unit}
        </Text>
      }
    />
  );
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
      bg={'$bg'}
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

const MacrosTracker: React.FC<{currCalories: number; currProt: number; currCarbs: number; currFat: number}> = ({
  currCalories,
  currProt,
  currCarbs,
  currFat,
}) => {
  const {fitnessData} = useUserFitnessData();
  console.log(fitnessData);
  if (!fitnessData || !fitnessData.tdee) {
    return null;
  }

  const progressRatio = currCalories <= fitnessData.tdee ? currCalories / fitnessData.tdee : 1;
  const normalizedMaxCalories = Math.ceil(fitnessData.tdee);

  return (
    <Box alignSelf={'stretch'} m={'s'}>
      <Text variant={'text-medium'} color={'$header'} mb={'xs'}>
        Progression du jour
      </Text>
      <Box bg={'$secondaryBg'} borderRadius={'sm'} height={8} width={'100%'}>
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
          {currCalories} kcal / {normalizedMaxCalories} kcal
        </Text>
      </Box>

      <Box flexDirection={'row'} alignSelf={'stretch'} justifyContent={'space-around'} py={'s'}>
        <Box alignItems={'center'}>
          <Text variant={'text-x-small'} color={'$header'}>
            Protéines
          </Text>
          <Text variant={'text-x-small-tight'} color={'$body'}>
            {currProt.toFixed()}g
          </Text>
        </Box>

        <Box alignItems={'center'}>
          <Text variant={'text-x-small'} color={'$header'}>
            Glucides
          </Text>
          <Text variant={'text-x-small-tight'} color={'$body'}>
            {currCarbs.toFixed()}g
          </Text>
        </Box>

        <Box alignItems={'center'}>
          <Text variant={'text-x-small'} color={'$header'}>
            Lipides
          </Text>
          <Text variant={'text-x-small-tight'} color={'$body'}>
            {currFat.toFixed()}g
          </Text>
        </Box>
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
  const {dailyMeals} = useUserDailyMeals(currentSelectedDate);
  const {deleteDailyMeal} = useDeleteDailyMeal();

  return (
    <Box bg={'$bgWeak'} flex={1}>
      <BaseHeader
        title="Suivi journalier"
        rightComponent={<Avatar label={initials} onPress={() => navigation.navigate('Settings')} />}
      />
      <Box flex={1} alignItems={'center'} py={'m'}>
        <TrackerCalendar currentDate={currentSelectedDate} onDayPress={setCurrentSelectedDate} />
        <MacrosTracker
          currCalories={dailyMeals?.currentCalories ?? 0}
          currProt={dailyMeals?.currentProt ?? 0}
          currCarbs={dailyMeals?.currentCarbs ?? 0}
          currFat={dailyMeals?.currentFat ?? 0}
        />

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
        {dailyMeals && (
          <Box flex={1} alignSelf={'stretch'}>
            {currentMealType in dailyMeals && dailyMeals[currentMealType] && (
              <FlatList
                contentContainerStyle={{padding: spacing.m}}
                data={dailyMeals[currentMealType]}
                renderItem={({item}) => <MealItem {...item} onLongPress={deleteDailyMeal} />}
                keyExtractor={item => item.name}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomeScreen;
