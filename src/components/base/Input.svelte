<script lang="ts">
  export let label = ''
  export let value = ''
  export let disabled = false
  export let errorMessage: string = ''

  let inputClasses = 'input'
  if (errorMessage) {
    inputClasses += ' error-input'
  }

  const inputId = `input-${label}`
</script>

<div class="input-container">
  <label for={inputId}>
    { label }
  </label>
  <input
    id={inputId}
    class={inputClasses}
    {disabled}
    type="text"
    bind:value
  />

  {#if errorMessage}
    <span class="error-message">
      <b>{ errorMessage }</b>
    </span>
  {/if}
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    gap: .4rem;
    width: 100%;
  }

  .input {
    padding: .5rem;
    border-radius: .5rem;
    outline: none;
    font-size: 1rem;
  }

  .input:disabled {
    background-color: #c4c3c1;
    color: #000000;
  }

  .error-message {
    color: #e4572e;
  }

  .error-input {
    border: 2px solid #e4572e;
  }
</style>
