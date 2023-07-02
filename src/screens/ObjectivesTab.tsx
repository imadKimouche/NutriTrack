import React from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Pressable from '../atoms/Pressable';
import {FlatList} from 'react-native';
import Icon from '../components/Icon';
import {TabScreenBase} from './TabScreenBase';
import {TabNavigationProp} from './UserSetupScreen';
import {useUserSetupContext} from '../context/userSetup';

type ObjectiveItem = {
  name: string;
  icon: string;
};

const OBJECTIVES: ObjectiveItem[] = [
  {name: 'Prise de masse', icon: 'chevrons-up'},
  {name: 'Perte de poids', icon: 'chevrons-down'},
  {name: 'Résistance', icon: 'circle'},
];

const ACTIVITY_TYPES = [
  {label: "Sédentaire (peu ou pas d'exercice)", factor: 1.2},
  {label: 'Légèrement actif (1 à 3 jours par semaine)', factor: 1.375},
  {label: 'Modérément actif (3 à 5 jours par semaine)', factor: 1.55},
  {label: 'Très actif (6 à 7 jours par semaine)', factor: 1.725},
  {label: 'Extrêmement actif (exercice très intense)', factor: 1.9},
];

export const ObjectiveTab: React.FC<{navigation: TabNavigationProp}> = ({navigation}) => {
  const {userSetup, setUserSetup} = useUserSetupContext();

  function goToMesureScreen() {
    if (userSetup.goal !== '') {
      navigation.navigate('Mesurements');
    } else {
      console.log('choose a goal first');
      // TODO add ui message
    }
  }

  const renderObjectiveItem = ({item, index}: {item: ObjectiveItem; index: number}) => {
    return (
      <Pressable
        onPress={() => setUserSetup({...userSetup, goal: item.name})}
        flexDirection={'row'}
        alignItems={'center'}
        height={56}
        borderBottomWidth={index !== OBJECTIVES.length - 1 ? 1 : 0}
        borderBottomColor={'$listItemDivider'}
        borderStyle={'solid'}>
        <Icon name={item.icon} size={26} />
        <Box flex={1}>
          <Text paddingHorizontal={'m'}>{item.name}</Text>
        </Box>
        {userSetup.goal !== '' && item.name === userSetup.goal && (
          <Box paddingRight={'m'}>
            <Icon name={'check'} size={20} />
          </Box>
        )}
      </Pressable>
    );
  };

  return (
    <TabScreenBase title="Quel est votre objectif fitness?" buttonTitle="Suivant" onPress={goToMesureScreen}>
      <Box flex={1} px={'xl'} my={'s'}>
        <Text variant={'bodyLarge'}>Objectif</Text>
        <FlatList
          scrollEnabled={false}
          data={OBJECTIVES}
          renderItem={renderObjectiveItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
      <Box flex={0.8} px={'xl'} my={'s'}>
        <Text variant={'bodyLarge'}>Activité</Text>
        <FlatList
          data={ACTIVITY_TYPES}
          renderItem={({item}) => <Text p={'s'}>{item.label}</Text>}
          keyExtractor={item => item.label}
        />
      </Box>
    </TabScreenBase>
  );
};
