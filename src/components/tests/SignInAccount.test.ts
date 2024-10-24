import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, vi } from 'vitest'

import SignInAccount from '../SignInAccount.svelte'
import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'

describe('SignInAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn(
    async () => ({ success: true, exists: true })
  )

  configureUseAccounts(checkAccountByEmailMock)

  const { checkAccount } = useAccounts()

  const email = 'test@test.com'

  beforeEach(async () => {
    await checkAccount(email)
  })

  test('button must be disabled when there are required fields empty', () => {
    render(SignInAccount)

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be enabled when all required fields are filled in', async () => {
    const user = userEvent.setup()

    render(SignInAccount)

    const passwordInput = screen.getByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })

  test('not allow changing the email when logging in', async () => {
    const user = userEvent.setup()

    render(SignInAccount)

    const emailInput = screen.getByLabelText('email')
    await user.type(emailInput, 'newemail@test.com')

    expect(emailInput).toHaveProperty('value', email)
  })
})
