import React, {useEffect, useRef, useState} from 'react';
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

const Searchbar: React.FC<{}> = () => {
  const [searchValue, setSearchValue] = useState('');
  const isIOS = Platform.OS === 'ios';
  const placeholder = 'Riz, Banane...';
  let searchResultRef = useRef<string[]>([]);

  useEffect(() => {
    const DATA = ['Riz', 'Banane', 'Tomate', 'Brocoli'];
    searchResultRef.current = DATA.filter(item => item.includes(searchValue));
  }, [searchValue]);

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
            value={searchValue}
            onChangeText={text => setSearchValue(text)}
            returnKeyType={'search'}
          />
        </Box>
        {searchValue.length > 0 && (
          <Pressable onPress={() => setSearchValue('')}>
            <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
          </Pressable>
        )}
      </Box>
      {/* -- Result Dropdown list -- */}
      {searchResultRef.current.length > 0 && (
        <Box
          bg={'$background'}
          m={'s'}
          borderRadius={'xs'}
          shadowColor={isIOS ? '$searchbarShadow' : undefined}
          shadowOffset={isIOS ? {width: 0, height: 8} : undefined}
          shadowOpacity={1}
          shadowRadius={16}
          elevation={isIOS ? undefined : 8}>
          {searchResultRef.current.map(searchItem => {
            return <SearchResultItem label={searchItem} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
