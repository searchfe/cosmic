<style>
  .split-expand {
    position: absolute;
    right: -7.5px;
    bottom: -10px;
    width: 15px;
    height: 20px;
    cursor: crosshair;
    z-index: 9;
  }
  .split-merge {
    display: none;
    position: absolute;
    width: 40%;
    height: 40%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .merge-n {
    display: block;
    left: 50%;
    bottom: 0;
    margin-left: -20%;
    margin-top: -20%;
    background-position: center bottom;
  }
  .merge-s {
    display: block;
    transform: rotate(180deg);
    left: 50%;
    top: 0;
    margin-left: -20%;
    background-position: center bottom;
  }
  .merge-w {
    display: block;
    transform: rotate(180deg);
    right: 0;
    top: 50%;
    margin-top: -20%;
    background-position: left center;
  }
  .merge-e {
    display: block;
    left: 0;
    top: 50%;
    margin-top: -20%;
    background-position: left center;
  }
</style>

<script>
  export let expandHidden = false;
  export let mergeDirection = '';
</script>

<div class="split-expand" class:hidden="{expandHidden}"></div>

<div
  class="split-merge max-w-20"
  class:merge-w="{mergeDirection == 'merge-w'}"
  class:merge-e="{mergeDirection == 'merge-e'}"
  class:merge-n="{mergeDirection == 'merge-n'}"
  class:merge-s="{mergeDirection == 'merge-s'}"
></div>
