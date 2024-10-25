import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test, describe, vi } from 'vitest'

import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'
import CheckAccount from '../CheckAccount.svelte'
import type { CheckAccountResult } from '../../services/accounts.service'

describe('CheckAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn<[email: string], Promise<CheckAccountResult>>(
    async () => ({ success: true, exists: true })
  )

  configureUseAccounts(checkAccountByEmailMock)

  const { getState, resetState } = useAccounts()

  afterEach(() => {
    resetState()
  })

  test('button must be disabled when there is no email typed', async () => {
    render(CheckAccount)

    const button = await screen.findByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must not be disabled when there is a email typed', async () => {
    const user = userEvent.setup()

    render(CheckAccount)

    const input = await screen.findByLabelText('email')
    await user.type(input, 'test@test.com')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })

  test('displays an email invalid error when the typed email is not valid', async () => {
    const message = 'The email is not valid'

    checkAccountByEmailMock.mockResolvedValueOnce({ success: false, message })

    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, 'invalid@email')

    const button = screen.getByRole('button')
    await user.click(button)

    const errorMessage = screen.getByText(message)

    expect(errorMessage).toBeDefined()
  })

  test('sets the email into the global state when checking the account', async () => {
    const email = 'test@email.com'

    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, email)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(getState()).toHaveProperty('email', email)
  })

  test('displays an error message when there is an error checking the account', async () => {
    const message = 'It was not possible to check the account. Please try again.'

    checkAccountByEmailMock.mockResolvedValueOnce({ success: false, exists: false, message })

    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, 'test@email.com')

    const button = screen.getByRole('button')
    await user.click(button)

    const error = screen.getByText(message)

    expect(error).toBeDefined()
  })
})
