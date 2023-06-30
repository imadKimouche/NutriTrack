import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Picker from '../components/Picker';
import TextInput from '../components/TextInput';
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
  const {handleSubmit, control} = useForm<{age: number}>({defaultValues: {age: userSetup.age}});

  const heightOptions = generateHeightOptions(120, 230, 1);
  const weightOptions = generateWeightOptions(30, 180, 1);

  function onSubmit(data: {age: number}) {
    setUserSetup({...userSetup, age: data.age});
    navigation.navigate('Allergies');
  }

  return (
    <TabScreenBase title="Renseingez votre age et vos mensurations" buttonTitle="Suivant" onPress={handleSubmit(onSubmit)}>
      <Box paddingHorizontal={'xl'}>
        <Box flexDirection={'row'} alignSelf={'stretch'} py={'l'} alignItems={'center'}>
          <Text variant={'bodyRegular'}>Age</Text>
          <Controller
            name="age"
            control={control}
            rules={{required: 'Age is required', max: 200, min: 10}}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
              <TextInput
                inputPropPresets={'positiveNumber'}
                height={46}
                value={!isNaN(value) ? value.toString() : ''}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
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
