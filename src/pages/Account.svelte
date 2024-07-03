<script>
  import Button from '../components/Button.svelte'
  import Image from '../components/Image.svelte'
  import Input from '../components/Input.svelte'

  let email = ''

  function showEmail() {
    console.log(email)
  }
</script>

<div class="main-container">
  <Image
    src="assets/images/logo.svg"
    alt="conto logo"
    caption="The conto logo as a SVG image in white color."
  />

  <Input label="email" bind:value={email} />

  <Button on:click={showEmail}>next</Button>
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
