<script lang="ts">
  import Button from './base/Button.svelte'
  import Input from './base/Input.svelte'

  export let onAccountChecked: (email: string, isAlreadyCreated: boolean) => void

  let email: string

  function checkAccount(): void {
    if (!email) return

    onAccountChecked(email, false)
  }
</script>

<Input label="email" bind:value={email} />

<Button disabled={!email} on:click={checkAccount}>next</Button>
