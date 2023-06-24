import {RouteProp} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import {HomeStackParamList} from './HomeStackNavigator';
import Picker from '../components/Picker';
import {Unit} from '../hooks/meal';

type MealScreenRouteProp = RouteProp<HomeStackParamList, 'Meal'>;

export const MealHeader: React.FC<NativeStackHeaderProps> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const mealRoute = route as MealScreenRouteProp;

  let headerTitle = mealRoute.params.meal.name;
  headerTitle = headerTitle.length > 15 ? headerTitle.slice(0, 12) + '...' : headerTitle;

  function saveMeal() {}

  return (
    <Box
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable
        flex={1}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Recherche</Text>
      </Pressable>
      <Box flex={2} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>{headerTitle}</Text>
      </Box>
      <Pressable flex={1} onPress={saveMeal}>
        <Text variant={'headerBackTitle'}>Enregistrer</Text>
      </Pressable>
    </Box>
  );
};

const MealScreen: React.FC<{route: MealScreenRouteProp}> = ({route}) => {
  const {meal} = route.params;
  const [portion, setPortion] = useState('');

  const UNITS: Record<Unit, string> = {
    g: 'g',
    ml: 'ml',
    tsp: 'cc',
    tbsp: 'cs',
    cup: 'tasse',
    floz: 'fl oz',
    pint: 'pt',
    quart: 'qt',
    l: 'l',
    kg: 'kg',
    lb: 'lb',
    oz: 'oz',
    piece: 'pièce(s)',
  };

  return (
    <Box flex={1} px={'m'}>
      <Box flex={0.2} flexDirection={'row'} alignItems={'center'}>
        <Image source={{uri: meal.image}} style={{width: 60, height: 60}} />
        <Text variant={'cardTitle'} px={'s'}>
          {meal.name}
        </Text>
      </Box>
      <Box flex={1}>
        <Box flexDirection={'row'}>
          <Text variant={'bodyRegular'}>Portion</Text>
          <Picker
            itemStyle={{height: 110, width: 110}}
            selectedValue={portion}
            onValueChange={itemValue => setPortion(itemValue.toString())}>
            {Object.values(UNITS).map(unit => {
              return <Picker.Item key={unit} label={unit} value={unit} />;
            })}
          </Picker>
        </Box>
        <Box flexDirection={'row'}>
          <Text variant={'bodyRegular'}>Nombre de portion</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MealScreen;
