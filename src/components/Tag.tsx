import React from 'react';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import Icon from './Icon';

type TagProps = {
  label: string;
  type?: 'normal' | 'outlined';
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
};

const Tag: React.FC<TagProps> = ({
  label,
  type = 'normal',
  leftIcon,
  rightIcon,
  onPress: onPress,
  onLeftIconPress,
  onRightIconPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      borderRadius={'sm'}
      borderWidth={type === 'normal' ? undefined : 1}
      p={'s'}
      m={'xs'}
      flexDirection={'row'}
      alignItems={'center'}>
      {leftIcon && (
        <Pressable onPress={onLeftIconPress} mr={'s'}>
          <Icon name={leftIcon} size={16} />
        </Pressable>
      )}
      <Text variant={'body2'} ellipsizeMode={'tail'} numberOfLines={1}>
        {label}
      </Text>
      {rightIcon && (
        <Pressable onPress={onRightIconPress} ml={'s'}>
          <Icon name={rightIcon} size={16} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default Tag;
