import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {TabScreenBase} from './TabScreenBase';
import {TabNavigationProp, useUserSetupContext} from './UserSetupScreen';
import NoGlutenImage from '../assets/sans-gluten.svg';
import NoDiaryImage from '../assets/lait.svg';
import NoNutImage from '../assets/cacahuete.svg';
import NoShellfishImage from '../assets/crevette.svg';
import NoSoy from '../assets/soja.svg';
import NoEggs from '../assets/des-oeufs.svg';
import NoGrain from '../assets/farine.svg';
import {SvgProps} from 'react-native-svg';

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
  name: string;
  icon: string;
};

const ALLERGIES = [
  {
    name: 'Allergie au gluten',
    icon: 'no-gluten',
  },
  {
    name: 'Allergie aux produits laitiers',
    icon: 'no-diary',
  },
  {
    name: 'Allergie aux fruits à coque',
    icon: 'no-nut',
  },
  {
    name: 'Allergie aux crustacés et aux poissons',
    icon: 'no-shellfish',
  },
  {
    name: 'Allergie aux œufs',
    icon: 'no-eggs',
  },
  {
    name: 'Allergie au soja',
    icon: 'no-soy',
  },
  {
    name: 'Allergie au sésame',
    icon: 'no-grain',
  },
];

export const AllergiesTab: React.FC<{
  navigation: TabNavigationProp;
}> = ({navigation}) => {
  const {userSetup, setUserSetup} = useUserSetupContext();
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  function gotToHomeScreen() {
    setUserSetup({...userSetup, allergies: selectedAllergies});
    console.log('go to mesure', userSetup);
  }

  const renderObjectiveItem = ({
    item,
    index,
  }: {
    item: AllergyItem;
    index: number;
  }) => {
    const Image = ICONS[item.icon];
    return (
      <Pressable
        key={index}
        onPress={() => {
          if (selectedAllergies.includes(item.name)) {
            setSelectedAllergies(
              selectedAllergies.filter(
                selectedItem => selectedItem !== item.name,
              ),
            );
          } else {
            setSelectedAllergies([...selectedAllergies, item.name]);
          }
        }}
        flexDirection={'row'}
        alignItems={'center'}
        height={56}
        borderBottomWidth={index !== ALLERGIES.length - 1 ? 1 : 0}
        borderBottomColor={'$listItemDivider'}
        borderStyle={'solid'}>
        <Box flex={1} flexDirection={'row'} alignItems={'center'}>
          <Image width={32} height={32} />
          <Text paddingHorizontal={'m'}>{item.name}</Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <TabScreenBase
      title="Quel est votre objectif fitness?"
      buttonTitle="Suivant"
      onPress={gotToHomeScreen}>
      <Box paddingHorizontal={'xl'}>
        <FlatList
          data={ALLERGIES}
          renderItem={renderObjectiveItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </TabScreenBase>
  );
};
