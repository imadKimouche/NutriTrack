import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import FIcon from '../components/FIcon';
import Searchbar from '../components/Searchbar';
import Loader from '../components/Loader';
import {Meal, useSearchOFFMeal} from '../hooks/meal';
import {HomeStackParamList} from './HomeStackNavigator';
import {useMealSearchHistory} from '../store/mealSearchHistory';
import BaseHeader, {GoBackButton} from '../components/Header';
import ListItem from '../components/ListItem';

const BarCodeButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} justifyContent={'flex-end'} flexDirection={'row'} alignSelf={'stretch'} mr={'m'}>
      <FIcon name="maximize" color={'$primary'} size={24} />
    </Pressable>
  );
};

export const SearchError: React.FC = () => {
  return (
    <Box>
      <Text variant={'text-small-tight'}>Oups, je rencontre un problème 😬</Text>
    </Box>
  );
};

const SearchListFooter: React.FC<{show?: boolean; isLoading: boolean; onPress: () => void}> = ({show, isLoading, onPress}) => {
  if (show) {
    return (
      <Pressable py={'s'} alignItems={'center'} onPress={() => !isLoading && onPress()}>
        {isLoading ? <Loader color="$primary" /> : <FIcon name="chevron-down" color={'$primary'} size={24} />}
      </Pressable>
    );
  }
  return <></>;
};

const SearchList: React.FC<{searchValue: string; onItemPress: (meal: Meal) => void}> = ({searchValue, onItemPress}) => {
  let {data, isLoading, isError, fetchNextPage, hasNextPage, isFetching} = useSearchOFFMeal(searchValue);

  if (isError) {
    return <SearchError />;
  }

  if (isLoading) {
    return <Loader color="$primary" />;
  }

  if (data !== undefined && data.length > 0) {
    return (
      <Box bg={'$bg'} mx={'m'} px={'s'} borderRadius={'xs'} flexBasis={'55%'}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem
              leftComponent={<Image source={{uri: item.images.thumbUrl}} style={{width: 50, height: 50}} />}
              leftComponentProps={{mr: 'm'}}
              title={item.name}
              onPress={() => onItemPress(item)}
            />
          )}
          keyExtractor={item => `${item.id}-${item.name}`}
          ListFooterComponent={<SearchListFooter show={hasNextPage} isLoading={isFetching} onPress={fetchNextPage} />}
        />
      </Box>
    );
  }

  return null;
};

type SearchMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'SearchMeal'>;
const SearchMealScreen: React.FC<{navigation: SearchMealScreenNavigationProp}> = ({navigation}) => {
  const [searchMeal, setSearchMeal] = useState('');
  const insets = useSafeAreaInsets();
  const mealSearchHistory = useMealSearchHistory(state => state.history);
  const clearMealSearchHistory = useMealSearchHistory(state => state.clear);
  const addMealToHistory = useMealSearchHistory(state => state.add);

  function onMealPress(meal: Meal) {
    addMealToHistory(meal);
    setSearchMeal('');
    navigation.navigate('AddMeal', {meal});
  }

  return (
    <Box flex={1} bg={'$bgWeak'} style={{paddingBottom: insets.bottom}}>
      <BaseHeader
        title="Trouver un aliment"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<BarCodeButton onPress={() => navigation.navigate('BarCodeScanner')} />}
      />
      <Box flex={1} style={{paddingBottom: insets.bottom}}>
        <Box p={'s'}>
          <Searchbar onSubmitEditing={setSearchMeal} placeholder={'Riz, lentilles ...'} />
        </Box>
        <SearchList searchValue={searchMeal} onItemPress={onMealPress} />
        <Box flex={1} m={'m'}>
          <Box flexDirection={'row'} alignItems={'baseline'} justifyContent={'space-between'}>
            <Text variant={'h6'}>Historique</Text>
            <Text onPress={clearMealSearchHistory} variant={'text-small'} color={'$primary'}>
              Tout effacer
            </Text>
          </Box>
          {mealSearchHistory.map((meal: Meal) => {
            return <ListItem key={meal.id} title={meal.name} onPress={() => navigation.navigate('AddMeal', {meal})} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchMealScreen;
