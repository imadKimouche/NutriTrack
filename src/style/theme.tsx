import {createTheme} from '@shopify/restyle';

const palette = {
  orange: '#DE6B48',
  green: '#18F0B7',
  red: '#FF647C',

  black: '#121212',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.orange,
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
      color: palette.orange,
    },
    error: {
      color: palette.red,
    },
    success: {
      color: palette.green,
    },
  },
});

export type Theme = typeof theme;
export default theme;
