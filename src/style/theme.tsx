import {createTheme} from '@shopify/restyle';

const p = {
  orange: '#DE6B48',
  green: '#18F0B7',
  red: '#FF647C',

  black: '#121212',
  white: '#FFFFFF',
  white1: '#f0f0f0',
  white2: '#E7E7E7',
  grey: '#6666663',
};

const theme = createTheme({
  colors: {
    white: p.white,
    black: p.black,
    red: p.red,
    // blue: p.blue,
    // yellow: p.yellow,
    //
    $primary: p.orange,
    $windowBackground: p.white2,
    $textInputBackground: p.white,
    $textInputBorderColor: p.grey,
    // $background: p.paper10,
    // $foreground: p.paper900,
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
    default: {
      color: p.orange,
    },
    error: {
      color: p.red,
    },
    success: {
      color: p.green,
    },
  },
});

export type Theme = typeof theme;
export default theme;
