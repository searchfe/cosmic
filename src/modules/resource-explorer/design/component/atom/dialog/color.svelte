<script lang="ts">
  import { Icon } from '@cosmic/core/components';

  export let data = {
    id: '',
    light: '#234567',
    dark: '#234567',
    night: '#234567',
  };
  

  const modes = [{
    name: 'light',
    icon: 'light_mode',
    outlined: true,
  }, {
    name: 'dark',
    icon: 'dark_mode',
    outlined: false,
  }, {
    name: 'night',
    icon: 'mode_night',
    outlined: true,
  }];


</script>

<div class="text-base">
  {#each modes as mode,index}
    <div class="pl-4 h-10 flex items-center mt-4">
      <Icon outlined="{mode.outlined}" xs>{mode.icon}</Icon>
      <div class="rounded w-15 h-15 ml-1.6 mr-3" style="background: {data[mode.name]}"></div>
      <div class="flex justify-start items-center">
        <input
          class="flex-1 input text-base rounded-xl"
          bind:value="{data[mode.name]}"
        />
      </div>
    </div>
  {/each}
</div>
