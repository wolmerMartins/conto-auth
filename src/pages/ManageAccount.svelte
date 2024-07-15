<script lang="ts">
  import SignInAccount from '../components/SignInAccount.svelte'
  import SignUpAccount from '../components/SignUpAccount.svelte'

  export let isAccountAlreadyCreated: boolean
  export let email: string
</script>

{#if isAccountAlreadyCreated}
  <SignInAccount {email} />
{:else}
  <SignUpAccount {email} />
{/if}
