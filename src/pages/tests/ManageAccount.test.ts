import { render, screen } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import ManageAccount from '../ManageAccount.svelte'

describe('ManageAccount.svelte', () => {
  test('inits the email input with the received value to create account', () => {
    const email = 'test.create@account.com'

    render(ManageAccount, { email, isAccountAlreadyCreated: false })

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a create account button if the account does not exist yet', () => {
    render(ManageAccount, { email: 'test@test.com', isAccountAlreadyCreated: false })

    const createAccountButton = screen.getByText('Create account')

    expect(createAccountButton).toBeDefined()
  })

  test('inits the email input with the received value to login into account', () => {
    const email = 'test.login@account.com'

    render(ManageAccount, { email, isAccountAlreadyCreated: true })

    const inputEmail = screen.getByDisplayValue(email)

    expect(inputEmail).toBeDefined()
  })

  test('must have a login button if the account already exists', () => {
    render(ManageAccount, { email: 'test@test.com', isAccountAlreadyCreated: true })

    const loginButton = screen.getByText('Login')

    expect(loginButton).toBeDefined()
  })
})
