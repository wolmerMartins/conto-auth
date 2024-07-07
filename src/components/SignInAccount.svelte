<script lang="ts">
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  export let email: string

  let password: string

  function canSignIn(email: string, password: string): boolean {
    return Boolean(email && password)
  }

  $: shouldDisableSignIn = !canSignIn(email, password)
</script>

<Input label="email" bind:value={email} />

<Input label="password" bind:value={password} />

<Button disabled={shouldDisableSignIn}>Login</Button>
