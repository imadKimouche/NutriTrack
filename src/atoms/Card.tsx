import {
  createRestyleComponent,
  createVariant,
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
  spacing,
  VariantProps,
  spacingShorthand,
} from '@shopify/restyle';
import {Theme} from '../style/theme';
import {BoxProps} from './Box';

export type CardProps = BoxProps &
  VariantProps<Theme, 'cardVariants'> & {
    onPress?: () => void;
  };

const Card = createRestyleComponent<CardProps, Theme>([
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
  spacingShorthand,
  spacing,
  createVariant({themeKey: 'cardVariants'}),
]);

export default Card;
