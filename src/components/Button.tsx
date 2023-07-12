import {createRestyleComponent, createVariant, VariantProps} from '@shopify/restyle';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import Pressable, {PressableProps} from '../atoms/Pressable';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {Theme} from '../style/theme';
import Icon from './Icon';
import Loader from './Loader';

type PropsBase = PressableProps & VariantProps<Theme, 'buttonVariants'>;

const ButtonBase = createRestyleComponent<PropsBase, Theme>([createVariant({themeKey: 'buttonVariants'})], Pressable);

type TextProps = Omit<TextPropsBase, 'variant'>;

const ButtonTextBase = createRestyleComponent<TextProps & VariantProps<Theme, 'textButtonVariants'>, Theme>(
  [createVariant({themeKey: 'textButtonVariants'})],
  Text,
);

type ButtonProps = {label: string; icon?: string | React.FC<SvgProps>; loading?: boolean};

const Button = ({label, variant, icon, loading, ...rest}: PropsBase & ButtonProps) => {
  let IconComponent;

  if (icon) {
    if (typeof icon === 'string') {
      IconComponent = <Icon name={icon} color={'$background'} size={18} />;
    } else {
      IconComponent = icon;
    }
  }

  return (
    <ButtonBase
      variant={variant}
      width={320}
      paddingHorizontal={'m'}
      height={52}
      justifyContent={'space-around'}
      alignItems={'center'}
      flexDirection={'row'}
      disabled={loading}
      {...rest}>
      {loading ? <Loader color={'$buttonLoaderPrimary'} /> : <ButtonTextBase variant={variant}>{label}</ButtonTextBase>}
      {IconComponent !== undefined && <IconComponent />}
    </ButtonBase>
  );
};

export default Button;
