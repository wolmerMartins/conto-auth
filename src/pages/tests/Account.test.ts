import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, vi } from 'vitest'

import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'
import Account from '../Account.svelte'

describe('Account.svelte', () => {
  const checkAccountByEmailMock = vi.fn(
    async () => ({ success: true })
  )

  configureUseAccounts(checkAccountByEmailMock)

  const { resetState } = useAccounts()

  afterEach(() => {
    resetState()
  })

  test('has a next button when the account is not checked', () => {
    render(Account)

    const nextButton = screen.getByText('next')

    expect(nextButton).toBeDefined()
  })

  test('has a create account button when the account was already checked and does not exist', async () => {
    const user = userEvent.setup()

    render(Account)

    const email = 'account@email.com'

    const emailInput = screen.getByLabelText('email')
    await user.type(emailInput, email)

    const nextButton = screen.getByText('next')
    await user.click(nextButton)

    const createAccountButton = screen.getByText('create account')

    expect(createAccountButton).toBeDefined()
  })
})
