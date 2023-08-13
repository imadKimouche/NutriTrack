import {createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps} from '@shopify/restyle';
import {Theme} from '../style/theme';

export type CardProps = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;
const Card = createRestyleComponent<CardProps, Theme>([spacing, createVariant({themeKey: 'cardVariants'})]);

export default Card;
