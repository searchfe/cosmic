<script lang="ts">
  import { Select, Icon } from '@cosmic/core/components';
  const items: any[] = [
    { value: 1, text: 'One' },
    { value: 2, text: 'Two' },
    { value: 3, text: 'Three' },
    { value: 4, text: 'Four' },
  ];

</script>

<div class="flex flex-row items-center">
  <Icon>search</Icon>
  <Select items="{items}" />
</div>
