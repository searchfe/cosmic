<script lang="ts">
  export let type = 'default';
  const handleClick = (event) => {
    console.log(type, event);
  };
</script>

<button class="b-button" on:click={handleClick}>
  <span>
    <slot />
  </span>
</button>

<style>
  .b-button {
    background-image: none;
    background-color: var(--bg-color, #1f1f1f);
    border: none;
    color: white;
    border-radius: 2px;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    height: 32px;
    line-height: 1.5715;
    padding: 4px 15px;
    position: relative;
    text-align: center;
    touch-action: manipulation;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    white-space: nowrap;
    outline: none;
    border-radius: 10%;
  }

  .b-button:active {
    border-color: var(--bg-color, #1f1f1f);
  }

  .b-button:focus {
    border-color: var(--bg-color, #1f1f1f);
  }
</style>
