import React, {ReactNode} from 'react';
import {VariantProps, createVariant, createRestyleComponent, ResponsiveValue} from '@shopify/restyle';
import Pressable, {PressableProps as PressablePropsBase} from '../atoms/Pressable';
import Box from '../atoms/Box';
import Text, {TextProps as TextPropsBase} from '../atoms/Text';
import {Theme} from '../style/theme';

type TextProps = Omit<TextPropsBase, 'variant'>;
const ListItemTitle = createRestyleComponent<TextProps & VariantProps<Theme, 'listItemTitleVariants'>, Theme>(
  [createVariant({themeKey: 'listItemTitleVariants'})],
  Text,
);

const ListItemSubtitle = createRestyleComponent<TextProps & VariantProps<Theme, 'listItemSubtitleVariants'>, Theme>(
  [createVariant({themeKey: 'listItemSubtitleVariants'})],
  Text,
);

const ListItemContainer = createRestyleComponent<PressablePropsBase & VariantProps<Theme, 'listItemVariants'>, Theme>(
  [createVariant({themeKey: 'listItemVariants'})],
  Pressable,
);

type Variant = Exclude<keyof Theme['listItemVariants'], 'defaults'>;
type ListItemProps = {
  onPress?: () => void;
  leftComponent?: ReactNode;
  title: string;
  subtitle?: string;
  rightComponent?: ReactNode;
  variant?: ResponsiveValue<Variant, {phone: number; tablet: number}>;
};

const ListItem = ({onPress, leftComponent, rightComponent, title, subtitle, ...rest}: ListItemProps) => {
  return (
    <ListItemContainer flexDirection={'row'} minHeight={55} variant={rest.variant} onPress={onPress}>
      {leftComponent && (
        <Box flex={0.15} justifyContent={'center'} alignItems={'center'}>
          {leftComponent}
        </Box>
      )}
      <Box flex={1} justifyContent={'center'}>
        <ListItemTitle variant={rest.variant}>{title}</ListItemTitle>
        {subtitle && <ListItemSubtitle variant={rest.variant}>{subtitle}</ListItemSubtitle>}
      </Box>
      {rightComponent && (
        <Box flex={0.15} justifyContent={'center'} alignItems={'center'}>
          {rightComponent}
        </Box>
      )}
    </ListItemContainer>
  );
};

export default ListItem;
