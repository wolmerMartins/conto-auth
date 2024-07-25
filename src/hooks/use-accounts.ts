import { writable, type Unsubscriber } from 'svelte/store'

export type AccountState = {
  email?: string
  document?: string
  password?: string
}

type GetStateData = (state: AccountState) => void

type UseAccounts = {
  setEmail: (email: string) => void
  setDocument: (document: string) => void
  setPassword: (password: string) => void
  unsubscribe?: Unsubscriber | undefined
}

const state = writable<AccountState>({})

function updateState(key: keyof AccountState, value: string): void {
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

function getStateDataSubscriber(getStateData?: GetStateData): Unsubscriber | undefined {
  if (!getStateData) return

  return state.subscribe(getStateData)
}

export function useAccounts(getStateData?: GetStateData): UseAccounts {
  const unsubscribe = getStateDataSubscriber(getStateData)

  return {
    setEmail,
    setDocument,
    setPassword,
    unsubscribe
  }
}
