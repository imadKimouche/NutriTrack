import React from 'react';
import {StyleProp, ViewStyle, TextInput} from 'react-native';
import Pressable from '../atoms/Pressable';
import Box from '../atoms/Box';
import FIcon from './FIcon';
import Input from '../atoms/Input';

interface Props {
  query: string;
  setIsInputFocused?: (v: boolean) => void;
  onChangeQuery: (v: string) => void;
  onPressCancelSearch: () => void;
  onSubmitQuery: () => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}
export function SearchInput({
  query,
  setIsInputFocused,
  onChangeQuery,
  onPressCancelSearch,
  onSubmitQuery,
  style: _style,
  placeholder,
}: Props) {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const onPressCancelSearchInner = React.useCallback(() => {
    onPressCancelSearch();
    inputRef.current?.blur();
  }, [onPressCancelSearch, inputRef]);

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      flexDirection="row"
      borderRadius="lg"
      bg={isFocused ? '$screenBackground' : '$inputBg'}
      borderWidth={isFocused ? 2 : 0}
      borderColor={isFocused ? '$inputBorder' : undefined}
      alignItems="center"
      px="s"
      minHeight={50}>
      <Box px="s">
        <FIcon name="search" size={18} />
      </Box>
      <Input
        style={{flex: 1}}
        placeholder={placeholder ? placeholder : 'Search'}
        placeholderColor="$inputPlaceholder"
        selectTextOnFocus
        returnKeyType="search"
        value={query}
        onFocus={() => {
          setIsFocused(true);
          setIsInputFocused?.(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setIsInputFocused?.(false);
        }}
        onChangeText={onChangeQuery}
        onSubmitEditing={onSubmitQuery}
        autoCorrect={false}
        autoCapitalize="none"
        ref={inputRef}
      />
      {query ? (
        <Pressable onPress={onPressCancelSearchInner} alignItems="center" px="s">
          <FIcon name="x" size={18} />
        </Pressable>
      ) : undefined}
    </Pressable>
  );
}
