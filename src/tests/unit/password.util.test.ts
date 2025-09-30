import { comparePassword, hashPassword } from "../../utils/password.util"

describe('Password Utils', () => {
  describe('hasPassword', () => {
    it('should hash password successfully', async () => {
      const password = 'mySecurePassword123'
      const hash = await hashPassword(password)

      expect(hash).toBeDefined()
      expect(hash).not.toBe(password)
      expect(hash.length).toBeGreaterThan(20)
    })

    it('should generate different hashes for same password', async () => {
      const password = 'samePassword'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'correctPassword'
      const hash = await hashPassword(password)
      const isMatch = await comparePassword(password, hash)

      expect(isMatch).toBe(true)
    })

    it('should return false for incorrect password', async () => {
      const password = 'correctPassword'
      const hash = await hashPassword(password)
      const isMatch = await comparePassword('wrongPassword', hash)

      expect(isMatch).toBe(false)
    })
  })
})