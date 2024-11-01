import { render, screen } from '@testing-library/svelte'
import { describe, expect, test, vi } from 'vitest'

import ManageAccount from '../ManageAccount.svelte'
import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'

describe('ManageAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn()

  configureUseAccounts(checkAccountByEmailMock)

  const { checkAccount, resetState } = useAccounts()

  const email = 'test.create@account.com'

  afterEach(() => {
    resetState()
  })

  async function mockCheckedAccount(exists = true): Promise<void> {
    checkAccountByEmailMock.mockResolvedValueOnce({ success: true, exists })

    await checkAccount(email)
  }

  test('inits the email input with the received value to create account', async () => {
    await mockCheckedAccount()

    render(ManageAccount)

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a create account button if the account does not exist yet', async () => {
    await mockCheckedAccount(false)

    render(ManageAccount)

    const createAccountButton = screen.getByText('create account')

    expect(createAccountButton).toBeDefined()
  })

  test('inits the email input with the received value to login into account', async () => {
    await mockCheckedAccount()

    render(ManageAccount)

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a login button if the account already exists', async () => {
    await mockCheckedAccount()

    render(ManageAccount)

    const loginButton = screen.getByText('login')

    expect(loginButton).toBeDefined()
  })
})
