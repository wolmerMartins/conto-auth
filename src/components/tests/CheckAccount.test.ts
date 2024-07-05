import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test, describe, vi } from 'vitest'

import CheckAccount from '../CheckAccount.svelte'

describe('CheckAccount.svelte', () => {
  test('button must be disabled when there is no email typed', async () => {
    render(CheckAccount, { onAccountChecked: vi.fn() })

    const button = await screen.findByRole('button')

    expect(button).toHaveProperty('disabled', true)
  })

  test('button must not be disabled when there is a email typed', async () => {
    const user = userEvent.setup()

    render(CheckAccount, { onAccountChecked: vi.fn() })

    const input = await screen.findByLabelText('email')
    await user.type(input, 'test@test.com')

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('disabled', false)
  })

  test('not fire on account checked function when there is no email', async () => {
    const user = userEvent.setup()
    const onAccountChecked = vi.fn()

    render(CheckAccount, { onAccountChecked })

    const button = screen.getByRole('button')
    await user.click(button)

    expect(onAccountChecked).not.toHaveBeenCalled()
  })

  test('fire on account checked function when there is an email', async () => {
    const user = userEvent.setup()
    const onAccountChecked = vi.fn()

    render(CheckAccount, { onAccountChecked })

    const input = await screen.getByLabelText('email')
    await user.type(input, 'test@test.com')

    const button = screen.getByRole('button')
    await user.click(button)

    expect(onAccountChecked).toHaveBeenCalledTimes(1)
  })
})
