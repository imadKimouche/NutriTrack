import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {Image, Platform} from 'react-native';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {Meal} from '../hooks/meal';
import {HomeStackParamList} from '../screens/HomeStackNavigator';
import Icon from './Icon';

type AddMealScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeTabNavigator'>;

const SearchResultItem: React.FC<Meal> = item => {
  const navigation = useNavigation<AddMealScreenNavigationProp>();

  const openMealScreen = () => {
    navigation.navigate('Meal', {meal: item});
  };

  return (
    <Pressable
      onPress={openMealScreen}
      p={'m'}
      borderRadius={'sm'}
      borderBottomColor={'$listItemDivider'}
      borderBottomWidth={1}
      flexDirection={'row'}
      alignItems={'center'}>
      <Image source={{uri: item.image}} style={{width: 30, height: 30}} />
      <Box alignItems={'flex-start'} px={'s'} flex={1}>
        <Text variant={'bodySmall'} ellipsizeMode={'tail'}>
          {item.name}
        </Text>
      </Box>
    </Pressable>
  );
};

const Searchbar: React.FC<{
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onClearText: () => void;
  onSubmitEditing: (value: string) => void;
  filteredResults: Meal[];
  isError: boolean;
  isLoading: boolean;
}> = ({value, placeholder, onChangeText, onClearText, onSubmitEditing, filteredResults, isError, isLoading}) => {
  const isIOS = Platform.OS === 'ios';
  const memoizedResults = useMemo(() => filteredResults, [filteredResults]);

  if (isError) {
    console.log('error while fetching data', isError);
  }

  return (
    <Box>
      {/* -- Searchbar -- */}
      <Box width={'100%'} height={50} bg={'$searchbarBackground'} flexDirection={'row'} alignItems={'center'} borderRadius={'sm'}>
        <Box p={'s'}>
          <Icon name="search" size={18} color={'$searchbarIcon'} />
        </Box>
        <Box flex={1} mx={'s'}>
          <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={e => onSubmitEditing(e.nativeEvent.text)}
            returnKeyType={'search'}
          />
        </Box>
        {value.length > 0 && (
          <Pressable onPress={onClearText}>
            <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
          </Pressable>
        )}
      </Box>
      {/* -- Result Dropdown list -- */}
      {isLoading ? (
        <Text>Un instant...</Text>
      ) : (
        Array.isArray(memoizedResults) &&
        memoizedResults.length > 0 && (
          <Box
            bg={'$background'}
            m={'s'}
            borderRadius={'xs'}
            shadowColor={isIOS ? '$searchbarShadow' : undefined}
            shadowOffset={isIOS ? {width: 0, height: 8} : undefined}
            shadowOpacity={1}
            shadowRadius={16}
            elevation={isIOS ? undefined : 8}>
            {memoizedResults.map(item => {
              return <SearchResultItem key={item.id} {...item} />;
            })}
          </Box>
        )
      )}
    </Box>
  );
};

export default Searchbar;
