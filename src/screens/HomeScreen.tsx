import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import Box from '../atoms/Box';
import Image from '../atoms/Image';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import {useUserData} from '../hooks/userData';
import {Theme} from '../style/theme';
import {HomeStackParamList} from './HomeStackNavigator';

// TODO make dateItem card variants (import from Figma)

type Meal = {
  food: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

type UserDailyData = {
  date: Date;
  currentCalories: number;
  currentProt: number;
  currentFat: number;
  currentCarbs: number;
  breakfast?: Meal[];
  lunch?: Meal[];
  dinner?: Meal[];
  snacks?: Meal[];
};

const dayInMs = 24 * 60 * 60 * 1000;
const today = new Date(1686999956703);
const dayBefore = new Date(today.getTime() - 2 * dayInMs);
const yesterday = new Date(today.getTime() - dayInMs);
const tomorrow = new Date(today.getTime() + dayInMs);
const dayAfter = new Date(today.getTime() + 2 * dayInMs);

const userDailyData: {[key: string]: UserDailyData} = {
  [dayBefore.getTime()]: {
    date: dayBefore,
    currentCalories: 2001,
    currentProt: 30,
    currentFat: 30,
    currentCarbs: 150,
    breakfast: [{food: 'Lait', calories: 300, protein: 180, fat: 20, carbs: 30}],
    lunch: [
      {food: 'Riz', calories: 300, protein: 180, fat: 20, carbs: 30},
      {food: 'Banane', calories: 300, protein: 180, fat: 20, carbs: 30},
      {food: 'Pomme', calories: 300, protein: 180, fat: 20, carbs: 30},
      {food: 'Pates', calories: 300, protein: 180, fat: 20, carbs: 30},
      {food: 'Poulet', calories: 300, protein: 180, fat: 20, carbs: 30},
      {food: 'Fraises', calories: 300, protein: 180, fat: 20, carbs: 30},
    ],
    dinner: [],
  },

  [yesterday.getTime()]: {
    date: yesterday,
    currentCalories: 30,
    currentProt: 0,
    currentFat: 0,
    currentCarbs: 0,
  },
  [today.getTime()]: {
    date: today,
    currentCalories: 3000,
    currentProt: 0,
    currentFat: 0,
    currentCarbs: 0,
  },
  [tomorrow.getTime()]: {
    date: tomorrow,
    currentCalories: 1000,
    currentProt: 0,
    currentFat: 0,
    currentCarbs: 0,
  },
  [dayAfter.getTime()]: {
    date: dayAfter,
    currentCalories: 1500,
    currentProt: 0,
    currentFat: 0,
    currentCarbs: 0,
  },
};

const MAX_CAL = 2300;
const MAX_PROT = 120;
const MAX_FAT = 30;
const MAX_CARBS = 100;

const DatePicker: React.FC<{dates: number[]; currentDate: number; onPress: (date: number) => void}> = ({
  dates,
  currentDate,
  onPress,
}) => {
  return (
    <Box flexDirection={'row'} justifyContent={'space-around'} width={'100%'} px={'l'} py={'l'}>
      {dates.map(date => {
        const dateObj = new Date(date);
        const currentDateObj = new Date(currentDate);
        const isCurrentDate =
          dateObj.getDate() === currentDateObj.getDate() &&
          dateObj.getMonth() === currentDateObj.getMonth() &&
          dateObj.getFullYear() === currentDateObj.getFullYear();

        return (
          <Pressable
            key={date}
            onPress={() => onPress(date)}
            width={42}
            height={42}
            alignItems={'center'}
            justifyContent={'center'}
            bg={isCurrentDate ? '$primary' : '$background'}
            borderRadius={'xs'}
            borderColor={'black'}
            borderStyle={'solid'}
            borderWidth={isCurrentDate ? 0 : 1}>
            <Text color={isCurrentDate ? 'white' : 'black'}>{new Date(date).getDate()}</Text>
          </Pressable>
        );
      })}
    </Box>
  );
};

const MacroItem: React.FC<{
  value: number;
  maxValue: number;
  unit: string;
  label: string;
  color: keyof Theme['colors'];
}> = ({value, maxValue, unit, label, color}) => {
  const fillRatio = value <= maxValue ? value / maxValue : 1;

  return (
    <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
      <Box bg={'$progressBarBackground'} mr={'s'} height={30} width={8} borderRadius={'sm'} flexDirection={'column-reverse'}>
        <Box bg={color} mr={'s'} height={fillRatio * 30} width={8} borderRadius={'sm'} />
      </Box>
      <Box>
        <Text variant={'cardTitle'}>
          {value.toString()} {unit}
        </Text>
        <Text variant={'cardSubtitle'}>{label}</Text>
      </Box>
    </Box>
  );
};

const renderMeal: ListRenderItem<Meal> = ({item: meal}) => {
  return (
    <Box
      bg={'$background'}
      height={120}
      padding={'s'}
      my={'xs'}
      borderColor={'$textInputBorderColor'}
      borderWidth={1}
      borderStyle={'solid'}
      borderRadius={'sm'}>
      <Box flex={1} flexDirection={'row'} alignItems={'center'}>
        <Image />
        <Box marginLeft={'s'}>
          <Text variant={'cardTitle'}>{meal.food}</Text>
          <Text variant={'cardSubtitle'}>{meal.calories}kcal - 100G</Text>
        </Box>
      </Box>
      <Box flex={1} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
        <MacroItem value={meal.protein} maxValue={MAX_PROT} unit="g" label="Protein" color="$proteinBar" />
        <MacroItem value={meal.carbs} maxValue={MAX_CARBS} unit="g" label="Carbs" color="$carbsBar" />
        <MacroItem value={meal.fat} maxValue={MAX_FAT} unit="g" label="Fat" color="$fatBar" />
      </Box>
    </Box>
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
      bg={selected ? '$background' : undefined}>
      <Text variant={selected ? 'labelSmallSelected' : 'labelSmall'} fontSize={12}>
        {label}
      </Text>
    </Pressable>
  );
};

type MealType = keyof Pick<UserDailyData, 'lunch' | 'breakfast' | 'dinner' | 'snacks'>;

const MealTypeSelector: React.FC<{currentMealType: MealType; onMealTypePress: (mealType: MealType) => void}> = ({
  currentMealType,
  onMealTypePress,
}) => {
  return (
    <Box
      flexDirection={'row'}
      alignItems={'stretch'}
      bg={'$dateSelectorBackground'}
      borderRadius={'sm'}
      width={'80%'}
      height={32}
      justifyContent={'space-between'}
      my={'xs'}>
      <MealTypeItem label="Petit déj" selected={currentMealType === 'breakfast'} onPress={() => onMealTypePress('breakfast')} />
      <MealTypeItem label="Déjeuner" selected={currentMealType === 'lunch'} onPress={() => onMealTypePress('lunch')} />
      <MealTypeItem label="Diner" selected={currentMealType === 'dinner'} onPress={() => onMealTypePress('dinner')} />
    </Box>
  );
};

const TotalCalorieBar: React.FC<{currentCalories: number; maxCalories: number}> = ({currentCalories, maxCalories}) => {
  const progressRatio = currentCalories <= maxCalories ? currentCalories / maxCalories : 1;

  return (
    <Box width={'80%'} alignItems={'flex-end'} py={'s'}>
      <Box bg={'$dateSelectorBackground'} borderRadius={'sm'} height={8} width={'100%'}>
        <Box bg={'$seconday'} borderRadius={'sm'} height={8} width={`${progressRatio * 100}%`} />
      </Box>
      <Text variant={'labelSmall'} mt={'s'}>
        {currentCalories}kcal / {maxCalories}kcal
      </Text>
    </Box>
  );
};

const Fab: React.FC<{icon: string; onPress: () => void}> = ({icon, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      bg={'$primary'}
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
        width={26}
        height={26}
        borderColor={'white'}>
        <Icon name={icon} color={'white'} size={20} />
      </Box>
    </Pressable>
  );
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const HomeScreen: React.FC<{navigation: HomeScreenNavigationProp}> = ({navigation}) => {
  // const {data} = useUserData();
  const {spacing} = useTheme<Theme>();
  const [currentDate, setCurrentDate] = useState(dayBefore.getTime());
  const currentDateMeals = userDailyData[currentDate] ?? undefined;
  const [currentMealType, setCurrentMealType] = useState<MealType>('lunch');

  return (
    <Box flex={1} width={'100%'} alignItems={'center'}>
      <DatePicker
        dates={Object.keys(userDailyData).map(key => parseInt(key, 10))}
        currentDate={currentDate}
        onPress={selectedPickerDate => setCurrentDate(selectedPickerDate)}
      />
      <TotalCalorieBar currentCalories={currentDateMeals.currentCalories} maxCalories={MAX_CAL} />
      <MealTypeSelector currentMealType={currentMealType} onMealTypePress={setCurrentMealType} />
      <Fab icon="plus" onPress={() => navigation.navigate('AddMeal')} />
      <Box flex={1} alignSelf={'stretch'}>
        {currentMealType in currentDateMeals && currentDateMeals[currentMealType] && (
          <FlatList
            contentContainerStyle={{padding: spacing.m}}
            data={currentDateMeals[currentMealType]}
            renderItem={renderMeal}
            keyExtractor={item => item.food}
          />
        )}
      </Box>
    </Box>
  );
};

export default HomeScreen;
