import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import {HomeStackParamList} from './HomeStackNavigator';
import Picker from '../components/Picker';
import Input from '../atoms/Input';
import {useAuth} from '../hooks/auth';
import {usePostMeal} from '../hooks/meal';

type MealScreenRouteProp = RouteProp<HomeStackParamList, 'Meal'>;
type MealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Meal'>;

type MealHeaderProps = {
  title: string;
  onBackPress: () => void;
  onSavePress: () => void;
};

export const MealHeader: React.FC<MealHeaderProps> = ({title, onBackPress, onSavePress}) => {
  const insets = useSafeAreaInsets();
  const headerTitle = title.length > 18 ? title.slice(0, 15) + '...' : title;

  return (
    <Box
      alignSelf={'stretch'}
      flexDirection={'row'}
      alignItems={'center'}
      pb={'m'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable flex={1} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'} onPress={onBackPress}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Recherche</Text>
      </Pressable>
      <Box flex={2} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>{headerTitle}</Text>
      </Box>
      <Pressable flex={1} onPress={onSavePress}>
        <Text variant={'headerBackTitle'}>Enregistrer</Text>
      </Pressable>
    </Box>
  );
};

const NutrimentValueItem: React.FC<{label: string; value: number}> = ({label, value}) => {
  return (
    <Box flexDirection={'row'} p={'s'} alignSelf={'stretch'} bg={'$slideTabBackground'} justifyContent={'space-between'}>
      <Text variant={'cardSubtitle'}>{label}</Text>
      <Text variant={'cardSubtitle'}>{value.toString()}</Text>
    </Box>
  );
};

const UNITS: Record<string, string[]> = {
  g: ['g', 'kg', 'oz', 'mg'],
  ml: ['ml', 'l', 'cl', 'floz'],
  default: ['g', 'kg', 'oz', 'mg', 'ml', 'l', 'cl', 'floz'],
};

const MealScreen: React.FC<{route: MealScreenRouteProp; navigation: MealScreenNavigationProp}> = ({route, navigation}) => {
  const {meal} = route.params;
  const [unit, setUnit] = useState(meal.unit in UNITS ? meal.unit : '');
  const [portion, setPortion] = useState<number>(meal.portion !== undefined ? meal.portion : 1);
  const {saveUserMeal} = usePostMeal(meal);
  //TODO handle save meal loading & error state

  function saveMealPortion() {
    saveUserMeal({portion, unit});
    // TODO navigate if no error and after loading
    navigation.navigate('AddMeal');
  }

  const mealUnits = meal.unit in UNITS ? UNITS[meal.unit] : UNITS.default;

  return (
    <Box flex={1} bg={'$windowBackground'}>
      <MealHeader title={meal.name} onBackPress={navigation.goBack} onSavePress={saveMealPortion} />
      <Box flex={0.5} alignItems={'center'} px={'s'}>
        <Text variant={'cardTitle'} py={'m'}>
          {meal.name}
        </Text>
        <Image source={{uri: meal.images.url}} style={{width: 150, height: 150}} />
      </Box>
      <Box flex={0.2} px={'s'}>
        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} py={'s'}>
          <Text variant={'cardTitle'}>Portion</Text>
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
        <Text py={'s'} variant={'cardTitle'}>
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

export default MealScreen;
