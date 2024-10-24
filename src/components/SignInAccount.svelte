<script lang="ts">
  import { onMount } from 'svelte'

  import { useAccounts } from '../hooks/use-accounts'
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  let email: string

  const { getState } = useAccounts()

  onMount(() => {
    email = getState().email!
  })

  let password: string

  function canSignIn(email: string, password: string): boolean {
    return Boolean(email && password)
  }

  $: shouldDisableSignIn = !canSignIn(email, password)
</script>

<Input label="email" bind:value={email} disabled={true} />

<Input label="password" bind:value={password} />

<Button disabled={shouldDisableSignIn}>login</Button>
