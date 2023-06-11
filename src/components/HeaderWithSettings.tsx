import React, {useMemo} from 'react';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import {useAuth} from '../hooks/auth';
import useNotificationBadge from '../hooks/notificationBadge';
import Pressable from '../atoms/Pressable';

function extractInitials(email?: string | null) {
  if (email == null || email === undefined) {
    return 'N/A';
  }
  const emailParts = email.split('@');
  const username = emailParts[0];
  const nameParts = username.split('.');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase());
  return initials.join('');
}

const HEADER_TITLES = {
  Home: 'Suivi journalier',
  Recipes: 'Recettes',
};

const HeaderWithSettings: React.FC<BottomTabHeaderProps> = ({navigation, route, options}) => {
  const insets = useSafeAreaInsets();
  const {user} = useAuth();
  const {showBadge} = useNotificationBadge();
  const initials = useMemo(() => {
    return extractInitials(user?.email);
  }, [user?.email]);

  function openSettings() {
    navigation.navigate('Settings');
  }

  return (
    <Box
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={'l'}
      alignItems={'center'}
      style={{
        paddingTop: insets.top,
      }}>
      <Box>
        <Text variant={'h6'}>{route && HEADER_TITLES[route.name]}</Text>
      </Box>
      <Pressable
        onPress={openSettings}
        width={40}
        height={40}
        borderRadius={'lg'}
        alignItems={'center'}
        justifyContent={'center'}
        borderColor={'$headerButtonBorder'}
        borderStyle={'solid'}
        borderWidth={1}
        bg={'$headerButtonBackground'}>
        <Text variant={'bodyLarge'} color={'$buttonTextPrimary'}>
          {initials}
        </Text>
        {showBadge && (
          <Box bg={'$primary'} width={16} height={16} borderRadius={'md'} position={'absolute'} top={-5} right={0} zIndex={1} />
        )}
      </Pressable>
    </Box>
  );
};

export default HeaderWithSettings;
