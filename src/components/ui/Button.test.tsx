import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    expect(() => render(<Button title="Test Button" onPress={() => {}} />)).not.toThrow();
  });
}); 