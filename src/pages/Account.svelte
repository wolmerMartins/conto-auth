<script lang="ts">
  import Image from '../components/base/Image.svelte'
  import CheckAccount from '../components/CheckAccount.svelte'
  import { useAccounts, type AccountState } from '../hooks/use-accounts'
  import ManageAccount from './ManageAccount.svelte'

  const logoDescription = 'The conto logo as a SVG image in white color.'

  let isAccountAlreadyChecked = false

  function getState(state: AccountState): void {
    isAccountAlreadyChecked = Boolean(state.isAccountAlreadyChecked)
  }

  useAccounts(getState)
</script>

<div class="main-container">
  <Image
    src="assets/images/logo.svg"
    alt={logoDescription}
    caption={logoDescription}
  />

  {#if !isAccountAlreadyChecked}
    <CheckAccount />
  {:else}
    <ManageAccount />
  {/if}
</div>

<style>
  .main-container {
    background-color: #3E3A32;
    color: white;
    padding: 2rem;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    border-radius: .5rem;
    gap: 2rem
  }
</style>
