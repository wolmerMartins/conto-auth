<script lang="ts">
  export let label = ''
  export let value = ''

  const inputId = `input-${label}`
</script>

<div class="input-container">
  <label for={inputId}>
    { label }
  </label>
  <input
    id={inputId}
    class="input"
    type="text"
    bind:value
  />
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    width: 100%;
  }

  .input {
    padding: .5rem;
    border-radius: .5rem;
    outline: none;
    font-size: 1rem;
  }
</style>
