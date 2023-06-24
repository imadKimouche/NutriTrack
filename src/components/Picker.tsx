import {
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  color,
  ColorProps,
  spacing,
  SpacingProps,
  LayoutProps,
  layout,
} from '@shopify/restyle';
import React from 'react';
import {Theme} from '../style/theme';
import {
  Picker as NativePicker,
  PickerItemProps as NativePickerItemProps,
  PickerProps as NativePickerProps,
} from '@react-native-picker/picker';

type PropsBase = NativePickerProps &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme>;

const PickerBase = createRestyleComponent<PropsBase, Theme>(
  [layout, backgroundColor, backgroundColorShorthand, border, color, spacing],
  NativePicker,
);

const Item = createRestyleComponent<NativePickerItemProps, Theme>([], NativePicker.Item);

const Picker = ({children, ...rest}: PropsBase) => {
  return (
    <PickerBase {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === NativePicker.Item) {
          const childProps = child.props;
          return <Item {...childProps} />;
        }
        return child;
      })}
    </PickerBase>
  );
};

Picker.Item = Item;

export default Picker;
