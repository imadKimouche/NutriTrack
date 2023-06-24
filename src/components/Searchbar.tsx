import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {FlatList, Image, ListRenderItem, Platform} from 'react-native';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {Meal, useSearchOFFMeal} from '../hooks/meal';
import {HomeStackParamList} from '../screens/HomeStackNavigator';
import {Theme} from '../style/theme';
import Icon from './Icon';
import Loader from './Loader';

type AddMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const Searchbar: React.FC = () => {
  const isIOS = Platform.OS === 'ios';
  const navigation = useNavigation<AddMealScreenNavigationProp>();
  const [searchValue, setSearchValue] = useState('');
  const [searchMeal, setSearchMeal] = useState('');
  const {data, isLoading, isError, fetchNextPage, hasNextPage} = useSearchOFFMeal(searchMeal);
  const {spacing, borderRadii, colors} = useTheme<Theme>();

  const renderMealItem: ListRenderItem<Meal> = ({item: meal}) => {
    const openMealScreen = () => {
      navigation.navigate('Meal', {meal});
    };

    return (
      <Pressable
        onPress={openMealScreen}
        alignSelf={'stretch'}
        p={'m'}
        borderRadius={'sm'}
        borderBottomColor={'$listItemDivider'}
        borderBottomWidth={1}
        flexDirection={'row'}
        alignItems={'center'}>
        <Image source={{uri: meal.image}} style={{width: 30, height: 30}} />
        <Box alignItems={'flex-start'} px={'s'} flex={1}>
          <Text variant={'bodySmall'} ellipsizeMode={'tail'}>
            {meal.name}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      {/* -- Searchbar -- */}
      <Box width={'100%'} height={50} bg={'$searchbarBackground'} flexDirection={'row'} alignItems={'center'} borderRadius={'sm'}>
        <Box p={'s'}>
          <Icon name="search" size={18} color={'$searchbarIcon'} />
        </Box>
        <Box flex={1} mx={'s'}>
          <Input
            placeholder={'Riz, lentilles ...'}
            value={searchValue}
            onChangeText={value => setSearchValue(value)}
            onSubmitEditing={e => setSearchMeal(e.nativeEvent.text)}
            returnKeyType={'search'}
          />
        </Box>
        {searchValue.length > 0 && (
          <Pressable
            onPress={() => {
              setSearchMeal('');
              setSearchValue('');
            }}>
            <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
          </Pressable>
        )}
      </Box>
      {/* -- Result Dropdown list -- */}
      {isError ? (
        <Box>
          <Text variant={'errorSmall'}>Oups, je rencontre un problème</Text>
        </Box>
      ) : isLoading ? (
        <Box my={'s'}>
          <Loader color="$primary" />
        </Box>
      ) : (
        data !== undefined &&
        data.length > 0 && (
          <FlatList
            style={{height: 300}}
            contentContainerStyle={{
              backgroundColor: colors.$background,
              margin: spacing.s,
              borderRadius: borderRadii.xs,
              shadowColor: isIOS ? colors.$searchbarShadow : undefined,
              shadowOffset: isIOS ? {width: 0, height: 8} : undefined,
              shadowOpacity: 1,
              shadowRadius: borderRadii.sm,
              elevation: isIOS ? undefined : spacing.s,
            }}
            data={data}
            renderItem={renderMealItem}
            keyExtractor={item => item.name}
            ListFooterComponent={() => {
              if (hasNextPage) {
                return (
                  <Pressable alignSelf={'center'} py={'s'} onPress={() => fetchNextPage()}>
                    <Text variant={'bodySmall'} color={'$primary'}>
                      Plus
                    </Text>
                  </Pressable>
                );
              }
              return <></>;
            }}
          />
        )
      )}
    </Box>
  );
};

export default Searchbar;
