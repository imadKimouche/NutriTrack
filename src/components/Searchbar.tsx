import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from './Icon';

const SearchResultItem: React.FC<{label: string}> = ({label}) => {
  return (
    <Box p={'m'} borderBottomColor={'$listItemDivider'} borderBottomWidth={1} flexDirection={'row'} alignItems={'center'}>
      <Text>{label}</Text>
    </Box>
  );
};

const Searchbar: React.FC<{
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onSubmitEditing: (value: string) => void;
  data: string[];
}> = ({value, placeholder, onChangeText, onSubmitEditing, data}) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    if (value.length) {
      setSearchResults(data.filter(item => item.trim().toLowerCase().includes(value.trim().toLowerCase())));
    } else {
      setSearchResults([]);
    }
  }, [value]);

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
          <Pressable onPress={() => onChangeText('')}>
            <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
          </Pressable>
        )}
      </Box>
      {/* -- Result Dropdown list -- */}
      {searchResults.length > 0 && (
        <Box
          bg={'$background'}
          m={'s'}
          borderRadius={'xs'}
          shadowColor={isIOS ? '$searchbarShadow' : undefined}
          shadowOffset={isIOS ? {width: 0, height: 8} : undefined}
          shadowOpacity={1}
          shadowRadius={16}
          elevation={isIOS ? undefined : 8}>
          {searchResults.map(searchItem => {
            return <SearchResultItem key={searchItem} label={searchItem} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
