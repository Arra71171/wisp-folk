import React from 'react';
import { render } from '@testing-library/react-native';
import OnboardingScreen from './OnboardingScreen';

// Mock react-navigation hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('OnboardingScreen', () => {
  it('renders without crashing', () => {
    expect(() => render(<OnboardingScreen />)).not.toThrow();
  });
});
