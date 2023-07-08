import React from 'react';
import Pressable, {PressableProps} from './Pressable';
import {Platform} from 'react-native';
import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  opacity,
  OpacityProps,
  ResponsiveValue,
  useResponsiveProp,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import {Theme} from '../style/theme';

type RestyleProps = BackgroundColorProps<Theme> & BackgroundColorShorthandProps<Theme> & BorderProps<Theme> & OpacityProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  backgroundColorShorthand,
  backgroundColor,
  border,
  opacity,
]);

export interface TouchableOpacityProps extends PressableProps {
  pressed?: RestyleProps;
  rippleColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
  rippleBorderless?: boolean;
}

const Touchable = ({pressed, rippleColor, rippleBorderless, style, ...rest}: TouchableOpacityProps) => {
  const {style: pressedStyle} = pressed ? useRestyle(restyleFunctions, pressed) : {style: undefined};
  const theme = useTheme<Theme>();
  const rippleColorProp = rippleColor && useResponsiveProp(rippleColor);
  const rippleColorValue = rippleColorProp && theme.colors[rippleColorProp];

  return (
    <Pressable
      {...rest}
      android_ripple={{color: rippleColorValue, borderless: rippleBorderless}}
      // @ts-ignore
      style={({pressed: isPressed}) => (isPressed ? [style, pressedStyle] : style)}
    />
  );
};

export const TouchableOpacity: React.FC<TouchableOpacityProps> = props => (
  <Touchable rippleColor="$foreground" {...props} pressed={{opacity: Platform.select({ios: 0.6})}} />
);

export default Touchable;
