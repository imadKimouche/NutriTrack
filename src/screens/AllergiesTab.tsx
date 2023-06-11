import React from 'react';
import {FlatList} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {TabScreenBase} from './TabScreenBase';
import NoGlutenImage from '../assets/sans-gluten.svg';
import NoDiaryImage from '../assets/lait.svg';
import NoNutImage from '../assets/cacahuete.svg';
import NoShellfishImage from '../assets/crevette.svg';
import NoSoy from '../assets/soja.svg';
import NoEggs from '../assets/des-oeufs.svg';
import NoGrain from '../assets/farine.svg';
import {SvgProps} from 'react-native-svg';
import Icon from '../components/Icon';
import {useUserSetupContext} from '../context/userSetup';
import {useSaveUserData, useUserData} from '../hooks/userData';

const ICONS: {[key: string]: React.FC<SvgProps>} = {
  'no-gluten': NoGlutenImage,
  'no-diary': NoDiaryImage,
  'no-nut': NoNutImage,
  'no-shellfish': NoShellfishImage,
  'no-soy': NoSoy,
  'no-grain': NoGrain,
  'no-eggs': NoEggs,
};

type AllergyItem = {
  id: string;
  name: string;
  icon: string;
};

const ALLERGIES: AllergyItem[] = [
  {
    id: 'gluten',
    name: 'Allergie au gluten',
    icon: 'no-gluten',
  },
  {
    id: 'diary',
    name: 'Allergie aux produits laitiers',
    icon: 'no-diary',
  },
  {
    id: 'nut',
    name: 'Allergie aux fruits à coque',
    icon: 'no-nut',
  },
  {
    id: 'shellfish',
    name: 'Allergie aux crustacés et aux poissons',
    icon: 'no-shellfish',
  },
  {
    id: 'eggs',
    name: 'Allergie aux œufs',
    icon: 'no-eggs',
  },
  {
    id: 'soy',
    name: 'Allergie au soja',
    icon: 'no-soy',
  },
  {
    id: 'grain',
    name: 'Allergie au sésame',
    icon: 'no-grain',
  },
];

export const AllergiesTab: React.FC = () => {
  const {saveUserData} = useSaveUserData();
  const {userSetup, setUserSetup} = useUserSetupContext();

  function gotToHomeScreen() {
    console.log('allergies', userSetup.allergies);
    saveUserData(userSetup);
  }

  function onAllergyItemSelected(allergyId: string) {
    if (userSetup.allergies.includes(allergyId)) {
      setUserSetup({
        ...userSetup,
        allergies: userSetup.allergies.filter(selectedItem => selectedItem !== allergyId),
      });
    } else {
      setUserSetup({
        ...userSetup,
        allergies: [...userSetup.allergies, allergyId],
      });
    }
  }

  const renderObjectiveItem = ({item, index}: {item: AllergyItem; index: number}) => {
    const Image = ICONS[item.icon];
    return (
      <Pressable
        key={index}
        onPress={() => onAllergyItemSelected(item.id)}
        flexDirection={'row'}
        alignItems={'center'}
        height={56}
        borderBottomWidth={index !== ALLERGIES.length - 1 ? 1 : 0}
        borderBottomColor={'$listItemDivider'}
        borderStyle={'solid'}>
        <Box flex={1} flexDirection={'row'} alignItems={'center'}>
          <Image width={32} height={32} />
          <Box flex={1}>
            <Text paddingHorizontal={'m'}>{item.name}</Text>
          </Box>
          {userSetup.allergies.includes(item.id) && <Icon name="check" size={20} />}
        </Box>
      </Pressable>
    );
  };

  return (
    <TabScreenBase title="Avez vous des allérgies?" buttonTitle="Suivant" onPress={gotToHomeScreen}>
      <Box paddingHorizontal={'xl'}>
        <FlatList data={ALLERGIES} renderItem={renderObjectiveItem} keyExtractor={(item, index) => index.toString()} />
      </Box>
    </TabScreenBase>
  );
};
