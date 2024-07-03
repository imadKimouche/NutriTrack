import React from 'react';
import {FlatList, Image} from 'react-native';

import Box from '#/atoms/Box';
import Button from '#/components/Button';
import BaseHeader from '#/components/Header';
import {SearchInput} from '#/components/SearchInput';
import ListItem from '#/components/ListItem';
import {RecipesStackNavigationProps} from '../../navigation/RecipesStackNavigator';
import {useSearchMealStore} from '#/store/ingredients';
import {Ingredient, useSearchIngredient} from '#/hooks/meal';
import Text from '#/atoms/Text';
import Pressable from '#/atoms/Pressable';

function IngredientsSearchScreen({navigation}: {navigation: RecipesStackNavigationProps<'ingredientSearch'>}) {
  const [search, setSearch] = React.useState('');
  const {data: results} = useSearchIngredient(search);
  const {ingredients, add, remove, clear} = useSearchMealStore();

  const onPressIngredient = (item: Ingredient) => {
    add(item);
    setSearch('');
  };

  return (
    <Box bg={'$screenBackground'} flex={1} alignItems={'center'}>
      <BaseHeader title="Recettes" />
      <Box p={'m'} alignSelf={'stretch'}>
        <SearchInput
          query={search}
          onChangeQuery={setSearch}
          onPressCancelSearch={() => setSearch('')}
          onSubmitQuery={() => {}}
          placeholder="Miel, Poulet, Citron..."
        />

        {ingredients.length !== 0 && (
          <Box flexDirection={'row'} justifyContent={'space-between'} py="m">
            <Text variant={'subtitle1'} color={'$textHeading'}>
              Ingrédients ({ingredients.length})
            </Text>
            <Pressable onPress={clear} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
              <Text variant={'link-small'} color={'$link'}>
                Tout effacer
              </Text>
            </Pressable>
          </Box>
        )}

        {results?.length !== 0 && (
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ListItem
                title={item.name}
                leftComponent={
                  <Box width={50} height={50} borderRadius="xs" alignItems={'center'} justifyContent={'center'} bg="$bg" mr={'s'}>
                    <Image width={48} height={48} resizeMode="contain" source={{uri: item.image}} />
                  </Box>
                }
                onPress={() => onPressIngredient(item)}
              />
            )}
          />
        )}

        <FlatList
          data={ingredients}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem title={item.name} onPress={() => remove(item.id)} />}
        />
      </Box>
      <Box alignSelf={'stretch'} px={'xl'} my={'m'}>
        <Button
          label="Rechercher"
          variant={ingredients.length ? 'primary-left' : 'primary-left-disabled'}
          icon="search"
          disabled={ingredients.length === 0}
          onPress={() => navigation.navigate('recipesSearchResult')}
        />
      </Box>
    </Box>
  );
}

export default IngredientsSearchScreen;
