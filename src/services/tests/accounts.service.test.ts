import { describe, expect, vi, type Mock } from 'vitest'

import { checkAccount, isValidEmail, type CheckAccountResult } from '../accounts.service'

describe('accounts.service', () => {
  describe('isValidEmail()', () => {
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

  describe('checkAccount()', () => {
    let fetch = global.fetch

    let fetchMock: Mock
    let fetchJsonMock: Mock

    beforeEach(() => {
      fetchJsonMock = vi.fn()

      fetchMock = vi.fn(() => Promise.resolve({ json: fetchJsonMock }))

      global.fetch = fetchMock
    })

    afterEach(() => {
      vi.clearAllMocks()

      global.fetch = fetch
    })

    test('makes a request with the provided email', async () => {
      const email = 'test@email.com'

      await checkAccount(email)

      expect(fetchMock).toHaveBeenCalledWith(`http://localhost:5000/accounts/${email}/exists`)
    })

    test('returns an object with success true and exists false if the account for the email does not exist', async () => {
      fetchJsonMock.mockResolvedValueOnce({ exists: false })

      const result = await checkAccount('test@email.com')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchJsonMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        { success: true, exists: false }
      )
    })

    test('returns an object with success true and exists true if the account for the email exists', async () => {
      fetchJsonMock.mockResolvedValueOnce({ exists: true })

      const result = await checkAccount('test@email.com')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchJsonMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        { success: true, exists: true }
      )
    })

    test('returns an object with success false when the check account request rejects', async () => {
      fetchMock.mockRejectedValueOnce(new Error('something went wrong'))

      const result = await checkAccount('test@email.com')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchJsonMock).not.toHaveBeenCalled()
      expect(result).toEqual<CheckAccountResult>(
        { success: false }
      )
    })

    test('returns an object with success false when the check account json parse rejects', async () => {
      fetchJsonMock.mockRejectedValueOnce(new Error('something went wrong'))

      const result = await checkAccount('test@email.com')

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchJsonMock).toHaveBeenCalledTimes(1)
      expect(result).toEqual<CheckAccountResult>(
        { success: false }
      )
    })
  })
})
