import type { Unsubscriber } from 'svelte/store'
import { describe, expect, test, vi } from 'vitest'

import { configureUseAccounts, useAccounts } from '../use-accounts'

const checkAccountByEmailMock = vi.fn()

configureUseAccounts(checkAccountByEmailMock)

describe('use-accounts', () => {
  let unsubscriber: Unsubscriber | undefined

  beforeEach(() => {
    unsubscriber = undefined
  })

  afterEach(() => {
    useAccounts().resetState()

    unsubscriber && unsubscriber()
  })

  describe('setDocument()', () => {
    test('sets a document to the accounts state', () => {
      const document = '1234567890'

      const { setDocument, getState } = useAccounts()

      setDocument(document)

      expect(getState()).toHaveProperty('document', document)
    })
  })

  describe('setPassword()', () => {
    test('sets a password to the accounts state', () => {
      const password = 'test1234!'

      const { setPassword, getState } = useAccounts()

      setPassword(password)

      expect(getState()).toHaveProperty('password', password)
    })
  })

  describe('checkAccount()', () => {
    test('checks if there is an account for the given email', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: false })

      const { checkAccount } = useAccounts()

      await checkAccount('test@email.com')

      expect(checkAccountByEmailMock).toHaveBeenCalledTimes(1)
    })

    test('sets the error message when checking account by email returns success false', async () => {
      const message = 'It was not possible to check the account. Please try again.'

      checkAccountByEmailMock.mockResolvedValueOnce({ success: false, message })

      const { checkAccount, getState } = useAccounts()

      await checkAccount('error@message.com')

      expect(getState()).toHaveProperty('errorMessage', message)
    })

    test('sets the check account flag to false after check account failed', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: false })

      const { checkAccount, getState } = useAccounts()

      await checkAccount('checkaccount@flag.com')

      expect(getState()).toHaveProperty('isCheckingAccount', false)
    })

    test('sets the email to the state when the check account is successfull', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: true })

      const { checkAccount, getState } = useAccounts()

      const email = 'accountdonot@exist.com'

      await checkAccount(email)

      expect(getState()).toHaveProperty('email', email)
    })

    test('sets the account created flag to false when the account does not exist', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: true, exists: false })

      const { checkAccount, getState } = useAccounts()

      const email = 'account@created.com'

      await checkAccount(email)

      expect(getState()).toHaveProperty('isAccountCreated', false)
    })

    test('sets the account created flag to true when the account already exists', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: true, exists: true })

      const { checkAccount, getState } = useAccounts()

      const email = 'account@created.true'

      await checkAccount(email)

      expect(getState()).toHaveProperty('isAccountCreated', true)
    })

    test('sets the checking account flag to false after successfully check account', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: true })

      const { checkAccount, getState } = useAccounts()

      await checkAccount('checking@account.com')

      expect(getState()).toHaveProperty('isCheckingAccount', false)
    })

    test('sets the account already checked flag to true after checking the account with success', async () => {
      checkAccountByEmailMock.mockResolvedValueOnce({ success: true })

      const { checkAccount, getState } = useAccounts()

      await checkAccount('accountalready@checked.com')

      expect(getState()).toHaveProperty('isAccountAlreadyChecked', true)
    })
  })

  describe('unsubscribe()', () => {
    test('not returns an unsubscribe function when not pass a getStateData callback', () => {
      const { unsubscribe } = useAccounts()

      expect(unsubscribe).toBeUndefined()
    })

    test('returns an unsubscribe function when passing a getStateData callback', () => {
      const getStateData = vi.fn()

      const { unsubscribe } = useAccounts(getStateData)
      unsubscriber = unsubscribe

      expect(unsubscribe).toBeDefined()
    })

    test('gets state data twice when subscribing and when setting an email', () => {
      const getStateData = vi.fn()

      const { setPassword, unsubscribe } = useAccounts(getStateData)
      unsubscriber = unsubscribe

      setPassword('test@test.com')

      expect(getStateData).toHaveBeenCalledTimes(2)
    })

    test('stops receiving state data after fires the unsubscribe function', () => {
      const getStateData = vi.fn()

      const { unsubscribe, setDocument } = useAccounts(getStateData)

      unsubscribe!()

      setDocument('test@test.com')

      expect(getStateData).toHaveBeenCalledTimes(1)
    })
  })
})
