<script lang="ts">
  import { Card } from '../../../../../core/components';
  export let title = '';
  export let text = '';

</script>

<div class="mx-2 ">
  <Card>
    <div slot="title">
      {#if !!title}
        {title}
      {/if}
    </div>
    <div slot="media">
      <img src="https://placekitten.com/60/60" alt="" />
    </div>
    <div slot="text" class="py-1 flex justify-center items-center text-sm">
      {text}
    </div>
  </Card>
</div>
