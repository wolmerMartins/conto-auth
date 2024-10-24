<script lang="ts">
  import { onDestroy } from 'svelte'
  import { useAccounts, type AccountState } from '../hooks/use-accounts'
  import { isValidEmail } from '../services/accounts.service'
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  const invalidEmailMessage = 'The email is not valid'

  let email: string
  let isCheckingAccount = false
  let errorMessage: string | undefined = undefined

  function getState(state: AccountState): void {
    isCheckingAccount = Boolean(state.isCheckingAccount)
    errorMessage = state.errorMessage
  }

  const { checkAccount, unsubscribe } = useAccounts(getState)

  function hasValidEmail(email: string): boolean {
    return Boolean(email && isValidEmail(email))
  }

  async function handleCheckAccount(): Promise<void> {
    if (!hasValidEmail(email)) {
      errorMessage = invalidEmailMessage
      return
    }

    await checkAccount(email)
  }

  function validateEmail(email: string): void {
    if (hasValidEmail(email)) return

    errorMessage = invalidEmailMessage
  }

  $: shouldDisableButton = !hasValidEmail(email) || isCheckingAccount
  $: validateEmail(email)

  onDestroy(() => {
    unsubscribe!()
  })
</script>

<Input label="email" bind:value={email} {errorMessage} />

<Button
  disabled={shouldDisableButton}
  on:click={handleCheckAccount}
>
  next
</Button>
