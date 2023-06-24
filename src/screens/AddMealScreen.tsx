import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from '../components/Icon';
import Searchbar from '../components/Searchbar';
import {useSearchOFFMeal} from '../hooks/meal';

export const AddMealHeader: React.FC<NativeStackHeaderProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      bg={'$background'}
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      pb={'s'}
      style={{
        paddingTop: insets.top,
      }}>
      <Pressable flex={1} flexDirection={'row'} alignItems={'center'} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} />
        <Text variant={'headerBackTitle'}>Suivi</Text>
      </Pressable>
      <Box flex={2} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'headerTitle'}>Ajout de repas</Text>
      </Box>
      <Box flex={1} />
    </Box>
  );
};

const AddMealScreen: React.FC<{}> = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchMeal, setSearchMeal] = useState('');

  const {data, isLoading, isError} = useSearchOFFMeal(searchMeal);
  const HISTORY_DATA = ['Lorem', 'ipsum', 'dolor', 'sit amet', 'qui minim', 'labore adipisicing', 'minim sint cillum'];

  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'} bg={'$windowBackground'}>
      <Box width={'100%'} px={'s'} py={'m'}>
        <Searchbar
          value={searchValue}
          placeholder="Banane, riz, ..."
          onChangeText={(value: string) => setSearchValue(value)}
          onClearText={() => {
            setSearchValue('');
            setSearchMeal('');
          }}
          onSubmitEditing={value => setSearchMeal(value)}
          filteredResults={data ? data : []}
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
