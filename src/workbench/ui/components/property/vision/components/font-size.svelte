<script lang="ts">
    import {TextField, Icon} from '@cosmic/core/components';
    export let fontSize:string;
    let isVisibility = true;
    let classes = 'mt-2 mb-2 relative text-gray-600 dark:text-gray-100 w-28';
    function fontSizeChangeHandle(event) {
        let thisFontSize:string = event.target.value;
        fontSize = thisFontSize === fontSize ? fontSize : thisFontSize;
    }
</script>

<div class="flex items-center px-4 justify-around">
    <div class="flex items-center">
      <div class="h-7 w-16 mr-4 text-sm flex items-center">字号:</div>
      <TextField on:change="{fontSizeChangeHandle}" classes="{classes}" value="{fontSize}" />
    </div>
    <Icon class="cursor-pointer" on:click="{() => (isVisibility = !isVisibility)}"
      >{isVisibility ? 'visibility' : 'visibility_off'}</Icon
    >
    <Icon class="cursor-pointer">remove</Icon>
  </div>