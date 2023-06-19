import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import Searchbar from '../components/Searchbar';
import {useSearchMeals} from '../hooks/meal';

export const AddMealHeader: React.FC<NativeStackHeaderProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      width={'100%'}
      flexDirection={'row'}
      paddingHorizontal={'l'}
      alignItems={'center'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable flex={0.5} flexDirection={'row'} alignItems={'center'} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Suivi</Text>
      </Pressable>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>Ajout de repas</Text>
      </Box>
      <Box flex={0.5} />
    </Box>
  );
};

const AddMealScreen: React.FC<{}> = () => {
  const [searchValue, setSearchValue] = useState('');
  const {data, isLoading, isError} = useSearchMeals(searchValue);
  const HISTORY_DATA = ['Lorem', 'ipsum', 'dolor', 'sit amet', 'qui minim', 'labore adipisicing', 'minim sint cillum'];

  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'}>
      <Box width={'100%'} px={'s'} py={'m'}>
        <Searchbar
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
          placeholder="Banene, riz, ..."
          onSubmitEditing={value => {
            console.log('submit search value', value);
          }}
          filteredResults={data}
          isError={isError}
          isLoading={isLoading}
        />
      </Box>
      <Box flex={1} width={'100%'} p={'s'}>
        <Text variant={'h6'}>Historique</Text>
        <Box>
          {HISTORY_DATA.map((item, index) => {
            return (
              <Box
                key={index}
                p={'m'}
                borderBottomColor={'$listItemDivider'}
                borderBottomWidth={1}
                flexDirection={'row'}
                alignItems={'center'}>
                <Text>{item}</Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AddMealScreen;
