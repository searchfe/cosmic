<script>
  import { Icon, Select } from '@cosmic/core/components';
  let isVisibility = true;
  export let title = '';
  export let atom = [
    { value: 1, text: 'CM01' },
    { value: 2, text: 'CM02' },
    { value: 3, text: 'CM03' },
    { value: 4, text: 'CM03' },
  ]
  let value = ''
</script>
<div class="grid grid-cols-5 px-4">
    <div class="col-span-1 flex items-center pr-4 justify-end">
        {title}
    </div>
    <div class="col-span-2 flex items-center">
        <Select items={atom} on:bind="{value}"/>
    </div>
    <div class="col-span-2 flex items-center pl-4 justify-around">
        <Icon class="cursor-pointer" on:click="{() => (isVisibility = !isVisibility)}"
            >{isVisibility ? 'visibility' : 'visibility_off'}</Icon
          >
          <Icon class="cursor-pointer">remove</Icon>
    </div>
</div>