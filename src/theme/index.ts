// Theme configuration for Kai Prevention App

export const colors = {
  primary: '#4FD1C5',
  primaryDark: '#3EAFA5',
  secondary: '#FF8C42',
  text: '#FFFFFF',
  textSecondary: '#FFFFFFCC',
  background: '#FFFFFF',
  inputBackground: '#FFFFFF33',
  border: '#FFFFFF33',
  success: '#00C853',
  error: '#FF5252',
  warning: '#FFD600',
  gray: {
    light: '#F5F5F5',
    medium: '#E0E0E0',
    dark: '#9E9E9E',
  },
  gradient: {
    start: '#54985F',
    middle: '#BAA35B',
    end: '#FF7342'
  },
  button: {
    start: '#88D498',
    end: '#F8A978'
  }
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  fontWeights: {
    normal: 'normal',
    medium: '500',
    semibold: '600',
    bold: 'bold',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
}; 