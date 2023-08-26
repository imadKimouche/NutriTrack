import React from 'react';
import Input, {InputProps} from '../atoms/Input';
import {NativeSyntheticEvent, Platform, TextInputFocusEventData} from 'react-native';
import Box, {BoxProps} from '../atoms/Box';
import FIcon, {FIconProps} from '../components/FIcon';
import {createRestyleComponent, createVariant, VariantProps} from '@shopify/restyle';
import theme, {Theme} from '../style/theme';
import {TextProps} from '../atoms/Text';

type TIContainerProps = BoxProps & VariantProps<Theme, 'tiContainerVariants'>;
const TIContainer = createRestyleComponent<TIContainerProps, Theme>([createVariant({themeKey: 'tiContainerVariants'})], Box);

type TIIconProps = Omit<FIconProps, 'variant'> & VariantProps<Theme, 'tiIconVariants'>;
const TIIcon = createRestyleComponent<TIIconProps, Theme>([createVariant({themeKey: 'tiIconVariants'})], FIcon);

type TIHintProps = Omit<TextProps, 'variant'> & VariantProps<Theme, 'tiHintVariants'>;
const TIHint = createRestyleComponent<TIHintProps, Theme>([createVariant({themeKey: 'tiHintVariants'})], FIcon);

export type TextInputProps = TIContainerProps & {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  icon?: string;
  hint?: string;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  inputPropPresets?: keyof typeof defaultInputProps;
  containerStyle?: BoxProps;
  clearMode?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  variant,
  icon,
  inputPropPresets,
  value,
  placeholder,
  onChangeText,
  onBlur,
  onFocus,
  onSubmitEditing,
  hint,
  containerStyle,
  returnKeyType,
  clearMode,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const presetProps = inputPropPresets ? defaultInputProps[inputPropPresets] : {};

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <Box {...containerStyle}>
      <TIContainer variant={isFocused ? 'selected' : variant} {...rest}>
        {icon && <TIIcon name={icon} variant={isFocused ? 'selected' : variant} />}
        <Input
          variant={isFocused ? 'selected' : variant}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.$placehold}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onSubmitEditing={onSubmitEditing}
          editable={variant !== 'disabled'}
          returnKeyType={returnKeyType}
          {...presetProps}
        />
        {clearMode && value && value.length !== 0 && (
          <FIcon name="x-circle" color={'$label'} size={14} onPress={() => onChangeText && onChangeText('')} />
        )}
      </TIContainer>
      {(variant === 'caption' || variant === 'success' || variant === 'error') && hint && (
        <TIHint variant={variant}>{hint}</TIHint>
      )}
    </Box>
  );
};

const defaultInputProps: {[id: string]: Partial<InputProps>} = {
  firstName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    autoComplete: 'name-given',
    textContentType: 'givenName',
  },
  lastName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    autoComplete: 'name-family',
    textContentType: 'familyName',
  },
  businessName: {
    autoCapitalize: 'words',
    autoCorrect: false,
    textContentType: 'organizationName',
  },
  password: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'password',
    textContentType: 'password',
  },
  newPassword: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'password-new',
    secureTextEntry: true,
    textContentType: Platform.OS === 'ios' ? undefined : 'newPassword',
    passwordRules: 'minlength: 8; required: lower; required: upper; required: digit;',
  },
  email: {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete: 'email',
    inputMode: 'email',
    keyboardType: 'email-address',
    textContentType: 'emailAddress',
  },
  phoneNumber: {
    autoComplete: 'tel',
    inputMode: 'tel',
    keyboardType: 'phone-pad',
    textContentType: 'telephoneNumber',
  },
  positiveNumber: {
    keyboardType: 'number-pad',
  },
} as const;

export default TextInput;
