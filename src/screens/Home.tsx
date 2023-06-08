import React from 'react';
import {signOut} from '../hooks/auth';
import Button from '../components/Button';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {RootStackParamList} from '../navigation/MainNavigator';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = ({
  navigation,
  route,
}: {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}) => {
  async function logout() {
    await signOut();
  }

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text>Home</Text>
      <Text>{route.params?.userSetup.goal}</Text>
      <Button label="Se déco" onPress={logout} />
    </Box>
  );
};

export default HomeScreen;
