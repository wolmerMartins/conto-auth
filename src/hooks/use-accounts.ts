import { writable, type Unsubscriber } from 'svelte/store'
import { type CheckAccountByEmail } from '../services/accounts.service'

export type AccountState = {
  email?: string
  document?: string
  password?: string
  isCheckingAccount?: boolean
  isAccountCreated?: boolean
  isAccountAlreadyChecked?: boolean
}

type GetStateData = (state: AccountState) => void

type UseAccounts = {
  setDocument: (document: string) => void
  setPassword: (password: string) => void
  checkAccount: (email: string) => Promise<void>
  unsubscribe?: Unsubscriber | undefined
}

const state = writable<AccountState>({
  isCheckingAccount: false,
  isAccountCreated: false,
  isAccountAlreadyChecked: false
})

function updateState<T>(key: keyof AccountState, value: T): void {
  state.update(currentState => ({
    ...currentState,
    [key]: value
  }))
}

function setPassword(password: string): void {
  updateState('password', password)
}

function setDocument(document: string): void {
  updateState('document', document)
}

function setEmail(email: string): void {
  updateState('email', email)
}

function setIsAccountCreated(isAccountCreated: boolean): void {
  updateState('isAccountCreated', isAccountCreated)
}

function finishCheckingAccount(email: string, exists?: boolean): void {
  setEmail(email)
  setIsAccountCreated(Boolean(exists))
  updateState('isCheckingAccount', false)
  updateState('isAccountAlreadyChecked', true)
}

function startCheckingAccount(): void {
  updateState('isCheckingAccount', true)
}

function getStateDataSubscriber(getStateData?: GetStateData): Unsubscriber | undefined {
  if (!getStateData) return

  return state.subscribe(getStateData)
}

function configureCheckAccount(checkAccountByEmail: CheckAccountByEmail): (email: string) => Promise<void> {
  return async function(email: string): Promise<void> {
    startCheckingAccount()

    const { success, exists } = await checkAccountByEmail(email)
    if (!success) return

    finishCheckingAccount(email, exists)
  }
}

let useAccounts: (getStateData?: GetStateData) => UseAccounts

function configureUseAccounts(checkAccountByEmail: CheckAccountByEmail): void {
  useAccounts = function(getStateData?: GetStateData): UseAccounts {
    const unsubscribe = getStateDataSubscriber(getStateData)

    return {
      setDocument,
      setPassword,
      checkAccount: configureCheckAccount(checkAccountByEmail),
      unsubscribe
    }
  }
}

export { configureUseAccounts, useAccounts }
