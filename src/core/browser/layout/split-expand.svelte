<script>
    export let show = true;
</script>

<div class="split-expand" style="display:{show? '': 'none'}">

</div>

<style>
.split-expand{
    position: absolute;
    right:-3px;
    bottom: 0px;
    width: 10px;
    height: 10px;
    cursor: crosshair;
    z-index: 9;
}
</style>