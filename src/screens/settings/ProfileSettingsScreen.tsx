import BottomSheet from '@gorhom/bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Box from '../../atoms/Box';
import Input from '../../atoms/Input';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import Icon from '../../components/Icon';
import {Gender, useOnBoardingStore} from '../../store/onboarding';
import {generateHeightOptions, generateWeightOptions} from '../../utils';
import {OnboardingListItem} from '../onboarding/GoalTab';

const HEIGHT_OPTIONS = generateHeightOptions(120, 230, 1);
const WEIGHT_OPTIONS = generateWeightOptions(30, 180, 1);

const ProfileSettingsItem: React.FC<{onPress: () => void; label: string; value: string}> = ({onPress, label, value}) => {
  return (
    <Pressable
      onPress={onPress}
      flexDirection={'row'}
      justifyContent={'space-between'}
      p={'m'}
      borderBottomWidth={1}
      borderColor={'$listItemDivider'}
      bg={'$background'}>
      <Text variant={'body1'}>{label}</Text>
      <Text variant={'body2'}>{value}</Text>
    </Pressable>
  );
};

type GenderItem = Omit<OnboardingListItem<Gender>, 'indication'>;

const GENDERS: GenderItem[] = [
  {id: 'male', label: 'Homme', icon: 'user'},
  {id: 'female', label: 'Femme', icon: 'user'},
];

const GenderListItem: React.FC<GenderItem & {selectedItem: Gender; setSelectedItem: (item: Gender) => void}> = ({
  id,
  label,
  icon,
  selectedItem,
  setSelectedItem,
}) => {
  const isSelected = id === selectedItem;

  return (
    <Pressable
      onPress={() => setSelectedItem(id)}
      flexDirection={'row'}
      alignItems={'center'}
      height={56}
      borderBottomWidth={1}
      borderBottomColor={'$listItemDivider'}
      borderStyle={'solid'}>
      <Icon name={icon} size={26} color={isSelected ? '$primary' : '$labelOff'} />
      <Box flex={1} px={'l'}>
        <Text variant={'body1'} color={isSelected ? '$primary' : 'black'}>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

const ProfileSettingsScreen: React.FC = () => {
  const {age, setAge, gender, setGender, height, setHeight, weight, setWeight} = useOnBoardingStore(state => ({
    age: state.age,
    setAge: state.setAge,
    gender: state.gender,
    setGender: state.setGender,
    height: state.height,
    setHeight: state.setHeight,
    weight: state.weight,
    setWeight: state.setWeight,
  }));
  const bsAgeRef = useRef<BottomSheet>(null);
  const bsGenderRef = useRef<BottomSheet>(null);
  const bsHeightRef = useRef<BottomSheet>(null);
  const bsWeightRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['5%', '25%', '50%'], []);
  const [ageStr, setAgeStr] = useState('');

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  return (
    <Box flex={1}>
      <ProfileSettingsItem
        onPress={() => {
          bsHeightRef.current?.expand();
        }}
        label="Taille"
        value={`${height} cm`}
      />
      <ProfileSettingsItem onPress={() => bsWeightRef.current?.expand()} label="Poids" value={`${weight} kg`} />
      <ProfileSettingsItem onPress={() => bsAgeRef.current?.expand()} label="Age" value={`${age} ans`} />
      <ProfileSettingsItem onPress={() => bsGenderRef.current?.expand()} label="Sexe" value={gender} />
      <BottomSheet ref={bsAgeRef} index={-1} snapPoints={snapPoints}>
        <Box>
          <Text variant={'subtitle2'}>Age</Text>
          <Input
            value={ageStr}
            onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
            padding={'s'}
            marginVertical={'s'}
            keyboardType="numeric"
            borderWidth={1}
            borderColor={'$textInputBorderColor'}
            borderRadius={'xs'}
          />
        </Box>
      </BottomSheet>
      <BottomSheet ref={bsAgeRef} index={-1} snapPoints={snapPoints}>
        <Box>
          <Text variant={'subtitle2'}>Sexe</Text>
          {GENDERS.map(item => (
            <GenderListItem key={item.id} {...item} selectedItem={gender} setSelectedItem={setGender} />
          ))}
        </Box>
      </BottomSheet>
      <BottomSheet ref={bsHeightRef} index={-1} snapPoints={snapPoints}>
        <Box>
          <Text variant={'subtitle2'}>Taille</Text>
          <Picker itemStyle={{height: 110}} selectedValue={height} onValueChange={itemValue => setHeight(itemValue)}>
            {HEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
      </BottomSheet>
      <BottomSheet ref={bsWeightRef} index={-1} snapPoints={snapPoints}>
        <Box>
          <Text variant={'subtitle2'}>Poids</Text>
          <Picker itemStyle={{height: 110}} selectedValue={weight} onValueChange={itemValue => setWeight(itemValue)}>
            {WEIGHT_OPTIONS.map(option => {
              return <Picker.Item key={option.label} label={option.label} value={option.value} />;
            })}
          </Picker>
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default ProfileSettingsScreen;
