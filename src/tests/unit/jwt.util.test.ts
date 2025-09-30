import { generateTokens, verifyToken } from "../../utils/jwt.util"

describe('JWT Utils', () => {
  const testUserId = 'test-user-123'

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', () => {
      const tokens = generateTokens(testUserId)

      expect(tokens).toHaveProperty('accessToken')
      expect(tokens).toHaveProperty('refreshToken')
      expect(typeof tokens.accessToken).toBe('string')
      expect(typeof tokens.refreshToken).toBe('string')
    })

    // it('should generate different tokens each time', () => {
    //   const tokens1 = generateTokens(testUserId)
    //   const tokens2 = generateTokens(testUserId)

    //   expect(tokens1.accessToken).not.toBe(tokens2.accessToken)
    //   expect(tokens1.refreshToken).not.toBe(tokens2.refreshToken)
    // })
  })

  describe('verifyToken', () => {
    it('should verify valid token and return userId', () => {
      const { accessToken } = generateTokens(testUserId);
      const decoded = verifyToken(accessToken);

      expect(decoded.userId).toBe(testUserId);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => verifyToken(invalidToken)).toThrow();
    });

    it('should throw error for expired token', () => {
      // Token expirado (gerado com secret diferente)
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0IiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDAwMDB9.invalid';

      expect(() => verifyToken(expiredToken)).toThrow();
    });
  });
})