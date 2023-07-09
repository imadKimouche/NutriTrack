import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import Searchbar from '../components/Searchbar';
import Loader from '../components/Loader';
import {Meal, useSearchOFFMeal} from '../hooks/meal';
import {HomeStackParamList} from './HomeStackNavigator';
import {useMealSearchHistory} from '../store/mealSearchHistory';
import BaseHeader, {GoBackButton} from '../components/Header';
import BottomSheet from '@gorhom/bottom-sheet';
import LoadingModal from '../components/LoadingModal';
import {Camera, CameraType} from 'react-native-camera-kit';

const BarCodeButton: React.FC<{onPress: () => void}> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} justifyContent={'flex-end'} flexDirection={'row'} alignSelf={'stretch'} mr={'m'}>
      <Icon name="maximize" color={'$primary'} size={24} />
    </Pressable>
  );
};

type MealListItemProps = {meal: Meal; onItemPressed: (meal: Meal) => void};
const MealListItem: React.FC<MealListItemProps> = ({meal, onItemPressed}) => {
  return (
    <Pressable
      onPress={() => onItemPressed(meal)}
      alignSelf={'stretch'}
      p={'m'}
      borderRadius={'sm'}
      borderBottomColor={'$listItemDivider'}
      borderBottomWidth={1}
      flexDirection={'row'}
      alignItems={'center'}>
      <Image source={{uri: meal.images.thumbUrl}} style={{width: 30, height: 30}} />
      <Box alignItems={'flex-start'} px={'s'} flex={1}>
        <Text variant={'caption'} ellipsizeMode={'tail'}>
          {meal.name}
        </Text>
      </Box>
    </Pressable>
  );
};

const SearchError: React.FC = () => {
  return (
    <Box>
      <Text variant={'caption'}>Oups, je rencontre un problème</Text>
    </Box>
  );
};

const SearchLoader: React.FC = () => {
  return (
    <Box my={'s'}>
      <Loader color="$primary" />
    </Box>
  );
};

const SearchListFooter: React.FC<{show?: boolean; isLoading: boolean; onPress: () => void}> = ({show, isLoading, onPress}) => {
  if (show) {
    if (isLoading) {
      return <SearchLoader />;
    } else {
      return (
        <Pressable alignSelf={'center'} py={'s'} onPress={onPress}>
          <Text variant={'caption'} color={'$primary'}>
            Plus
          </Text>
        </Pressable>
      );
    }
  }
  return <></>;
};

const SearchList: React.FC<{searchValue: string; navigation: SearchMealScreenNavigationProp}> = ({searchValue, navigation}) => {
  const {data, isLoading, isError, fetchNextPage, hasNextPage, isFetching} = useSearchOFFMeal(searchValue);
  const addMealToHistory = useMealSearchHistory(state => state.add);

  function onMealPressed(meal: Meal) {
    addMealToHistory(meal);
    navigation.navigate('AddMeal', {meal});
  }

  if (isError) {
    return <SearchError />;
  }

  if (isLoading) {
    return <SearchLoader />;
  }

  if (data !== undefined && data.length > 0) {
    return (
      <Box flex={1} bg={'$background'} alignSelf={'stretch'} mx={'m'} borderRadius={'xs'}>
        <FlatList
          data={data}
          renderItem={item => <MealListItem meal={item.item} onItemPressed={onMealPressed} />}
          keyExtractor={item => `${item.id}-${item.name}`}
          ListFooterComponent={<SearchListFooter show={hasNextPage} isLoading={isFetching} onPress={fetchNextPage} />}
        />
      </Box>
    );
  }

  return <></>;
};

type SearchMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'SearchMeal'>;
const SearchMealScreen: React.FC<{navigation: SearchMealScreenNavigationProp}> = ({navigation}) => {
  const [searchMeal, setSearchMeal] = useState('');
  const insets = useSafeAreaInsets();
  const mealSearchHistory = useMealSearchHistory(state => state.history);
  const clearMealSearchHistory = useMealSearchHistory(state => state.clear);

  return (
    <Box flex={1} bg={'$background'} style={{paddingBottom: insets.bottom}}>
      <BaseHeader
        title="Trouver un aliment"
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        rightComponent={<BarCodeButton onPress={() => navigation.navigate('BarCodeScanner')} />}
      />
      <Box flex={1} bg={'$background'} style={{paddingBottom: insets.bottom}}>
        <Box p={'s'}>
          <Searchbar onSubmitEditing={setSearchMeal} />
        </Box>
        <SearchList searchValue={searchMeal} navigation={navigation} />
        <Box flex={1} m={'s'}>
          <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Text variant={'body1'} color={'$primary'}>
              Historique
            </Text>
            <Text onPress={clearMealSearchHistory} variant={'caption'}>
              Tout effacer
            </Text>
          </Box>
          {mealSearchHistory.map((meal: Meal) => {
            return (
              <Pressable
                key={meal.id}
                onPress={() => navigation.navigate('AddMeal', {meal})}
                alignSelf={'stretch'}
                p={'m'}
                borderBottomWidth={1}
                borderColor={'$listItemDivider'}>
                <Text variant={'body2'}>{meal.name}</Text>
              </Pressable>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchMealScreen;
