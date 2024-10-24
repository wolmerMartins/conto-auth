import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test, describe, vi } from 'vitest'

import { configureUseAccounts, useAccounts } from '../../hooks/use-accounts'
import CheckAccount from '../CheckAccount.svelte'

describe('CheckAccount.svelte', () => {
  const checkAccountByEmailMock = vi.fn(
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

  test('button must be disabled when the typed email is not valid', async () => {
    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, 'testemail.com')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('input must display an error message when the email is not valid', async () => {
    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, 'test@email')

    const button = screen.getByRole('button')
    await user.click(button)

    const error = screen.getByText('The email is not valid')

    expect(error).toBeDefined()
  })

  test('button must not be disabled when there is a email typed', async () => {
    const user = userEvent.setup()

    render(CheckAccount)

    const input = await screen.findByLabelText('email')
    await user.type(input, 'test@test.com')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
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
    checkAccountByEmailMock.mockResolvedValueOnce({ success: false, exists: false })

    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, 'test@email.com')

    const button = screen.getByRole('button')
    await user.click(button)

    const error = screen.getByText('It was not possible to check the account. Please try again.')

    expect(error).toBeDefined()
  })
})
