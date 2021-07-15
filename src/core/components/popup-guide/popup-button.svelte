<script>
    export let text='';
    export let shortcutKey='';
    /** from https://fonts.google.com/icons */
    export let icon='';
</script>
<div class="inline-block z-10 py-3 px-4 min-w-28 w-auto text-xs 
            font-normal text-gray-50 dark:text-gray-200 
            bg-cgray-400  dark:bg-cgray-600 hover:bg-cgray-500 opacity-90 hover:opacity-100
            hover:shadow shadow  rounded  button
            active:bg-active select-none">
    {#if icon}
        <i class="float-left material-icons material-icons-round icon pr-1 min-w-min leading-none">{icon}</i>
    {/if}
    <span class="float-left pr-4">{text}</span>
    <span class="pl-4 float-right opacity-50">{shortcutKey}</span>
</div>
<style>

</style>