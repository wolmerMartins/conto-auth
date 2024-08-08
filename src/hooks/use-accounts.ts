import { writable, type Unsubscriber } from 'svelte/store'
import { checkAccountByEmail } from '../services/accounts.service'

export type AccountState = {
  email?: string
  document?: string
  password?: string
  isCheckingAccount?: boolean
  isAccountCreated?: boolean
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
  isAccountCreated: false
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
}

function startCheckingAccount(): void {
  updateState('isCheckingAccount', true)
}

function getStateDataSubscriber(getStateData?: GetStateData): Unsubscriber | undefined {
  if (!getStateData) return

  return state.subscribe(getStateData)
}

async function checkAccount(email: string): Promise<void> {
  startCheckingAccount()

  const { success, exists } = await checkAccountByEmail(email)
  if (!success) return

  finishCheckingAccount(email, exists)
}

export function useAccounts(getStateData?: GetStateData): UseAccounts {
  const unsubscribe = getStateDataSubscriber(getStateData)

  return {
    setDocument,
    setPassword,
    checkAccount,
    unsubscribe
  }
}
