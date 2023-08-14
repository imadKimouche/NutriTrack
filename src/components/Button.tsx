import {createRestyleComponent, createVariant, VariantProps} from '@shopify/restyle';
import React from 'react';
import Pressable, {PressableProps} from '../atoms/Pressable';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {FIconProps as IconPropsBase} from '../components/FIcon';
import {Theme} from '../style/theme';
import FIcon from './FIcon';
import BrandIcon from './BrandIcon';
import Loader from './Loader';

type PropsBase = PressableProps & VariantProps<Theme, 'buttonVariants'>;
const ButtonBase = createRestyleComponent<PropsBase, Theme>([createVariant({themeKey: 'buttonVariants'})], Pressable);

type TextProps = Omit<TextPropsBase, 'variant'>;
const ButtonTextBase = createRestyleComponent<TextProps & VariantProps<Theme, 'buttonTextVariants'>, Theme>(
  [createVariant({themeKey: 'buttonTextVariants'})],
  Text,
);

type IconProps = Omit<IconPropsBase, 'variant'>;
const ButtonFIconBase = createRestyleComponent<IconProps & VariantProps<Theme, 'buttonIconVariants'>, Theme>(
  [createVariant({themeKey: 'buttonIconVariants'})],
  FIcon,
);
const ButtonFaIconBase = createRestyleComponent<IconProps & VariantProps<Theme, 'buttonIconVariants'>, Theme>(
  [createVariant({themeKey: 'buttonIconVariants'})],
  BrandIcon,
);

// svgIcon?: React.FC<SvgProps>;
type ButtonProps = {label: string; icon?: string; loading?: boolean};

const Button = ({label, variant, icon, loading, ...rest}: PropsBase & ButtonProps) => {
  const Icon = icon ? (
    icon.startsWith('b-') ? (
      <ButtonFaIconBase variant={variant} name={icon.substring(2)} />
    ) : (
      <ButtonFIconBase variant={variant} name={icon} />
    )
  ) : undefined;

  return (
    <ButtonBase variant={variant} disabled={loading} {...rest}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {Icon}
          <ButtonTextBase variant={variant}>{label}</ButtonTextBase>
        </>
      )}
    </ButtonBase>
  );
};

export default Button;
