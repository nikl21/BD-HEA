import {extendTheme} from 'native-base';

export const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        borderRadius: 0,
        marginTop: 0,
        paddingTop: 0,
      },
    },
  },
  colors: {
    // Add new color
    transparent: 'rgba(0,0,0,0)',
    // Example colors:
    white: '#ffffff',
    text: '#212529',
    nooraRed: '#E14032',
    success: '#28a745',
    error: '#dc3545',
    appColor: '#FAAF1B',
    black: 'black',
    backgroundColor: '#F4F4F5',
    containerBorder: '#E7E7EA',
    pickerBorder: '#A4A9AD',
    secondaryColor: '#EA5F65',
    coursesColor: '#4CB25B',
    feebackgroundColor: '#5AC6CC',
    gray: '#E6E6E6',
    inputGray: '#F3F2F1',
    primary: {
      100: '#FEF5D1',
      200: '#FEE9A3',
      300: '#FDD975',
      400: '#FBC953',
      500: '#FAAF1B',
      600: '#D78E13',
      700: '#B3700D',
      800: '#905508',
      900: '#774105',
    },

    button: {
      100: '#FDFDFD',
      200: '#FCFCFC',
      300: '#F7F7F7',
      400: '#F0F0F0',
      500: '#F4F4F5',
      600: '#dedddd',
      700: '#cbc8c8',
      800: '#a5a2a2',
      900: '#828080',
    },
  },
  fontConfig: {
    Assistant: {
      100: {
        normal: 'Assistant-Light',
      },
      200: {
        normal: 'Assistant-Light',
      },
      300: {
        normal: 'Assistant-Light',
      },
      400: {
        normal: 'Assistant-Regular',
      },
      600: {
        normal: 'Assistant-SemiBold',
      },
      700: {
        normal: 'Assistant-Bold',
      },
      800: {
        normal: 'Assistant-ExtraBold',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Assistant',
    body: 'Assistant',
    mono: 'Assistant',
  },
});
