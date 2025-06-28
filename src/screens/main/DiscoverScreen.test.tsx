import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DiscoverScreen } from './DiscoverScreen';
import { supabase } from '../../lib/supabase';

// Mock the supabase client
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn(),
  },
}));

// Mock navigation to prevent errors
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('DiscoverScreen', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('renders without crashing', () => {
    // Mock the API response for quests
    (supabase.from('quests').select as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: '1', title: 'Quest 1', era: 'Ancient', description: 'Desc 1', xp: 100, image_url: '' },
        { id: '2', title: 'Quest 2', era: 'Medieval', description: 'Desc 2', xp: 150, image_url: '' },
      ],
      error: null,
    });

    expect(() => render(
      <QueryClientProvider client={queryClient}>
        <DiscoverScreen />
      </QueryClientProvider>
    )).not.toThrow();
  });

  it('fetches quests from API on mount', async () => {
    const mockQuests = [
      { id: '1', title: 'Quest 1', era: 'Ancient', description: 'Desc 1', xp: 100, image_url: '' },
    ];

    (supabase.from('quests').select as jest.Mock).mockResolvedValueOnce({
      data: mockQuests,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DiscoverScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('quests');
      expect(supabase.from('quests').select).toHaveBeenCalledWith('*');
    });
  });
});
