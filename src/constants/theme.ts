export const THEME = {
  COLORS: {
    primary: '#FF00FF', // Magenta/Pink accent for primary actions
    secondary: '#4A00E0', // A mystical blue/purple for secondary elements
    accent: '#8E2DE2', // A vibrant purple for highlights and accents

    background: '#0F0C29', // Deep, dark space blue/purple
    surface: '#1D193F', // A slightly lighter surface for cards and modals
    overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay for backgrounds

    textPrimary: '#E0E0E0', // Soft, light gray for primary text
    textSecondary: '#A9A9B8', // A muted gray for secondary text and placeholders

    success: '#00BFA6',
    error: '#CF6679',
    warning: '#FFB300',

    border: '#3A355B', // Border color for inputs and cards
    disabled: '#53537D',
  },
  FONTS: {
    serif: 'CormorantGaramond-Regular',
    serifBold: 'CormorantGaramond-Bold',
    serifItalic: 'CormorantGaramond-Italic',
    sans: 'Sora-Regular',
    sansBold: 'Sora-Bold',
    sansLight: 'Sora-Light',
  },
  SPACING: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  RADIUS: {
    s: 5,
    m: 10,
    l: 20,
    lg: 25,
    xl: 30,
    full: 9999,
  },
  SHADOWS: {
    light: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    dark: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};
