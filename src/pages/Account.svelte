<script>
  import Image from '../components/base/Image.svelte'
  import CheckAccount from '../components/CheckAccount.svelte'

  const logoDescription = 'The conto logo as a SVG image in white color.'
</script>

<div class="main-container">
  <Image
    src="assets/images/logo.svg"
    alt={logoDescription}
    caption={logoDescription}
  />

  <CheckAccount />
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
