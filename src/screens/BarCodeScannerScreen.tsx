import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Alert} from 'react-native';
import Box from '../atoms/Box';
import BaseHeader, {GoBackButton} from '../components/Header';
import {useSearchOFFMealBC} from '../hooks/meal';
import {HomeStackParamList} from './HomeStackNavigator';

type BarCodeScrannerScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BarCodeScanner'>;
const BarCodeScannerScreen: React.FC<{navigation: BarCodeScrannerScreenNavigationProp}> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const [barcode, setBarcode] = useState('');

  const {data} = useSearchOFFMealBC(barcode);

  useEffect(() => {
    if (data) {
      navigation.navigate('AddMeal', {meal: data});
    } else {
      Alert.alert('Aliment inconnu', "oups, j'ai pas trouvé");
    }
  }, [data, navigation]);

  return (
    <Box flex={1} bg={'$background'} style={{paddingBottom: insets.bottom}}>
      <BaseHeader title="Scannez un produit" leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      <Box flex={1} p={'m'}>
        <Camera
          style={{flex: 1}}
          ref={cameraRef}
          cameraType={CameraType.Back}
          flashMode="auto"
          scanBarcode={true}
          onReadCode={event => setBarcode(event.nativeEvent.codeStringValue)}
        />
      </Box>
    </Box>
  );
};

export default BarCodeScannerScreen;
