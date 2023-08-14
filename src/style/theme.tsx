import {createTheme} from '@shopify/restyle';

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

const customTextVariants = {
  defaults: {
    fontFamily: 'Poppins-Regular',
  },
  'display-huge': {
    fontSize: 32,
    lineHeight: 44,
  },
  'display-huge-bold': {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: 'bold',
  },
  'display-large': {
    fontSize: 28,
    lineHeight: 40,
  },
  'display-large-bold': {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  'display-medium': {
    fontSize: 24,
    lineHeight: 32,
  },
  'display-medium-bold': {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  'display-small': {
    fontSize: 20,
    lineHeight: 32,
  },
  'display-small-bold': {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  'text-large': {
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0.75,
  },
  'text-large-tight': {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.75,
  },
  'text-medium': {
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: 0.75,
  },
  'text-medium-tight': {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.75,
  },
  'text-small': {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.75,
  },
  'text-small-tight': {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.75,
  },
  'text-x-small': {
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: 400,
  },
  'text-x-small-tight': {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontWeight: 'medium',
  },
  'link-large': {
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-large-tight': {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-medium': {
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-medium-tight': {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-small': {
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-small-tight': {
    fontSize: 14,
    lineHeight: 10,
    letterSpacing: 0.75,
    fontWeight: 500,
  },
  'link-x-small': {
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontWeight: 500,
  },
  'link-x-small-tight': {
    fontSize: 13,
    lineHeight: 25,
    letterSpacing: 0.25,
    fontWeight: 500,
  },
  h1: {
    fontWeight: 300,
    fontSize: 47.78,
  },
  h2: {
    fontWeight: 300,
    fontSize: 39.81,
  },
  h3: {
    fontWeight: 400,
    fontSize: 33.18,
  },
  h4: {
    fontWeight: 400,
    fontSize: 27.65,
  },
  h5: {
    fontWeight: 400,
    fontSize: 23.04,
  },
  h6: {
    fontWeight: 500,
    fontSize: 19.2,
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: 13.33,
  },
  body1: {
    fontWeight: 400,
    fontSize: 16,
  },
  body2: {
    fontWeight: 400,
    fontSize: 13.33,
  },
  button: {
    fontWeight: 500,
    fontSize: 13.33,
  },
  caption: {
    fontWeight: 400,
    fontSize: 11.11,
  },
  overline: {
    fontWeight: 400,
    fontSize: 9.2,
  },
};

const customElevations = {
  defaults: {},
  'elevation-1': {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '$cardShadow',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  'elevation-2': {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: '$cardShadow',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  'elevation-3': {
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowColor: '$cardShadow',
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  'elevation-4': {
    shadowOffset: {
      width: 0,
      height: 35,
    },
    shadowColor: '$cardShadow',
    shadowOpacity: 0.4,
    shadowRadius: 40,
  },
  'elevation-5': {
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowColor: '$cardShadow',
    shadowOpacity: 0.4,
    shadowRadius: 60,
  },
};

const customButtonVariants = {
  defaults: {
    backgroundColor: '$primary',
    borderRadius: 'sm',
    paddingHorizontal: 's',
    paddingVertical: 'm',
    flexDirection: 'row',
    alignItems: 'center',
    width: 129,
    height: 72,
    justifyContent: 'center',
  },
  'primary-huge': {},
  'primary-huge-disabled': {
    opacity: 0.5,
  },
  'primary-huge-left': {},
  'primary-huge-left-disabled': {
    opacity: 0.5,
  },
  'primary-huge-right': {},
  'primary-huge-right-disabled': {
    opacity: 0.5,
  },
  'primary-huge-no-icon': {},
  'primary-huge-no-icon-disabled': {
    opacity: 0.5,
  },
};

const customButtonTextVariants = {
  defaults: {
    color: '$buttonTextPrimary',
    ...customTextVariants['link-medium'],
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  'primary-huge': {},
  'primary-huge-disabled': {
    opacity: 0.5,
  },
  'primary-huge-left': {},
  'primary-huge-left-disabled': {},
  'primary-huge-right': {},
  'primary-huge-right-disabled': {},
  'primary-huge-no-icon': {},
  'primary-huge-no-icon-disabled': {},
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
    $success: p.green,
    $warning: p.yellow,
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
  buttonVariants: {
    ...customButtonVariants,
    primary: {},
    outlined: {},
    disabled: {},
  },
  buttonTextVariants: {
    ...customButtonTextVariants,
    primary: {},
    outlined: {},
    disabled: {},
  },
  loaderButtonVariants: {
    defaults: {
      color: '$iconActive',
    },
    primary: {
      color: '$iconActive',
    },
    outlined: {
      backgroundColor: '$iconRegular',
    },
  },
  textVariants: {
    ...customTextVariants,
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
      ...customTextVariants.subtitle1,
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
      ...customTextVariants.subtitle2,
    },
    active: {
      color: '$textBody',
    },
  },
  elevationVariants: {
    ...customElevations,
  },
});

export type Theme = typeof theme;
export default theme;
