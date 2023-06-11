import {createTheme} from '@shopify/restyle';

const p = {
  orange: '#DE6B48',
  orange400: '#DE9A85',
  orange16P: 'rgba(222, 107, 72, 0.16)',
  green: '#18F0B7',
  red: '#FF647C',
  red16P: 'rgba(255, 100, 124, 0.16)',
  black: '#121212',
  black100: '#E6E6E6',
  black200: '#CCCCCC',
  black300: '#B3B3B3',
  black800: '#333333',
  black900: '#A1A1A1',
  black24P: 'rgba(102, 102, 102, 0.24)',
  black40P: 'rgba(102, 102, 102, 0.4)',
  black80P: 'rgba(102, 102, 102, 0.8)',
  white: '#FFFFFF',
  white1: '#f0f0f0',
  white2: '#E7E7E7',
  grey: '#666666',
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    white: p.white,
    black: p.black,
    red: p.red,
    transparent: p.transparent,
    // blue: p.blue,
    // yellow: p.yellow,
    //
    $primary: p.orange,
    $windowBackground: p.white,
    $background: p.white,
    $slideTabBackground: p.black100,
    $foreground: p.black,
    $textInputBackground: p.white,
    $textInputBorderColor: p.black24P,
    $textInputColor: p.black100,
    $labelSmall: p.black80P,
    $inputFocusColor: p.black,
    $textError: p.red,
    $listItemDivider: p.black100,
    $iconColor: p.black900,
    $buttonTextPrimary: p.white,
    $headerButtonBackground: p.orange400,
    $headerButtonBorder: p.black24P,
    $tabBarBackground: p.black800,
    $tabBarInactiveTint: p.black300,
    $buttonLoaderPrimary: p.white,
    $error: p.red,
    $logoutIconBackground: p.red16P,
    $logoutIcon: p.red,
    // $navbarBackground: p.paper10,
    // $navbarBorderBottom: p.paper100,
    // $sidebarBackground: p.navy20,
    // $sidebarForeground: p.navy900,
    // $sidebarSeparator: p.paper00 + '20',
    // $headerBarBackground: p.paper20,
    // $fieldInputBackground: p.paper00,
    // $fieldInputPlaceholderTextColor: p.paper300,
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
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  buttonVariants: {
    defaults: {
      backgroundColor: '$primary',
      borderRadius: 'md',
    },
    primary: {
      backgroundColor: '$primary',
    },
    outlined: {
      backgroundColor: '$background',
      borderColor: '$primary',
      borderStyle: 'solid',
      borderWidth: 1,
    },
    // link: {},
  },
  textButtonVariants: {
    defaults: {
      backgroundColor: '$primary',
    },
    primary: {
      color: '$buttonTextPrimary',
      fontSize: 16,
    },
    outlined: {
      backgroundColor: '$background',
    },
  },
  loaderButtonVariants: {
    defaults: {
      color: '$buttonLoaderPrimary',
    },
    primary: {
      color: '$buttonLoaderPrimary',
    },
    outlined: {
      backgroundColor: '$primary',
    },
  },
  textVariants: {
    h1: {
      fontWeight: 'bold',
      fontSize: 57.33,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 47.78,
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 39.81,
    },
    h4: {
      fontWeight: 'bold',
      fontSize: 33.18,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 27.65,
    },
    h6: {
      fontWeight: 'bold',
      fontSize: 23.04,
    },
    bodyRegular: {
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 13.33,
      lineHeight: 24,
    },
    bodyLarge: {
      fontSize: 19.2,
      lineHeight: 24,
    },
    labelSmall: {
      fontSize: 13.33,
      color: '$labelSmall',
    },
    errorSmall: {
      fontSize: 13.33,
      color: '$error',
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    defaults: {},
  },
  cardVariants: {
    defaults: {},
    elevated: {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    },
  },
  inputVariants: {
    defaults: {
      color: p.orange,
    },
    focused: {
      color: '$inputFocusColor',
    },
    error: {
      color: p.red,
    },
    success: {
      color: p.green,
    },
  },
  iconVariants: {
    defaults: {
      color: p.black,
    },
    input: {
      color: p.grey,
    },
  },
});

export type Theme = typeof theme;
export default theme;
