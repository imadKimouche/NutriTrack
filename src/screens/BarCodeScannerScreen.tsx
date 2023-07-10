import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import OnReadCodeData, {Camera, CameraType} from 'react-native-camera-kit';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import BaseHeader, {GoBackButton} from '../components/Header';
import {useSearchOFFMealBC} from '../hooks/meal';
import {HomeStackParamList} from './HomeStackNavigator';
import LoadingModal from '../components/LoadingModal';
import Text from '../atoms/Text';

type BarCodeScrannerScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BarCodeScanner'>;
const BarCodeScannerScreen: React.FC<{navigation: BarCodeScrannerScreenNavigationProp}> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const [barcode, setBarcode] = useState('');

  const {data, isLoading, isError, error} = useSearchOFFMealBC(barcode);

  const onBarcodeRead = (event: typeof OnReadCodeData) => {
    setBarcode(event.nativeEvent.codeStringValue);
  };

  useEffect(() => {
    if (data) {
      navigation.navigate('AddMeal', {meal: data});
    }
  }, [data, navigation]);

  return (
    <Box flex={1} bg={'$background'} style={{paddingBottom: insets.bottom}}>
      <BaseHeader title="Scannez un produit" leftComponent={<GoBackButton onPress={() => navigation.goBack()} />} />
      <Box flex={1} p={'m'}>
        {isLoading && <LoadingModal label="Un instant..." />}
        <Camera
          style={{flex: 1}}
          ref={cameraRef}
          cameraType={CameraType.Back}
          flashMode="auto"
          scanBarcode={true}
          onReadCode={onBarcodeRead}
        />
      </Box>
      {isError && (
        <Text variant={'caption'} color={'$error'}>
          {JSON.stringify(error)}
        </Text>
      )}
    </Box>
  );
};

export default BarCodeScannerScreen;
