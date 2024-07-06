import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { test } from 'vitest'

import SignUpAccount from '../SignUpAccount.svelte'

describe('SignUpAccount.svelte', () => {
  test('button must be disabled when all required data is empty', () => {
    render(SignUpAccount, { email: 'test@test.com' })

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be disabled when at least one required account field is empty', async () => {
    const user = userEvent.setup()

    render(SignUpAccount, { email: 'test@test.com' })

    const documentInput = await screen.findByLabelText('document')
    await user.type(documentInput, '123456789')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be disabled when the provided email is removed and not typed again', async () => {
    const user = userEvent.setup()

    render(SignUpAccount, { email: 'test@test.com' })

    const emailInput = await screen.findByLabelText('email')
    await user.clear(emailInput)

    const documentInput = await screen.findByLabelText('document')
    await user.type(documentInput, '123456789')

    const passwordInput = await screen.findByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must be enabled when all required account fields are filled', async () => {
    const user = userEvent.setup()

    render(SignUpAccount, { email: 'test@test.com' })

    const documentInput = screen.getByLabelText('document')
    await user.type(documentInput, '123456789')

    const passwordInput = screen.getByLabelText('password')
    await user.type(passwordInput, '123456')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })
})
