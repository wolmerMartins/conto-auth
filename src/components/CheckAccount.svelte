<script lang="ts">
  import { onDestroy } from 'svelte'

  import { useAccounts, type AccountState } from '../hooks/use-accounts'
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  let email: string
  let isCheckingAccount = false
  let errorMessage: string | undefined = undefined

  function getState(state: AccountState): void {
    isCheckingAccount = Boolean(state.isCheckingAccount)
    errorMessage = state.errorMessage
  }

  const { checkAccount, unsubscribe } = useAccounts(getState)

  async function handleCheckAccount(): Promise<void> {
    await checkAccount(email)
  }

  $: shouldDisableButton = !email || isCheckingAccount

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
