import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import {Theme} from '../style/theme';
import Icon from './Icon';

type Props = {
  onSubmitEditing: (value: string) => void;
};

const Searchbar: React.FC<Props> = ({onSubmitEditing}) => {
  const [searchValue, setSearchValue] = useState('');
  const {colors} = useTheme<Theme>();

  return (
    <Box width={'100%'} height={50} bg={'$searchbarBackground'} flexDirection={'row'} alignItems={'center'} borderRadius={'sm'}>
      <Box p={'s'}>
        <Icon name="search" size={18} color={'$searchbarIcon'} />
      </Box>
      <Box flex={1} mx={'s'}>
        <Input
          placeholder={'Riz, lentilles ...'}
          placeholderTextColor={colors.$searchbarPlaceholder}
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
          onSubmitEditing={e => onSubmitEditing(e.nativeEvent.text)}
          returnKeyType={'search'}
        />
      </Box>
      {searchValue.length > 0 && (
        <Pressable
          onPress={() => {
            onSubmitEditing('');
            setSearchValue('');
          }}>
          <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
        </Pressable>
      )}
    </Box>
  );
};

export default Searchbar;
