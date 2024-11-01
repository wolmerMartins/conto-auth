import { describe, expect, vi } from 'vitest'

import { checkAccountByEmail, configureAccountServices, isValidEmail, type CheckAccountResult } from '../accounts.service'

describe('accounts.service', () => {
  describe('isValidEmail()', () => {
    test('returns false if the email is undefined', () => {
      const result = isValidEmail(undefined)

      expect(result).toBe(false)
    })

    test('returns false if the email is an empty string', () => {
      const result = isValidEmail('')

      expect(result).toBe(false)
    })

    test('returns false if the email is a whitespace', () => {
      const result = isValidEmail(' ')

      expect(result).toBe(false)
    })

    test('returns false if the email does not contain an address', () => {
      const result = isValidEmail('@email.com')

      expect(result).toBe(false)
    })

    test('returns false if the email has only an address', () => {
      const result = isValidEmail('test')

      expect(result).toBe(false)
    })

    test('returns false if the email contains an address but does not contain an @ symbol', () => {
      const result = isValidEmail('testemail.com')

      expect(result).toBe(false)
    })

    test('returns false if the email contains an address, has an @ symbol but not has a domain', () => {
      const result = isValidEmail('test@.com')

      expect(result).toBe(false)
    })

    test('returns false if the email contains an address, has an @ symbol and a domain but not an extension', () => {
      const result = isValidEmail('test@email')

      expect(result).toBe(false)
    })

    test('returns true if the email contains an address, has an @ symbol, and a domain with an extension', () => {
      const result = isValidEmail('test@email.com')

      expect(result).toBe(true)
    })
  })

  describe('checkAccountByEmail()', () => {
    const getMock = vi.fn()

    beforeAll(() => {
      configureAccountServices({
        get: getMock
      })
    })

    afterEach(vi.clearAllMocks)

    const message = 'It was not possible to check the account. Please try again.'

    test('returns success false and invalid email message when the email is invalid', async () => {
      const result = await checkAccountByEmail('email.com')

      expect(result).toEqual<CheckAccountResult>(
        {
          success: false,
          message: 'The email is not valid'
        }
      )
    })

    test('makes a request with the provided email', async () => {
      getMock.mockResolvedValueOnce({ success: true, data: {} })

      const email = 'test@email.com'

      await checkAccountByEmail(email)

      expect(getMock).toHaveBeenCalledWith(`accounts/${email}/exists`)
    })

    test('returns an object with success true and exists false if the account for the email does not exist', async () => {
      getMock.mockResolvedValueOnce({ success: true, data: { exists: false } })

      const result = await checkAccountByEmail('test@email.com')

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        { success: true, exists: false }
      )
    })

    test('returns an object with success true and exists true if the account for the email exists', async () => {
      getMock.mockResolvedValueOnce({ success: true, data: { exists: true } })

      const result = await checkAccountByEmail('test@email.com')

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        { success: true, exists: true }
      )
    })

    test('returns an object with success false when the check account request rejects', async () => {
      getMock.mockResolvedValueOnce({ success: false, error: new Error('something went wrong') })

      const result = await checkAccountByEmail('test@email.com')

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        {
          success: false,
          message
        }
      )
    })

    test('returns an object with success false when the check account json parse rejects', async () => {
      getMock.mockResolvedValueOnce({ success: false, error: new Error('something went wrong') })

      const result = await checkAccountByEmail('test@email.com')

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        {
          success: false,
          message
        }
      )
    })

    test('returns an error message when something goes wrong with the request', async () => {
      getMock.mockResolvedValueOnce({ success: false, error: new Error(message) })

      const result = await checkAccountByEmail('test@test.com')

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        {
          success: false,
          message
        }
      )
    })
  })
})
