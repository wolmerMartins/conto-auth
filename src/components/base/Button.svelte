<script lang="ts">
  export let disabled: boolean = false
</script>

<button class="button" {disabled} on:click>
  <slot />
</button>

<style>
  .button {
    background-color: #55D6BE;
    color: #061A40;
    padding: .5rem;
    border-radius: .5rem;
    cursor: pointer;
    transition: opacity .3s;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
  }

  .button:hover {
    opacity: .5;
  }
</style>
