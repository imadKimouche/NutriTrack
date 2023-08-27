import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {HomeStackParamList} from './HomeStackNavigator';
import Picker from '../components/Picker';
import {usePostMeal} from '../hooks/meal';
import BaseHeader, {GoBackButton} from '../components/Header';
import LoadingModal from '../components/LoadingModal';
import ListItem from '../components/ListItem';
import TextInput from '../components/TextInput';
import {useMealSearchHistory} from '../store/mealSearchHistory';

type AddMealScreenRouteProp = RouteProp<HomeStackParamList, 'AddMeal'>;
type AddMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddMeal'>;

const SaveMealButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Text variant={'text-small-tight'} color={'$primary'}>
        Enregistrer
      </Text>
    </Pressable>
  );
};

const UNITS: Record<string, string[]> = {
  g: ['g', 'kg', 'oz', 'mg'],
  ml: ['ml', 'l', 'cl', 'floz'],
  default: ['g', 'kg', 'oz', 'mg', 'ml', 'l', 'cl', 'floz'],
};

const yieldPortionValue = (portion: number, unit: string, calories: number): number => {
  let result = 0;
  if (unit === 'g') {
    result = (portion / 100) * calories;
  } else if (unit === 'kg') {
    result = (portion * 1000) / 100;
  } else if (unit === 'oz') {
    result = (portion * 28.3495) / 100;
  } else if (unit === 'mg') {
    result = (portion / 1000000) * calories;
  } else if (unit === 'ml') {
    result = (portion / 100) * calories;
  } else if (unit === 'l') {
    result = (portion * 1000) / 100;
  } else if (unit === 'cl') {
    result = (portion * 10) / 100;
  } else if (unit === 'floz') {
    result = (portion * 29.5735) / 100;
  }
  return result;
};

const AddMealScreen: React.FC<{route: AddMealScreenRouteProp; navigation: AddMealScreenNavigationProp}> = ({
  route,
  navigation,
}) => {
  const {meal} = route.params;
  const [unit, setUnit] = useState(meal.unit in UNITS ? meal.unit : '');
  const [portion, setPortion] = useState<number>(meal.portion !== undefined ? meal.portion : 1);
  const {saveUserMealAsync, isLoading: saveMealIsLoading} = usePostMeal();
  const addMealToHistory = useMealSearchHistory(state => state.add);
  //TODO handle save meal loading & error state

  function saveMealPortion() {
    meal.calories = yieldPortionValue(portion, unit, meal.calories);
    meal.proteins = yieldPortionValue(portion, unit, meal.proteins);
    meal.carbs = yieldPortionValue(portion, unit, meal.carbs);
    meal.fat = yieldPortionValue(portion, unit, meal.fat);
    meal.portion = portion;
    meal.unit = unit;
    saveUserMealAsync({meal, portion, unit}).finally(() => {
      navigation.navigate('SearchMeal');
      addMealToHistory(meal);
    });
  }

  const mealUnits = meal.unit in UNITS ? UNITS[meal.unit] : UNITS.default;

  const nutrimentItems = [
    {id: 'calories', label: 'calories', value: `${yieldPortionValue(portion, unit, meal.calories).toFixed(2)} kcal`},
    {id: 'proteins', label: 'protéines', value: `${yieldPortionValue(portion, unit, meal.proteins).toFixed(2)} g`},
    {id: 'carbs', label: 'glucides', value: `${yieldPortionValue(portion, unit, meal.carbs).toFixed(2)} g`},
    {id: 'fat', label: 'lipides', value: `${yieldPortionValue(portion, unit, meal.fat).toFixed(2)} g`},
  ];

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader
        title="Aliment"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveMealButton onPress={saveMealPortion} />}
      />
      {saveMealIsLoading && <LoadingModal label="Enregistrement en cours..." />}
      <Box flex={0.7} alignItems={'center'} px={'s'}>
        <Text variant={'text-medium'} color={'$header'} py={'s'}>
          {meal.name}
        </Text>
        <Image source={{uri: meal.images.url}} style={{width: 200, height: 200}} />
      </Box>
      <Box flex={0.2} px={'m'}>
        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} py={'s'}>
          <Text variant={'text-large-tight'} color={'$header'} mr={'s'}>
            Portion
          </Text>
          <TextInput
            containerStyle={{flex: 1}}
            inputPropPresets={'posituveNumber'}
            value={portion.toString()}
            onChangeText={text => {
              if (text === '') {
                setPortion(0);
              } else {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setPortion(numericValue);
                }
              }
            }}
          />
          <Picker
            itemStyle={{height: 50, width: 150}}
            selectedValue={unit}
            onValueChange={itemValue => setUnit(itemValue.toString())}>
            {mealUnits.map(unitItem => {
              return <Picker.Item key={unitItem} label={unitItem} value={unitItem} />;
            })}
          </Picker>
        </Box>
      </Box>
      <Box flex={1} p={'m'} bg={'$bgWeak'}>
        <Text py={'s'} variant={'text-large-tight'} color={'$header'}>
          Macro-nutriments ({portion}
          {unit})
        </Text>
        <Box bg={'$bgWeak'} borderRadius={'sm'} p={'xs'}>
          {nutrimentItems.map(item => (
            <ListItem
              key={item.id}
              title={item.label}
              rightComponent={
                <Text variant={'text-small-tight'} color={'$secondary'}>
                  {item.value}
                </Text>
              }
              rightComponentProps={{flex: 0.5, alignItems: 'flex-end'}}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddMealScreen;
