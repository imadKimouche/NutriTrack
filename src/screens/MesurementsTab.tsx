import React, {useState} from 'react';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Picker from '../components/Picker';
import {useUserSetupContext} from '../context/userSetup';
import {TabScreenBase} from './TabScreenBase';
import {TabNavigationProp} from './UserSetupScreen';

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
  const [ageError, setAgeError] = useState('');

  const heightOptions = generateHeightOptions(120, 230, 1);
  const weightOptions = generateWeightOptions(30, 180, 1);

  function goToAllergiesScreen() {
    if (ageError === '') {
      navigation.navigate('Allergies');
    }
  }

  function setAge(age: string) {
    const ageNumber = parseInt(age, 10);
    if (!isNaN(ageNumber)) {
      if (ageNumber < 10 || ageNumber > 150) {
        setAgeError('est-ce bien votre age? 🤔');
      } else {
        setAgeError('');
      }
    }
    setUserSetup({...userSetup, age: parseInt(age, 10)});
  }

  return (
    <TabScreenBase title="Renseingez votre age et vos mensurations" buttonTitle="Suivant" onPress={goToAllergiesScreen}>
      <Box paddingHorizontal={'xl'}>
        <Box py={'l'}>
          <Box flexDirection={'row'} alignSelf={'stretch'} alignItems={'center'}>
            <Text variant={'bodyRegular'}>Age</Text>
            <Input
              value={!isNaN(userSetup.age) ? userSetup.age.toString() : ''}
              onChangeText={setAge}
              flex={1}
              marginHorizontal={'s'}
              placeholder="age"
              keyboardType="numeric"
              borderStyle={'solid'}
              borderWidth={1}
              borderColor={'$textInputBorderColor'}
              borderRadius={'xs'}
              padding={'m'}
            />
          </Box>
          <Text variant={'errorSmall'}>{ageError}</Text>
        </Box>
        <Box>
          <Text variant={'bodyRegular'}>Taille</Text>
          <Box flexDirection={'row'}>
            <Box flex={1}>
              <Picker
                itemStyle={{height: 110}}
                selectedValue={userSetup.height}
                onValueChange={itemValue => setUserSetup({...userSetup, height: itemValue.toString()})}>
                {heightOptions.map(option => {
                  return <Picker.Item key={option.label} label={option.label} value={option.value} />;
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
                selectedValue={userSetup.weight}
                onValueChange={itemValue => setUserSetup({...userSetup, weight: itemValue.toString()})}>
                {weightOptions.map(option => {
                  return <Picker.Item key={option.label} label={option.label} value={option.value} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </Box>
    </TabScreenBase>
  );
};
