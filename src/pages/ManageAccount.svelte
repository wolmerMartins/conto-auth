<script lang="ts">
  import { onMount } from 'svelte'
  import SignInAccount from '../components/SignInAccount.svelte'
  import SignUpAccount from '../components/SignUpAccount.svelte'
  import { useAccounts } from '../hooks/use-accounts'

  let isAccountAlreadyCreated: boolean

  const { getState } = useAccounts()

  onMount(() => {
    isAccountAlreadyCreated = getState().isAccountCreated
  })
</script>

{#if isAccountAlreadyCreated}
  <SignInAccount />
{:else}
  <SignUpAccount />
{/if}
