import {BottomSheetTextInputProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import {BottomSheetTextInput as BottomSheetTextInputNative} from '@gorhom/bottom-sheet';
import {
  backgroundColor,
  BackgroundColorProps,
  backgroundColorShorthand,
  BackgroundColorShorthandProps,
  border,
  BorderProps,
  color,
  ColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from '@shopify/restyle';
import React from 'react';
import {Theme} from '../style/theme';

type PropsBase = BottomSheetTextInputProps &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme>;

const BottomSheetTextInputBase = createRestyleComponent<PropsBase, Theme>(
  [layout, backgroundColor, backgroundColorShorthand, border, color, spacing],
  BottomSheetTextInputNative,
);

const BottomSheetTextInput = (props: PropsBase) => {
  return (
    <BottomSheetTextInputBase
      paddingHorizontal={'m'}
      height={52}
      justifyContent={'space-around'}
      alignItems={'center'}
      flexDirection={'row'}
      borderWidth={1}
      borderColor={'$textInputBorderColor'}
      borderRadius={'sm'}
      {...props}
    />
  );
};

export default BottomSheetTextInput;
