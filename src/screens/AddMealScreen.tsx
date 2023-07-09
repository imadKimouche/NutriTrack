import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {HomeStackParamList} from './HomeStackNavigator';
import Picker from '../components/Picker';
import Input from '../atoms/Input';
import {usePostMeal} from '../hooks/meal';
import BaseHeader, {GoBackButton} from '../components/Header';
import LoadingModal from '../components/LoadingModal';

type AddMealScreenRouteProp = RouteProp<HomeStackParamList, 'AddMeal'>;
type AddMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddMeal'>;

const SaveMealButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} px={'s'}>
      <Text variant={'button'} color={'$primary'}>
        Enregistrer
      </Text>
    </Pressable>
  );
};

const NutrimentValueItem: React.FC<{label: string; value: number}> = ({label, value}) => {
  return (
    <Box flexDirection={'row'} p={'s'} alignSelf={'stretch'} bg={'$slideTabBackground'} justifyContent={'space-between'}>
      <Text variant={'subtitle1'}>{label}</Text>
      <Text variant={'subtitle2'}>{value.toString()}</Text>
    </Box>
  );
};

const UNITS: Record<string, string[]> = {
  g: ['g', 'kg', 'oz', 'mg'],
  ml: ['ml', 'l', 'cl', 'floz'],
  default: ['g', 'kg', 'oz', 'mg', 'ml', 'l', 'cl', 'floz'],
};

const AddMealScreen: React.FC<{route: AddMealScreenRouteProp; navigation: AddMealScreenNavigationProp}> = ({
  route,
  navigation,
}) => {
  const {meal} = route.params;
  const [unit, setUnit] = useState(meal.unit in UNITS ? meal.unit : '');
  const [portion, setPortion] = useState<number>(meal.portion !== undefined ? meal.portion : 1);
  const {saveUserMealAsync, isLoading: saveMealIsLoading} = usePostMeal(meal);
  //TODO handle save meal loading & error state

  function saveMealPortion() {
    saveUserMealAsync({portion, unit}).finally(() => {
      navigation.navigate('SearchMeal');
    });
  }

  const mealUnits = meal.unit in UNITS ? UNITS[meal.unit] : UNITS.default;

  return (
    <Box flex={1} bg={'$background'}>
      <BaseHeader
        title="Aliment"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<SaveMealButton onPress={saveMealPortion} />}
      />
      {saveMealIsLoading && <LoadingModal label="Enregistrement en cours 🤞" />}
      <Box flex={0.5} alignItems={'center'} px={'s'}>
        <Text variant={'subtitle1'} py={'xs'}>
          {meal.name}
        </Text>
        <Image source={{uri: meal.images.url}} style={{width: 150, height: 150}} />
      </Box>
      <Box flex={0.2} px={'s'}>
        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} py={'s'}>
          <Text variant={'subtitle1'}>Portion</Text>
          <Input
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
            bg={'$background'}
            height={50}
            width={140}
            marginLeft={'s'}
            borderRadius={'xs'}
            keyboardType={'numeric'}
            paddingHorizontal={'s'}
          />
          <Picker
            itemStyle={{height: 50, width: 160}}
            selectedValue={unit}
            onValueChange={itemValue => setUnit(itemValue.toString())}>
            {mealUnits.map(unitItem => {
              return <Picker.Item key={unitItem} label={unitItem} value={unitItem} />;
            })}
          </Picker>
        </Box>
      </Box>
      <Box flex={1} p={'s'}>
        <Text py={'s'} variant={'subtitle1'}>
          Macro-nutriments (100g)
        </Text>
        <NutrimentValueItem label="Calories" value={meal.calories} />
        <NutrimentValueItem label="Protéines" value={meal.proteins} />
        <NutrimentValueItem label="Glucides" value={meal.carbs} />
        <NutrimentValueItem label="Gras" value={meal.fat} />
      </Box>
    </Box>
  );
};

export default AddMealScreen;
