import {NativeStackHeaderProps, NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Image} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import Searchbar from '../components/Searchbar';
import Loader from '../components/Loader';
import {Meal, useSearchOFFMeal} from '../hooks/meal';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from './HomeStackNavigator';

export const SearchMealHeader: React.FC<NativeStackHeaderProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      bg={'$background'}
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      pb={'s'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable flex={1} flexDirection={'row'} alignItems={'center'} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Suivi</Text>
      </Pressable>
      <Box flex={2} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>Ajout de repas</Text>
      </Box>
      <Box flex={1} />
    </Box>
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
        <Text variant={'bodySmall'} ellipsizeMode={'tail'}>
          {meal.name}
        </Text>
      </Box>
    </Pressable>
  );
};

const SearchError: React.FC = () => {
  return (
    <Box>
      <Text variant={'errorSmall'}>Oups, je rencontre un problème</Text>
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
          <Text variant={'bodySmall'} color={'$primary'}>
            Plus
          </Text>
        </Pressable>
      );
    }
  }
  return <></>;
};

type SearchMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const SearchList: React.FC<{searchValue: string}> = ({searchValue}) => {
  const navigation = useNavigation<SearchMealScreenNavigationProp>();
  const {data, isLoading, isError, fetchNextPage, hasNextPage, isFetching} = useSearchOFFMeal(searchValue);

  function onMealPressed(meal: Meal) {
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

const SearchMealScreen: React.FC<{}> = () => {
  const [searchMeal, setSearchMeal] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} justifyContent={'flex-start'} bg={'$windowBackground'} style={{paddingBottom: insets.bottom}}>
      <Box p={'s'}>
        <Searchbar onSubmitEditing={setSearchMeal} />
      </Box>
      <SearchList searchValue={searchMeal} />
      <Box flex={1} m={'s'}>
        <Text variant={'bodyLarge'}>Historique</Text>
      </Box>
    </Box>
  );
};

export default SearchMealScreen;
