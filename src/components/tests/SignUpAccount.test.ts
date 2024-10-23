import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { test, vi } from 'vitest'

import SignUpAccount from '../SignUpAccount.svelte'
import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'

describe('SignUpAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn(
    async () => ({ success: true })
  )

  configureUseAccounts(checkAccountByEmailMock)

  const { checkAccount, resetState } = useAccounts()

  const email = 'signup@email.com'

  beforeEach(async () => {
    await checkAccount(email)
  })

  afterEach(() => {
    resetState()
  })

  test('button must be disabled when all required data is empty', () => {
    render(SignUpAccount)

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be disabled when at least one required account field is empty', async () => {
    const user = userEvent.setup()

    render(SignUpAccount)

    const documentInput = await screen.findByLabelText('document')
    await user.type(documentInput, '123456789')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be enabled when all required account fields are filled in', async () => {
    const user = userEvent.setup()

    render(SignUpAccount)

    const documentInput = screen.getByLabelText('document')
    await user.type(documentInput, '123456789')

    const passwordInput = screen.getByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })

  test('not allow changing the email when signing up', async () => {
    const user = userEvent.setup()

    render(SignUpAccount)

    const emailInput = screen.getByLabelText('email')
    await user.type(emailInput, 'changed@email.com')

    expect(emailInput).toHaveProperty('value', email)
  })
})
