import type { Unsubscriber } from 'svelte/store'
import { describe, expect, test, vi, type TestContext } from 'vitest'

import { useAccounts, type AccountState } from '../use-accounts'

describe('use-accounts', () => {
  function assertStateData(
    done: TestContext,
    key: keyof AccountState,
    value: string
  ): Unsubscriber {
    function getStateData(state: AccountState): void {
      done.expect(state).toHaveProperty(key, value)
    }

    const { unsubscribe } = useAccounts(getStateData)

    return <Unsubscriber>unsubscribe
  }

  let unsubscriber: Unsubscriber | undefined

  beforeEach(() => {
    unsubscriber = undefined
  })

  afterEach(() => {
    unsubscriber && unsubscriber()
  })

  describe('setDocument()', () => {
    test('sets a document to the accounts state', done => {
      const document = '1234567890'

      const { setDocument } = useAccounts()

      setDocument(document)

      unsubscriber = assertStateData(done, 'document', document)
    })
  })

  describe('setPassword()', () => {
    test('sets a password to the accounts state', done => {
      const password = 'test1234!'

      const { setPassword } = useAccounts()

      setPassword(password)

      unsubscriber = assertStateData(done, 'password', password)
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
