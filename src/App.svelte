<div class="main-container">
  <figure class="logo-container">
    <img src="assets/images/logo.svg" alt="conto logo" />
    <figcaption>
      The conto logo as a SVG image in white color.
    </figcaption>
  </figure>

  <div class="input-container">
    <label for="document">Document</label>
    <input id="document" class="document" type="text" />
  </div>

  <button class="next">Next</button>
</div>

<style>
  :global(*) {
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  :global(body) {
    background-color: #c4c3c1;
    padding: 1rem;
  }

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

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo-container figcaption {
    display: none;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    width: 100%;
  }

  .document {
    padding: .5rem;
    border-radius: .5rem;
    outline: none;
    font-size: 1rem;
  }

  .next {
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

  .next:hover {
    opacity: .5;
  }
</style>
