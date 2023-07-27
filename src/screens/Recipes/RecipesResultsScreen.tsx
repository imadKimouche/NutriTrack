import React from 'react';
import {FlatList, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import {useSearchRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps} from '../../navigation/RecipesStackNavigator';
import {useSearchMealStore} from '../../store/ingredients';

export type Recipe = {
  id: number;
  name: string;
  photo: string;
  quantity: number;
  time: string;
};

export type SearchRecipe = Recipe & {matching_ingredients_count: number};

const RecipesSearchResultsScreen: React.FC<{navigation: RecipesStackNavigationProps<'recipesSearchResult'>}> = ({navigation}) => {
  const {addedIngredients} = useSearchMealStore(state => ({
    addedIngredients: state.addedIngredients,
  }));
  const {data, isLoading} = useSearchRecipe(addedIngredients);

  return (
    <Box>
      <BaseHeader
        leftComponent={<GoBackButton onPress={() => navigation.goBack()} />}
        title={`${data.length} Recettes trouvées`}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Box alignSelf={'stretch'} alignItems={'center'}>
          <FlatList
            numColumns={2}
            pagingEnabled={true}
            data={data}
            renderItem={({item}) => {
              return (
                <Box m={'m'} borderRadius={'xs'} bg={'$background1'} width={150} height={150}>
                  <ImageBackground source={{uri: item.photo}} style={{flex: 1}}>
                    <LinearGradient
                      colors={['transparent', 'transparent', 'black']}
                      style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                      <Text variant={'subtitle1'} color={'white'}>
                        {item.name}
                      </Text>
                      <Box flexDirection={'row'} alignItems={'center'}>
                        <Icon name="clock" color={'white'} />
                        <Text ml={'xs'} variant={'caption'} color={'white'}>
                          {item.time}
                        </Text>
                        <Text color={'white'}> - </Text>
                        <Icon name="users" color={'white'} />
                        <Text ml={'xs'} variant={'caption'} color={'white'}>
                          {item.quantity}
                        </Text>
                      </Box>
                    </LinearGradient>
                  </ImageBackground>
                </Box>
              );
            }}
            keyExtractor={item => `${item.id}-${item.name}`}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipesSearchResultsScreen;
