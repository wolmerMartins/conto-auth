import { render, screen } from '@testing-library/svelte'
import { describe, expect } from 'vitest'
import SignInAccount from '../SignInAccount.svelte'
import userEvent from '@testing-library/user-event'

describe('SignInAccount.svelte', () => {
  const email = 'test@test.com'

  test('button must be disabled when there are required fields empty', () => {
    render(SignInAccount, { email })

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be disabled when the password is typed in but the email not', async () => {
    const user = userEvent.setup()

    render(SignInAccount, { email })

    const emailInput = screen.getByLabelText('email')
    await user.clear(emailInput)

    const passwordInput = screen.getByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be enabled when all required fields are filled in', async () => {
    const user = userEvent.setup()

    render(SignInAccount, { email })

    const passwordInput = screen.getByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })
})
