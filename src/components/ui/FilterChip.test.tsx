import React from 'react';
import { render } from '@testing-library/react-native';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders without crashing', () => {
    expect(() => render(<FilterChip label="Test Chip" isSelected={false} onPress={() => {}} />)).not.toThrow();
  });

  it('renders selected state without crashing', () => {
    expect(() => render(<FilterChip label="Selected Chip" isSelected={true} onPress={() => {}} />)).not.toThrow();
  });
});
