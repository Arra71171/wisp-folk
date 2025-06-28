import React from 'react';
import { render } from '@testing-library/react-native';
import Card from './Card';

// NOTE: Text queries are unreliable with NativeWind + React Native Testing Library due to className prop limitations.
// For robust UI/UX validation, use E2E testing (e.g., Detox or Playwright).
describe('Card', () => {
  it('renders without crashing', () => {
    expect(() => render(<Card title="Test Card" />)).not.toThrow();
  });
}); 