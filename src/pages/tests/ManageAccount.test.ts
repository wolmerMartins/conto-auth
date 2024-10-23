import { render, screen } from '@testing-library/svelte'
import { describe, expect, test, vi } from 'vitest'

import ManageAccount from '../ManageAccount.svelte'
import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'

describe('ManageAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn(
    async () => ({ success: true, exists: false })
  )

  configureUseAccounts(checkAccountByEmailMock)

  const { checkAccount, resetState } = useAccounts()

  const email = 'test.create@account.com'

  beforeEach(async () => {
    await checkAccount(email)
  })

  afterEach(() => {
    resetState()
  })

  test('inits the email input with the received value to create account', () => {
    render(ManageAccount)

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a create account button if the account does not exist yet', () => {
    render(ManageAccount)

    const createAccountButton = screen.getByText('create account')

    expect(createAccountButton).toBeDefined()
  })

  test('inits the email input with the received value to login into account', () => {
    render(ManageAccount)

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a login button if the account already exists', async () => {
    checkAccountByEmailMock.mockResolvedValueOnce({ success: true, exists: true })

    await checkAccount(email)

    render(ManageAccount)

    const loginButton = screen.getByText('login')

    expect(loginButton).toBeDefined()
  })
})
