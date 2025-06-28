import { useAuthStore } from './authStore';
import { supabase } from '../services/supabase';

// Mock the supabase client
jest.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn(),
  },
}));

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset the store state
    useAuthStore.setState({
      user: null,
      session: null,
      loading: true,
      initialized: false,
      profile: null,
    });
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      const mockUser = { 
        id: '123', 
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2023-01-01T00:00:00Z',
      };
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await useAuthStore.getState().signIn('test@example.com', 'password');

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual({});
    });

    it('should handle sign in error', async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid credentials' },
      });

      const result = await useAuthStore.getState().signIn('test@example.com', 'wrong');

      expect(result).toEqual({ error: 'Invalid credentials' });
    });

    it('should handle unexpected errors', async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await useAuthStore.getState().signIn('test@example.com', 'password');

      expect(result).toEqual({ error: 'An unexpected error occurred' });
    });
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const mockUser = { 
        id: '123', 
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2023-01-01T00:00:00Z',
      };
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      
      const mockInsert = jest.fn().mockResolvedValue({ error: null });
      const mockFrom = jest.fn().mockReturnValue({ insert: mockInsert });
      (supabase.from as jest.Mock) = mockFrom;

      const result = await useAuthStore.getState().signUp('test@example.com', 'password', 'John Doe');

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: {
            full_name: 'John Doe',
          },
        },
      });
      expect(result).toEqual({});
    });

    it('should handle sign up error', async () => {
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: { message: 'Email already exists' },
      });

      const result = await useAuthStore.getState().signUp('test@example.com', 'password', 'John Doe');

      expect(result).toEqual({ error: 'Email already exists' });
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      (supabase.auth.signOut as jest.Mock).mockResolvedValue(undefined);

      await useAuthStore.getState().signOut();

      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      // Set up initial state with user
      useAuthStore.setState({
        user: { 
          id: '123', 
          email: 'test@example.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: '2023-01-01T00:00:00Z',
        },
        profile: { 
          id: '123', 
          email: 'test@example.com',
          full_name: 'John Doe', 
          xp_points: 100,
          avatar_url: null,
          heritage_background: null,
          current_level: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      });

      const mockEq = jest.fn().mockResolvedValue({ error: null });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ update: mockUpdate });
      (supabase.from as jest.Mock) = mockFrom;

      const result = await useAuthStore.getState().updateProfile({ xp_points: 200 });

      expect(mockUpdate).toHaveBeenCalledWith({ xp_points: 200 });
      expect(mockEq).toHaveBeenCalledWith('id', '123');
      expect(result).toEqual({});
    });

    it('should handle no user logged in', async () => {
      const result = await useAuthStore.getState().updateProfile({ xp_points: 200 });

      expect(result).toEqual({ error: 'No user logged in' });
    });

    it('should handle update error', async () => {
      useAuthStore.setState({
        user: { 
          id: '123', 
          email: 'test@example.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: '2023-01-01T00:00:00Z',
        },
      });

      const mockEq = jest.fn().mockResolvedValue({ error: { message: 'Update failed' } });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ update: mockUpdate });
      (supabase.from as jest.Mock) = mockFrom;

      const result = await useAuthStore.getState().updateProfile({ xp_points: 200 });

      expect(result).toEqual({ error: 'Update failed' });
    });
  });
}); 