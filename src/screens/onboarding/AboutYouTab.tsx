import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Button from '../../components/Button';
import BaseHeader, {GoBackButton} from '../../components/Header';
import {TabNavigationProp} from '../../navigation/OnboardingNavigator';
import {Gender, useOnBoardingStore} from '../../store/onboarding';
import {generateHeightOptions, generateWeightOptions} from '../../utils';
import {OnboardingListItem} from './GoalTab';
import Picker from '../../components/Picker';
import TextInput from '../../components/TextInput';
import {KeyboardAvoidingView, Platform} from 'react-native';
import ListItem from '../../components/ListItem';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../style/theme';

// TODO useMemo
export const HEIGHT_OPTIONS = generateHeightOptions(120, 230, 1);
export const WEIGHT_OPTIONS = generateWeightOptions(30, 180, 1);

export type GenderItem = Omit<OnboardingListItem<Gender>, 'indication'>;

export const GENDERS: GenderItem[] = [
  {id: 'male', label: 'Homme', icon: 'user'},
  {id: 'female', label: 'Femme', icon: 'user'},
];

const Section: React.FC<{title: string; children: ReactNode}> = ({title, children}) => {
  return (
    <Box mb={'l'}>
      <Text variant={'text-medium'} color={'$primary'}>
        {title}
      </Text>
      <>{children}</>
    </Box>
  );
};

export type AboutYouTabProps = {navigation: TabNavigationProp};
const AboutYouTab: React.FC<AboutYouTabProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {spacing} = useTheme<Theme>();
  const {gender, setGender, setAge, age, height, setHeight, weight, setWeight} = useOnBoardingStore(state => ({
    gender: state.gender,
    setGender: state.setGender,
    age: state.age,
    setAge: state.setAge,
    height: state.height,
    setHeight: state.setHeight,
    weight: state.weight,
    setWeight: state.setWeight,
  }));
  const [ageStr, setAgeStr] = useState('');
  const canAdvance = gender !== undefined && age !== undefined;

  const [bottomSheetType, setBottomSheetType] = useState<'height' | 'weight' | undefined>(undefined);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);

  useEffect(() => {
    const numValue = parseInt(ageStr, 10);
    if (!isNaN(numValue)) {
      setAge(numValue);
    }
  }, [ageStr, setAge]);

  function openBottomSheetFor(type: 'height' | 'weight' | undefined) {
    if (type === undefined) {
      bottomSheetRef.current?.close();
    } else {
      setBottomSheetType(type);
      bottomSheetRef.current?.expand();
    }
  }

  return (
    <Box flex={1} bg={'$bgWeak'}>
      <BaseHeader
        title="À propos de vous"
        leftComponent={<GoBackButton onPress={() => navigation.navigate('activityLevel')} />}
      />
      <Box flex={1} p={'m'}>
        <Section title="Genre">
          {GENDERS.map(item => (
            <ListItem
              key={item.id}
              onPress={() => setGender(item.id)}
              variant={item.id === gender ? 'active' : undefined}
              title={item.label}
            />
          ))}
        </Section>
        <Section title="Âge">
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{marginTop: spacing.m}}>
            <TextInput
              alignSelf={'stretch'}
              placeholder="Entrez votre age"
              value={ageStr}
              onChangeText={value => setAgeStr(value.replace(/[^0-9]/g, ''))}
              inputPropPresets={'positiveNumber'}
            />
          </KeyboardAvoidingView>
        </Section>
        <Section title="Taille & Poids">
          <ListItem
            title="Taille"
            onPress={() => openBottomSheetFor('height')}
            variant={bottomSheetType === 'height' ? 'active' : undefined}
            rightComponent={
              <Text variant={'text-small-tight'} color={'$label'}>
                {height} cm
              </Text>
            }
            rightComponentProps={{flex: 0.5, alignItems: 'flex-end'}}
          />
          <ListItem
            title="Poids"
            onPress={() => openBottomSheetFor('weight')}
            variant={bottomSheetType === 'weight' ? 'active' : undefined}
            rightComponent={
              <Text variant={'text-small-tight'} color={'$label'}>
                {weight} kg
              </Text>
            }
            rightComponentProps={{flex: 0.5, alignItems: 'flex-end'}}
          />
        </Section>
      </Box>
      <Box flex={0.5} justifyContent={'center'} alignItems={'center'} px={'xl'}>
        <Button
          onPress={() => navigation.navigate('nutritionPreferences')}
          alignSelf={'stretch'}
          label="Suivant"
          variant={canAdvance ? 'primary-right' : 'primary-right-disabled'}
          icon="chevron-right"
        />
      </Box>
      <BottomSheet
        keyboardBehavior="interactive"
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        onClose={() => setBottomSheetType(undefined)}
        snapPoints={snapPoints}
        bottomInset={insets.bottom}>
        {bottomSheetType === 'height' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Renseignez votre taille
            </Text>
            <Picker
              itemStyle={{height: '90%'}}
              selectedValue={height}
              onValueChange={itemValue => setHeight(itemValue as typeof height)}>
              {HEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}

        {bottomSheetType === 'weight' && (
          <Box px={'m'}>
            <Text py={'xs'} variant={'text-medium'}>
              Renseignez votre poids
            </Text>
            <Picker
              itemStyle={{height: '90%'}}
              selectedValue={weight}
              onValueChange={itemValue => setWeight(itemValue as typeof weight)}>
              {WEIGHT_OPTIONS.map(option => {
                return <Picker.Item key={option.label} label={option.label} value={option.value} />;
              })}
            </Picker>
          </Box>
        )}
      </BottomSheet>
    </Box>
  );
};

export default AboutYouTab;
