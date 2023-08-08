import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {FlatList, Image} from 'react-native';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader from '../../components/Header';
import Icon from '../../components/Icon';
import Searchbar from '../../components/Searchbar';
import {Ingredient, useSearchIngredient} from '../../hooks/meal';
import {useDebounce} from '../../hooks/utility';
import {RecipesStackNavigationProps} from '../../navigation/RecipesStackNavigator';
import {useSearchMealStore} from '../../store/ingredients';
import {Theme} from '../../style/theme';
import {SearchError, SearchLoader} from '../SearchMealScreen';

type IngredientListItemProps = {
  ingredient: Ingredient;
  onItemPressed: (ingredient: Ingredient) => void;
};

const IngredientListItem: React.FC<IngredientListItemProps> = ({ingredient, onItemPressed}) => {
  return (
    <Pressable
      onPress={() => onItemPressed(ingredient)}
      alignSelf={'stretch'}
      p={'xs'}
      borderBottomColor={'$listItemDivider'}
      bg={'$searchbarBackground'}
      borderBottomWidth={1}
      flexDirection={'row'}
      alignItems={'center'}>
      <Image source={{uri: ingredient.image}} style={{width: 50, height: 50}} />
      <Text ml={'s'} variant={'body1'} ellipsizeMode={'tail'} textTransform={'capitalize'}>
        {ingredient.name}
      </Text>
    </Pressable>
  );
};

const SearchList: React.FC<{searchValue?: string}> = ({searchValue}) => {
  const {data: foundIngredients, isLoading, isError} = useSearchIngredient(searchValue);
  const {add} = useSearchMealStore(state => ({add: state.addIngredient}));

  function onIngredientPressed(ingredient: Ingredient) {
    add(ingredient);
  }

  if (isError) {
    return <SearchError />;
  }

  if (isLoading) {
    return <SearchLoader />;
  }

  if (foundIngredients.length > 0) {
    return (
      <Box flex={1} alignSelf={'stretch'} mx={'m'} my={'xs'}>
        <FlatList
          data={foundIngredients}
          renderItem={item => <IngredientListItem ingredient={item.item} onItemPressed={onIngredientPressed} />}
          keyExtractor={item => `${item.id}-${item.name}`}
        />
      </Box>
    );
  }
  return <></>;
};

type AddedIngredientListItemProps = {
  ingredient: Ingredient;
  onCrossPressed: (ingredient: Ingredient) => void;
};
const AddedIngredientListItem: React.FC<AddedIngredientListItemProps> = ({ingredient, onCrossPressed}) => {
  const label = ingredient.name.length > 6 ? ingredient.name.slice(0, 6) + '...' : ingredient.name;
  const {borderRadii} = useTheme<Theme>();
  return (
    <Pressable
      alignSelf={'stretch'}
      p={'s'}
      m={'s'}
      borderRadius={'sm'}
      borderBottomColor={'$listItemDivider'}
      bg={'$searchbarBackground'}
      borderBottomWidth={1}
      alignItems={'center'}>
      <Image source={{uri: ingredient.image}} style={{width: 80, height: 70, borderRadius: borderRadii.sm}} />
      <Text mt={'s'} variant={'subtitle1'} ellipsizeMode={'tail'} textTransform={'capitalize'}>
        {label}
      </Text>
      <Pressable
        onPressIn={() => onCrossPressed(ingredient)}
        bg={'white'}
        borderRadius={'lg'}
        borderWidth={1}
        borderColor={'$primary'}
        position={'absolute'}
        top={-8}
        right={-8}>
        <Icon name="x" color={'$primary'} size={18} />
      </Pressable>
    </Pressable>
  );
};

const IngredientsSearchScreen: React.FC<{navigation: RecipesStackNavigationProps<'ingredientSearch'>}> = ({navigation}) => {
  const [ingredient, setIngredient] = useState<string | undefined>(undefined);
  const debouncedSearchIngredient = useDebounce(ingredient);
  const {addedIngredients, removeIngredient} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
    removeIngredient: state.removeIngredient,
  }));

  return (
    <Box bg={'$background'} flex={1} alignItems={'center'}>
      <BaseHeader title="Recettes" />
      <Box px={'s'}>
        <Searchbar onUpdateValue={text => setIngredient(text)} placeholder="Miel, Poulet, Citron..." />
      </Box>
      <SearchList searchValue={debouncedSearchIngredient} />
      <Box flex={1} my={'m'} px={'s'} alignSelf={'stretch'}>
        <Text variant={'subtitle1'}>Vos ingrédients</Text>
        <Box p={'m'} flex={1}>
          <FlatList
            numColumns={3}
            data={addedIngredients}
            renderItem={({item}) => <AddedIngredientListItem ingredient={item} onCrossPressed={removeIngredient} />}
            keyExtractor={item => `${item.id}-${item.name}`}
          />
        </Box>
      </Box>
      <Button
        label="J'ai faim 🍜"
        variant={addedIngredients.length ? 'primary' : 'disabled'}
        disabled={addedIngredients.length === 0}
        my={'m'}
        onPress={() => navigation.navigate('recipesSearchResult')}
      />
    </Box>
  );
};

export default IngredientsSearchScreen;
