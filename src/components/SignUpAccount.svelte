<script lang="ts">
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  export let email: string

  let document: string
  let password: string

  function canSignUp(email: string, document: string, password: string): boolean {
    return Boolean(email && document && password)
  }

  $: shouldDisableButton = !canSignUp(email, document, password)
</script>

<Input label="email" bind:value={email} />

<Input label="document" bind:value={document} />

<Input label="password" bind:value={password} />

<Button disabled={shouldDisableButton}>Create account</Button>
