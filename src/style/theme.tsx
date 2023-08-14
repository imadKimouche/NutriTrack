import {createTheme} from '@shopify/restyle';
import {buttonIconVariants, buttonTextVariants, buttonVariants} from './button';
import {elevationVariants} from './elevation';
import {textVariants} from './text';

const p = {
  orange: '#F68F25',
  orange100: '#FFEDE3',
  orange200: '#FEC8AB',
  orange300: '#FEA472',
  orange400: '#FD7F3A',
  orange500: '#F35702',
  orange600: '#C54602',
  orange700: '#8C3201',
  orange800: '#541E01',
  orange900: '#1C0A00',
  green: '#00B9AE',
  green100: '#E3FFFD',
  green200: '#AAFFFA',
  green300: '#71FFF7',
  green400: '#39FFF3',
  green500: '#00B9AE',
  green600: '#00A69C',
  green700: '#008E85',
  green800: '#005550',
  green900: '#001C1B',
  yellow: '#FFBC0A',
  yellow100: '#FFF7E3',
  yellow200: '#FFE8AA',
  yellow300: '#FFD871',
  yellow400: '#FFC939',
  yellow500: '#FFBC0A',
  yellow600: '#C69000',
  yellow700: '#8E6700',
  yellow800: '#553E00',
  yellow900: '#1C1500',
  blue: '#1098F7',
  blue100: '#E4F3FE',
  blue200: '#ADDCFC',
  blue300: '#76C4FA',
  blue400: '#3FACF9',
  blue500: '#1098F7',
  blue600: '#0674C0',
  blue700: '#055389',
  blue800: '#033252',
  blue900: '#01111B',
  red: '#FF647C',
  red100: '#FCE5F0',
  red200: '#F7B2D1',
  red300: '#F27EB2',
  red400: '#ED4B93',
  red500: '#DB166E',
  red600: '#B4125B',
  red700: '#810D41',
  red800: '#4D0827',
  red900: '#1A030D',
  grey: '#8C8783',
  grey100: '#E3E3E3',
  grey200: '#D0CBC8',
  grey300: '#CAC5C2',
  grey400: '#A6A2A0',
  grey500: '#8C8783',
  grey600: '#746D6A',
  grey700: '#443A34',
  grey800: '#29201B',
  grey900: '#1E1511',
  black: '#121212',
  black100: '#E6E6E6',
  black200: '#CCCCCC',
  black300: '#B3B3B3',
  black400: '#999999',
  black500: '#666666',
  black600: '#666666',
  black700: '#4D4D4D',
  black800: '#333333',
  black900: '#A1A1A1',
  black8P: 'rgba(102, 102, 102, 0.08)',
  black16P: 'rgba(102, 102, 102, 0.16)',
  black24P: 'rgba(102, 102, 102, 0.24)',
  black32P: 'rgba(102, 102, 102, 0.32)',
  black40P: 'rgba(102, 102, 102, 0.4)',
  black48P: 'rgba(102, 102, 102, 0.48)',
  white: '#FFFFFF',
  white8P: 'rgba(255, 255, 255, 0.08)',
  white16P: 'rgba(255, 255, 255, 0.16)',
  white24P: 'rgba(255, 255, 255, 0.24)',
  white32P: 'rgba(255, 255, 255, 0.32)',
  white40P: 'rgba(255, 255, 255, 0.4)',
  white48P: 'rgba(255, 255, 255, 0.48)',
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    $primary: p.orange,
    $primaryWeak: p.orange300,
    $primaryBg: p.orange100,
    $primaryBgStrong: p.orange200,

    $bg: p.white,
    $bgWeak: p.grey100,
    $input: p.grey200,
    $line: p.grey300,
    $placehold: p.grey400,
    $label: p.grey500,
    $body: p.grey600,
    $header: p.grey700,

    $secondary: p.blue,
    $secondaryWeak: p.blue300,
    $secondaryBg: p.blue100,
    $secondaryBgStrong: p.blue200,

    $success: p.green,
    $successWeak: p.green300,
    $successBg: p.green100,
    $successBgStrong: p.green200,

    $warning: p.yellow,
    $warningWeak: p.yellow300,
    $warningBg: p.yellow100,
    $warningBgStrong: p.yellow200,

    $danger: p.red,
    $dangerWeak: p.red300,
    $dangerBg: p.red100,
    $dangerBgStrong: p.red200,

    $transparent: 'transparent',

    //----Background
    $screenBackground: p.grey100,
    $modalBackground: p.orange100,
    $cardBackground: p.white,
    //----Text
    $textHeading: p.grey,
    $textBody: p.grey800,
    $textLabel: p.orange600,
    $textPlaceholder: p.orange300,
    //----Button
    $buttonTextPrimary: p.white,
    $buttonBgPrimary: p.orange,
    $buttonBorderPrimary: p.orange,
    $buttonTextPrimaryDisabled: p.grey700,
    $buttonBgPrimaryDisabled: p.black100,
    $buttonBorderPrimaryDisabled: p.orange,
    $buttonTextOutline: p.orange,
    $buttonBgOutline: p.white,
    $buttonBorderOutline: p.orange,
    $buttonTextOutlineDisabled: p.grey700,
    $buttonBgOutlineDisabled: p.black100,
    $buttonBorderOutlineDisabled: p.orange,
    //----Icon
    $iconRegular: p.grey,
    $iconActive: p.orange,
    $iconDisabled: p.grey300,
    //----Divider
    $divider: p.grey200,
    //----Status
    $error: p.red,
    $info: p.blue,
    //----TextInput
    $inputText: p.black,
    $inputBg: p.white,
    $inputPlaceholder: p.grey300,
    $inputBorder: p.black300,
    //----Clickable
    $link: p.orange,
    //----Navigation
    $navbarBg: p.grey100,
    $navbarText: p.orange,
    $tabbarBg: p.grey100,
    $tabbarText: p.orange,
    //----Shadow
    $buttonShadow: p.grey400,
    $cardShadow: p.grey700,
    $modalShadow: p.grey700,
  },
  borderRadii: {
    xs: 4,
    sm: 16,
    md: 24,
    lg: 64,
    hg: 128,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  buttonVariants: buttonVariants,
  buttonTextVariants: buttonTextVariants,
  buttonIconVariants: buttonIconVariants,
  textVariants: {
    ...textVariants,
  },
  cardVariants: {
    defaults: {
      backgroundColor: '$cardBackground',
      shadowColor: '$cardShadow',
      shadowOffset: {
        width: 0,
        height: 24,
      },
      shadowOpacity: 1,
      shadowRadius: 32,
      elevation: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 64,
      minWidth: 64,
      borderRadius: 'xs',
    },
    active: {
      backgroundColor: '$primary',
    },
  },
  inputVariants: {
    defaults: {
      color: '$inputText',
    },
    focused: {
      color: '$inputText',
    },
    error: {
      color: '$error',
    },
    success: {
      color: '$success',
    },
  },
  iconVariants: {
    defaults: {
      color: '$iconActive',
    },
    input: {
      color: '$iconActive',
    },
  },
  listItemVariants: {
    defaults: {
      backgroundColor: '$cardBackground',
      padding: {phone: 's'},
      borderBottomWidth: 1,
      borderBottomColor: '$divider',
      borderRadius: 'xs',
    },
    active: {
      borderBottomColor: '$primary',
    },
  },
  listItemTitleVariants: {
    defaults: {
      backgroundColor: '$cardBackground',
      color: '$textBody',
      padding: {phone: 'xs'},
      textTransform: 'capitalize',
      ...textVariants.subtitle1,
    },
    active: {
      color: '$primary',
    },
  },
  listItemSubtitleVariants: {
    defaults: {
      backgroundColor: '$cardBackground',
      paddingLeft: {phone: 's'},
      color: '$textPlaceholder',
      ...textVariants.subtitle2,
    },
    active: {
      color: '$textBody',
    },
  },
  elevationVariants: {
    ...elevationVariants,
  },
});

export type Theme = typeof theme;
export default theme;
