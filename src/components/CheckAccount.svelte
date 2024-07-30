<script lang="ts">
  import { useAccounts } from '../hooks/use-accounts'
  import { isValidEmail } from '../services/accounts.service'
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  let email: string

  const { setEmail } = useAccounts()

  function hasValidEmail(email: string): boolean {
    return Boolean(email && isValidEmail(email))
  }

  function checkAccount(): void {
    if (!hasValidEmail(email)) return

    setEmail(email)
  }

  $: shouldDisableButton = !hasValidEmail(email)
</script>

<Input label="email" bind:value={email} />

<Button
  disabled={shouldDisableButton}
  on:click={checkAccount}
>
  next
</Button>
