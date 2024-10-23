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

  let document: string
  let password: string

  function canSignUp(email: string, document: string, password: string): boolean {
    return Boolean(email && document && password)
  }

  $: shouldDisableButton = !canSignUp(email, document, password)
</script>

<Input label="email" bind:value={email} disabled={true} />

<Input label="document" bind:value={document} />

<Input label="password" bind:value={password} />

<Button disabled={shouldDisableButton}>create account</Button>
