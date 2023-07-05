import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import Box from '../../atoms/Box';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import {useUserFitnessData} from '../../hooks/userFitnessData';

const ProfileSettingsScreen: React.FC = () => {
  const {userFitnessData} = useUserFitnessData();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['5%', '25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Box flex={1}>
      <Pressable
        onPress={() => {}}
        flexDirection={'row'}
        justifyContent={'space-between'}
        p={'m'}
        borderBottomWidth={1}
        borderColor={'$listItemDivider'}
        bg={'$background'}>
        <Text variant={'body1'}>Taille</Text>
        <Text variant={'body2'}>{userFitnessData?.height} cm</Text>
      </Pressable>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
        <Box>
          <Text>Awesome 🎉</Text>
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default ProfileSettingsScreen;
