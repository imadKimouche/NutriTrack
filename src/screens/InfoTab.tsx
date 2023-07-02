import React, {useState} from 'react';
import Box from '../atoms/Box';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Picker from '../components/Picker';
import {useUserSetupContext} from '../context/userSetup';
import {TabScreenBase} from './TabScreenBase';
import {TabNavigationProp} from './UserSetupScreen';

export const InfoTab: React.FC<{
  navigation: TabNavigationProp;
}> = ({navigation}) => {
  const {userSetup, setUserSetup} = useUserSetupContext();
  const [ageError, setAgeError] = useState('');

  function goToObjectivesScreen() {
    if (ageError === '') {
      navigation.navigate('Objectives');
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
    <TabScreenBase title="1/4" buttonTitle="Suivant" onPress={goToObjectivesScreen}>
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
          <Text variant={'bodyRegular'}>Sexe</Text>
          <Box flexDirection={'row'}>
            <Box flex={1}>
              <Picker
                itemStyle={{height: 110}}
                selectedValue={userSetup.sexe}
                onValueChange={itemValue => setUserSetup({...userSetup, sexe: itemValue.toString()})}>
                {['Homme', 'Femme'].map(option => {
                  return <Picker.Item key={option} label={option} value={option} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </Box>
    </TabScreenBase>
  );
};
