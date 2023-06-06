import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
} from '@shopify/restyle';
import {
  Image as NativeImage,
  ImageProps as NativeImageProps,
} from 'react-native-svg';
import {Theme} from '../style/theme';

type PropsBase = NativeImageProps & BackgroundColorProps<Theme>;

const Image = createRestyleComponent<PropsBase, Theme>(
  [backgroundColor],
  NativeImage,
);

export default Image;
