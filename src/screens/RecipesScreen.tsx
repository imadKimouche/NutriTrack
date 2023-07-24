import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import BaseHeader from '../components/Header';
import Icon from '../components/Icon';
import Searchbar from '../components/Searchbar';
import Tag from '../components/Tag';
import {Ingredient, useSearchIngredient} from '../hooks/meal';
import {useSearchMealStore} from '../store/ingredients';
import {SearchError, SearchLoader} from './SearchMealScreen';

type IngredientListItemProps = {
  ingredient: Ingredient;
  onItemPressed: (ingredient: Ingredient) => void;
};

const IngredientListItem: React.FC<IngredientListItemProps> = ({ingredient, onItemPressed}) => {
  return (
    <Pressable
      onPress={() => onItemPressed(ingredient)}
      alignSelf={'stretch'}
      p={'m'}
      borderBottomColor={'$listItemDivider'}
      bg={'$searchbarBackground'}
      borderBottomWidth={1}
      flexDirection={'row'}
      alignItems={'center'}>
      <Text variant={'body2'} ellipsizeMode={'tail'}>
        {ingredient.name}
      </Text>
    </Pressable>
  );
};

const SearchList: React.FC<{searchValue?: string}> = ({searchValue}) => {
  const {data, isLoading, isError} = useSearchIngredient(searchValue);
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

  if (data.length > 0) {
    return (
      <Box flex={1} alignSelf={'stretch'} mx={'m'} my={'xs'}>
        <FlatList
          data={data}
          renderItem={item => <IngredientListItem ingredient={item.item} onItemPressed={onIngredientPressed} />}
          keyExtractor={item => `${item.code}-${item.name}`}
        />
      </Box>
    );
  }
  return <></>;
};

// <Box
//   key={ing.code}
//   m={'xs'}
//   p={'s'}
//   borderRadius={'sm'}
//   bg={'$headerButtonBackground'}
//   flexDirection={'row'}
//   alignItems={'center'}>
//   <Text variant={'subtitle2'} color={'white'}>
//     {ing.name}
//   </Text>
//   <Pressable ml={'s'} onPress={() => removeIngredient(ing)}>
//     <Icon name="x-circle" color={'white'} size={16} />
//   </Pressable>
// </Box>

const RecipesScreen = () => {
  const [ingredient, setIngredient] = useState<string | undefined>(undefined);
  const {addedIngredients, removeIngredient} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
    removeIngredient: state.removeIngredient,
  }));

  return (
    <Box bg={'$background'} flex={1} alignItems={'center'}>
      <BaseHeader title="Recettes" />
      <Box px={'s'}>
        <Searchbar onSubmitEditing={setIngredient} placeholder="Miel, ail, citron..." />
      </Box>
      <SearchList searchValue={ingredient} />
      <Box flex={1} my={'m'} px={'s'} alignSelf={'stretch'}>
        <Text variant={'subtitle1'}>Vos ingrédients</Text>
        <Box m={'s'} flexDirection={'row'} flexWrap={'wrap'} gap={'s'}>
          {addedIngredients.map(ing => {
            return <Tag label={ing.name} rightIcon={'x-circle'} type="outlined" onRightIconPress={() => removeIngredient(ing)} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default RecipesScreen;
