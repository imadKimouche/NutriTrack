import {createText} from '@shopify/restyle';
import {Theme} from '../style/theme';

const Text = createText<Theme>();

export type TextProps = React.ComponentProps<typeof Text>;

export default Text;
