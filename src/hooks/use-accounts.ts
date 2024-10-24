import { get, writable, type Unsubscriber } from 'svelte/store'

import { type CheckAccountByEmail } from '../services/accounts.service'

export type AccountState = {
  isCheckingAccount: boolean
  isAccountCreated: boolean
  isAccountAlreadyChecked: boolean
  email?: string
  document?: string
  password?: string
  errorMessage?: string
}

type GetStateData = (state: AccountState) => void

type UseAccounts = {
  getState: () => AccountState
  resetState: () => void
  setDocument: (document: string) => void
  setPassword: (password: string) => void
  checkAccount: (email: string) => Promise<void>
  unsubscribe?: Unsubscriber | undefined
}

const initialState: AccountState = {
  email: undefined,
  document: undefined,
  password: undefined,
  isCheckingAccount: false,
  isAccountCreated: false,
  isAccountAlreadyChecked: false,
  errorMessage: undefined
}

const state = writable<AccountState>(initialState)

function getState(): AccountState {
  return get(state)
}

function updateState<T>(key: keyof AccountState, value: T): void {
  state.update(currentState => ({
    ...currentState,
    [key]: value
  }))
}

function resetState(): void {
  Object.keys(initialState).forEach(
    key => updateState(<keyof AccountState>key, initialState[<keyof AccountState>key])
  )
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

function checkAccountFailed(message: string): void {
  updateState('errorMessage', message)
  updateState('isCheckingAccount', false)
}

function checkAccountSucceed(email: string, exists?: boolean): void {
  setEmail(email)
  setIsAccountCreated(Boolean(exists))
  updateState('isCheckingAccount', false)
  updateState('isAccountAlreadyChecked', true)
}

function startCheckingAccount(): void {
  updateState('errorMessage', undefined)
  updateState('isCheckingAccount', true)
  updateState('isAccountAlreadyChecked', false)
  setIsAccountCreated(false)
}

function getStateDataSubscriber(getStateData?: GetStateData): Unsubscriber | undefined {
  if (!getStateData) return

  return state.subscribe(getStateData)
}

function configureCheckAccount(checkAccountByEmail: CheckAccountByEmail): (email: string) => Promise<void> {
  return async function(email: string): Promise<void> {
    startCheckingAccount()

    const { success, exists, message } = await checkAccountByEmail(email)
    if (!success)
      return checkAccountFailed(message!)

    checkAccountSucceed(email, exists)
  }
}

let useAccounts: (getStateData?: GetStateData) => UseAccounts

function configureUseAccounts(checkAccountByEmail: CheckAccountByEmail): void {
  useAccounts = function(getStateData?: GetStateData): UseAccounts {
    const unsubscribe = getStateDataSubscriber(getStateData)

    return {
      getState,
      resetState,
      setDocument,
      setPassword,
      checkAccount: configureCheckAccount(checkAccountByEmail),
      unsubscribe
    }
  }
}

export { configureUseAccounts, useAccounts }
