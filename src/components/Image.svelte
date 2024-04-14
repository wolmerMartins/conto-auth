<script>
  export let src = ''
  export let alt = ''
  export let caption = ''
</script>

<figure class="logo-container">
  <img src={src} alt={alt} />
  <figcaption>{caption}</figcaption>
</figure>

<style>
  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo-container figcaption {
    display: none;
  }
</style>
