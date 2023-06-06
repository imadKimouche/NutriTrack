import React, {useState} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Pressable from '../atoms/Pressable';
import {FlatList} from 'react-native';
import Icon from '../components/Icon';
import {TabScreenBase} from './TabScreenBase';
import {TabNavigationProp, useUserSetupContext} from './UserSetupScreen';

type ObjectiveItem = {
  name: string;
  icon: string;
};

export const ObjectiveTab: React.FC<{navigation: TabNavigationProp}> = ({
  navigation,
}) => {
  const {userSetup, setUserSetup} = useUserSetupContext();
  const [selectedObjIndex, setSelectedObjIndex] = useState(-1);

  const OBJECTIVES: ObjectiveItem[] = [
    {name: 'Prise de masse', icon: 'chevrons-up'},
    {name: 'Perte de poids', icon: 'chevrons-down'},
    {name: 'Résistance', icon: 'circle'},
  ];

  function goToMesureScreen() {
    if (selectedObjIndex > -1) {
      setUserSetup({...userSetup, goal: OBJECTIVES[selectedObjIndex].name});
      navigation.navigate('Mesurements');
    }
  }

  const renderObjectiveItem = ({
    item,
    index,
  }: {
    item: ObjectiveItem;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => setSelectedObjIndex(index)}
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
        {selectedObjIndex > -1 && index === selectedObjIndex && (
          <Box paddingRight={'m'}>
            <Icon name={'check'} size={20} />
          </Box>
        )}
      </Pressable>
    );
  };

  return (
    <TabScreenBase
      title="Quel est votre objectif fitness?"
      buttonTitle="Suivant"
      onPress={goToMesureScreen}>
      <Box height={'100%'} paddingHorizontal={'xl'}>
        <FlatList
          scrollEnabled={false}
          data={OBJECTIVES}
          renderItem={renderObjectiveItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </TabScreenBase>
  );
};
