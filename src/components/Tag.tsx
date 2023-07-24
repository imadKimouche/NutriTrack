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
      borderColor={'$tagBorderOutline'}
      p={'s'}
      m={'xs'}
      flexDirection={'row'}
      alignItems={'center'}
      bg={type === 'normal' ? '$tagBackgroundNormal' : '$tagBackgroundOutlined'}>
      {leftIcon && (
        <Pressable onPress={onLeftIconPress} mr={'s'}>
          <Icon name={leftIcon} color={type === 'normal' ? '$tagTextNormal' : '$tagTextOutlined'} size={16} />
        </Pressable>
      )}
      <Text
        variant={'body2'}
        color={type === 'normal' ? '$tagTextNormal' : '$tagTextOutlined'}
        ellipsizeMode={'tail'}
        numberOfLines={1}>
        {label}
      </Text>
      {rightIcon && (
        <Pressable onPress={onRightIconPress} ml={'s'}>
          <Icon name={rightIcon} color={type === 'normal' ? '$tagTextNormal' : '$tagTextOutlined'} size={16} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default Tag;
