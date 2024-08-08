<script lang="ts">
  import { useAccounts, type AccountState } from '../hooks/use-accounts'
  import { isValidEmail } from '../services/accounts.service'
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  let email: string
  let isCheckingAccount = false

  function getState(state: AccountState): void {
    isCheckingAccount = Boolean(state.isCheckingAccount)
  }

  const { checkAccount } = useAccounts(getState)

  function hasValidEmail(email: string): boolean {
    return Boolean(email && isValidEmail(email))
  }

  function handleCheckAccount(): void {
    if (!hasValidEmail(email)) return

    checkAccount(email)
  }

  $: shouldDisableButton = !hasValidEmail(email) || isCheckingAccount
</script>

<Input label="email" bind:value={email} />

<Button
  disabled={shouldDisableButton}
  on:click={handleCheckAccount}
>
  next
</Button>
