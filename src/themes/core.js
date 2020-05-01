const colors = {
  primary100: '#d3daed',
  primary500: '#5772b9',
  primary900: '#4a67b2',
  secondary100: '#fcffc1',
  secondary500: '#cbd400',
  secondary900: '#a6ad00',
  dark100: '#525252',
  dark200: '#474747',
  dark300: '#3d3d3d',
  dark400: '#333333',
  dark500: '#292929',
  dark600: '#1f1f1f',
  dark700: '#141414',
  dark800: '#0a0a0a',
  dark900: '#000',
  light100: '#adadad',
  light200: '#b8b8b8',
  light300: '#c2c2c2',
  light400: '#cccccc',
  light500: '#d6d6d6',
  light600: '#e0e0e0',
  light700: '#ebebeb',
  light800: '#f5f5f5',
  light900: '#fff',
  danger500: '#e32249',
  white: '#fff',
  black: '#000'
}

export const coreTheme = {
  colors: {
    ...colors,
    behind: colors.light700,
    ahead: colors.light800,
    aheadRgba: 'rgba(245, 245, 245, 1)',
    aheadRgbaTransparent: 'rgba(245, 245, 245, 0)',
    shadow: colors.light100,
    border: colors.light700
  },
  fontSizes: {
    h0: 55,
    h1: 27,
    h2: 20,
    h3: 17,
    h4: 13,
    body1: 15,
    body2: 14,
    body3: 13
  },
  space: {
    xxs: 5,
    xs: 10,
    sm: 12,
    md: 15,
    lg: 20,
    xl: 25,
    xxl: 30
  },
  borderWidths: {
    sm: '1px'
  },
  radii: {
    sm: 3,
    md: 6,
    xl: 20
  },
  switch: {
    thumb: colors.light900
  }
}
