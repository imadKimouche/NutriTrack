import React, {useState} from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Picker from '../components/Picker';
import {TabScreenBase} from './TabScreenBase';
import {
  TabNavigationProp,
  TabRouteProp,
  useUserSetupContext,
} from './UserSetupScreen';

function generateHeightOptions(min: number, max: number, increment: number) {
  const options = [];
  for (let height = min; height <= max; height += increment) {
    const label = `${height} cm`;
    options.push({value: height.toString(), label});
  }
  return options;
}

const generateWeightOptions = (min: number, max: number, increment: number) => {
  const options = [];
  for (let weight = min; weight <= max; weight += increment) {
    options.push({value: weight.toString(), label: `${weight} kg`});
  }
  return options;
};

export const MesurementsTab: React.FC<{
  navigation: TabNavigationProp;
}> = ({navigation}) => {
  const {userSetup, setUserSetup} = useUserSetupContext();
  const [selectedHeight, setSelectedHeight] = useState('150');
  const [selectedWeight, setSelectedWeight] = useState('55');

  const heightOptions = generateHeightOptions(120, 230, 1);
  const weightOptions = generateWeightOptions(30, 180, 1);

  function goToAllergiesScreen() {
    setUserSetup({
      ...userSetup,
      height: selectedHeight,
      weight: selectedWeight,
    });
    navigation.navigate('Allergies');
  }

  return (
    <TabScreenBase
      title="Renseingez vos mensurations"
      buttonTitle="Suivant"
      onPress={goToAllergiesScreen}>
      <Box paddingHorizontal={'xl'}>
        <Box>
          <Text variant={'bodyRegular'}>Taille</Text>
          <Box flexDirection={'row'}>
            <Box flex={1}>
              <Picker
                itemStyle={{height: 110}}
                selectedValue={selectedHeight}
                onValueChange={itemValue =>
                  setSelectedHeight(itemValue.toString())
                }>
                {heightOptions.map(option => {
                  return (
                    <Picker.Item
                      key={option.label}
                      label={option.label}
                      value={option.value}
                    />
                  );
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text variant={'bodyRegular'}>Poids</Text>
          <Box flexDirection={'row'}>
            <Box flex={1}>
              <Picker
                itemStyle={{height: 110}}
                selectedValue={selectedWeight}
                onValueChange={itemValue =>
                  setSelectedWeight(itemValue.toString())
                }>
                {weightOptions.map(option => {
                  return (
                    <Picker.Item
                      key={option.label}
                      label={option.label}
                      value={option.value}
                    />
                  );
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </Box>
    </TabScreenBase>
  );
};
