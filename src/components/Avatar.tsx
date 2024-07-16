import React from 'react';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';

type AvatarProps = {
  label: string;
  onPress?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({label, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      bg={'$primary'}
      width={40}
      height={40}
      borderRadius={'hg'}
      borderWidth={1}
      borderColor={'$divider'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Text variant={'link-x-small'} textAlign={'center'} color={'$buttonTextPrimary'}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Avatar;
