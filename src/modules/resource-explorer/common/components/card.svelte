<script lang="typescript">
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  const defaultCardClasses = 'w-full relative hover:shadow-card bg-white rounded-3xl active:shadow-none active:opacity-70';

  const cardClassesBuilder = new ClassBuilder(defaultCardClasses);

  export let classes = 'overflow-hidden';

  $: cardComputedClass = cardClassesBuilder
    .flush()
    .add(classes)
    .get();

</script>

<div class={cardComputedClass} on:click>
  <slot />
</div>
