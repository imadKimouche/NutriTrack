import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {FlatList, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import BaseHeader, {GoBackButton} from '../../components/Header';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import {useSearchRecipe} from '../../hooks/meal';
import {RecipesStackNavigationProps} from '../../navigation/RecipesStackNavigator';
import {useSearchMealStore} from '../../store/ingredients';
import {Theme} from '../../style/theme';

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
  const {spacing, borderRadii} = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Box flex={1} style={{paddingBottom: insets.bottom + bottomTabBarHeight}}>
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
            data={data}
            renderItem={({item}) => {
              return (
                <Box m={'m'} borderRadius={'xs'} bg={'$background1'} width={150} height={150}>
                  <ImageBackground
                    source={{uri: item.photo}}
                    defaultSource={require('../../assets/recipe_placeholder.png')}
                    onError={err => console.log(err)}
                    style={{flex: 1, borderRadius: borderRadii.xs}}
                    imageStyle={{borderRadius: borderRadii.xs}}>
                    <LinearGradient
                      colors={['transparent', 'transparent', 'black']}
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        padding: spacing.s,
                        borderRadius: borderRadii.xs,
                      }}>
                      <Text variant={'subtitle1'} color={'white'} numberOfLines={1}>
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
