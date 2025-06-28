import { LoginSchema, SignupSchema } from './validation';

describe('Validation Schemas', () => {
  describe('LoginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = LoginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });

    it('rejects short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      };

      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters long');
      }
    });

    it('rejects missing fields', () => {
      const invalidData = {
        email: 'test@example.com',
        // missing password
      };

      const result = LoginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('SignupSchema', () => {
    it('validates correct signup data', () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const result = SignupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects short full name', () => {
      const invalidData = {
        fullName: 'J',
        email: 'john@example.com',
        password: 'password123',
      };

      const result = SignupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter your full name');
      }
    });

    it('rejects invalid email in signup', () => {
      const invalidData = {
        fullName: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      const result = SignupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });

    it('rejects short password in signup', () => {
      const invalidData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: '123',
      };

      const result = SignupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters long');
      }
    });
  });
}); 