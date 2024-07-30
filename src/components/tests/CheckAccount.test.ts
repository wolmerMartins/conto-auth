import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test, describe } from 'vitest'

import { useAccounts, type AccountState } from '../../hooks/use-accounts'
import CheckAccount from '../CheckAccount.svelte'

describe('CheckAccount.svelte', () => {
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

  test('button must not be disabled when there is a email typed', async () => {
    const user = userEvent.setup()

    render(CheckAccount)

    const input = await screen.findByLabelText('email')
    await user.type(input, 'test@test.com')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })

  test('sets the email into the global state when checking the account', async done => {
    const email = 'test@email.com'

    const user = userEvent.setup()

    render(CheckAccount)

    const input = screen.getByLabelText('email')
    await user.type(input, email)

    const button = screen.getByRole('button')
    await user.click(button)

    useAccounts(
      (state: AccountState): void => {
        done.expect(state).toHaveProperty('email', email)
      }
    )
  })
})
