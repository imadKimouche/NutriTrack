import {
  createRestyleComponent,
  backgroundColor,
  backgroundColorShorthand,
  border,
  spacing,
  layout,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import {Theme} from '../style/theme';
import {
  Picker as NativePicker,
  PickerItemProps as NativePickerItemProps,
  PickerProps as NativePickerProps,
} from '@react-native-picker/picker';
import Box, {BoxProps} from '../atoms/Box';
import Text, {TextProps} from '../atoms/Text';
import {hex2rgba} from '../utils';

type PropsBase = NativePickerProps & BoxProps;

const PickerBase = createRestyleComponent<PropsBase, Theme>(
  [layout, backgroundColor, backgroundColorShorthand, border, spacing],
  NativePicker,
);

const Item = createRestyleComponent<TextProps & NativePickerItemProps, Theme>([], NativePicker.Item);

export type PickerProps = PropsBase & {
  containerStyle?: BoxProps;
  placeholder?: string;
};

const Picker = ({placeholder, children, containerStyle, ...rest}: PickerProps) => {
  const {colors, textVariants} = useTheme<Theme>();

  return (
    <Box {...containerStyle}>
      {placeholder && (
        <Text variant={'text-x-small'} color={'$label'}>
          {placeholder}
        </Text>
      )}
      <PickerBase
        itemStyle={{height: 50, margin: 0, padding: 0, color: colors.$header, ...textVariants['text-small']}}
        selectionColor={hex2rgba(colors.$input, 0.4)}
        {...rest}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === NativePicker.Item) {
            const childProps = child.props;
            return <Item style={{margin: 0, padding: 0}} {...childProps} />;
          }
          return child;
        })}
      </PickerBase>
    </Box>
  );
};

Picker.Item = Item;

export default Picker;
