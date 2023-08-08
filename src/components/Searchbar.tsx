import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import Box from '../atoms/Box';
import Input, {InputProps} from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import {Theme} from '../style/theme';
import Icon from './Icon';

type Props = {
  onSubmitEditing?: (value: string) => void;
  onUpdateValue?: (value: string) => void;
} & Omit<InputProps, 'onSubmitEditing'>;

const Searchbar: React.FC<Props> = ({onSubmitEditing, onUpdateValue, ...rest}) => {
  const [searchValue, setSearchValue] = useState('');
  const {colors} = useTheme<Theme>();

  return (
    <Box width={'100%'} height={50} bg={'$searchbarBackground'} flexDirection={'row'} alignItems={'center'} borderRadius={'sm'}>
      <Box p={'s'}>
        <Icon name="search" size={18} color={'$searchbarIcon'} />
      </Box>
      <Box flex={1} mx={'s'}>
        <Input
          placeholderTextColor={colors.$searchbarPlaceholder}
          value={searchValue}
          onChangeText={value => {
            setSearchValue(value);
            onUpdateValue && onUpdateValue(value);
          }}
          onSubmitEditing={e => {
            onSubmitEditing && onSubmitEditing(e.nativeEvent.text);
          }}
          returnKeyType={'search'}
          {...rest}
        />
      </Box>
      {searchValue.length > 0 && (
        <Pressable
          onPress={() => {
            onSubmitEditing && onSubmitEditing('');
            setSearchValue('');
          }}>
          <Icon name="x-circle" size={18} color={'$searchbarIcon'} marginRight={'s'} />
        </Pressable>
      )}
    </Box>
  );
};

export default Searchbar;
