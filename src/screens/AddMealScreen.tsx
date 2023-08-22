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
import ListItem from '../components/ListItem';

type AddMealScreenRouteProp = RouteProp<HomeStackParamList, 'AddMeal'>;
type AddMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'AddMeal'>;

const SaveMealButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} px={'s'}>
      <Text variant={'text-small'} color={'$primary'}>
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

  const nutrimentItems = [
    {id: 'calories', label: 'calories', value: `${meal.calories} kcal`},
    {id: 'proteins', label: 'protéines', value: `${meal.proteins} g`},
    {id: 'carbs', label: 'glucides', value: `${meal.carbs} g`},
    {id: 'fat', label: 'lipides', value: `${meal.fat} g`},
  ];

  return (
    <Box flex={1} bg={'$screenBackground'}>
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
          <Text variant={'text-medium'} color={'$header'}>
            Portion
          </Text>
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
            height={50}
            width={140}
            marginLeft={'s'}
            borderRadius={'xs'}
            borderColor={'$inputBorder'}
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
      <Box flex={1} p={'m'} bg={'$bgWeak'}>
        <Text py={'s'} variant={'text-medium'} color={'$header'}>
          Macro-nutriments (100g)
        </Text>
        <Box bg={'$bgWeak'} borderRadius={'sm'} p={'xs'}>
          {nutrimentItems.map(item => (
            <ListItem
              key={item.id}
              title={item.label}
              rightComponent={
                <Text variant={'text-small-tight'} color={'$textLabel'}>
                  {item.value}
                </Text>
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddMealScreen;
