import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import Box from '../atoms/Box';
import Input, {InputProps} from '../atoms/Input';
import Pressable from '../atoms/Pressable';
import {Theme} from '../style/theme';
import FIcon from './FIcon';

type Props = {
  onSubmitEditing?: (value: string) => void;
  onUpdateValue?: (value: string) => void;
} & Omit<InputProps, 'onSubmitEditing'>;

const Searchbar: React.FC<Props> = ({onSubmitEditing, onUpdateValue, ...rest}) => {
  const [searchValue, setSearchValue] = useState('');
  const {colors} = useTheme<Theme>();

  return (
    <Box height={50} bg={'$inputBg'} flexDirection={'row'} alignItems={'center'} borderRadius={'sm'}>
      <Box pl={'m'} p={'s'}>
        <FIcon name="search" size={20} color={'$iconRegular'} />
      </Box>
      <Box flex={1} mx={'s'}>
        <Input
          placeholderTextColor={colors.$inputPlaceholder}
          value={searchValue}
          onChangeText={value => {
            setSearchValue(value);
            onUpdateValue && onUpdateValue(value);
          }}
          onSubmitEditing={e => {
            onSubmitEditing && onSubmitEditing(e.nativeEvent.text);
          }}
          returnKeyType={'search'}
          autoCorrect={false}
          {...rest}
        />
      </Box>
      {searchValue.length > 0 && (
        <Pressable
          onPress={() => {
            onSubmitEditing && onSubmitEditing('');
            onUpdateValue && onUpdateValue('');
            setSearchValue('');
          }}
          pr={'m'}
          p={'s'}>
          <FIcon name="x-circle" size={18} color={'$iconRegular'} marginRight={'s'} />
        </Pressable>
      )}
    </Box>
  );
};

export default Searchbar;
