<script>
  import { scale } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';
  import { Scrim } from 'smelte/src/components/Util/index.js';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  const classesDefault = 'box-border text-black items-center z-50 rounded-3xl bg-white p-24 shadow-dialog';
  const titleClassesDefault = 'text-h2 font-bold pb-16';
  const actionsClassesDefault = 'w-full';

  export let value;
  export let classes = '';
  export let titleClasses = '';
  export let actionsClasses = '';
  export let opacity = 0.5;
  export let persistent = false;
  export let width = 'auto';
  export let height = 'auto';

  export let transitionProps = { duration: 150, easing: quadIn, delay: 150 };

  const cb = new ClassBuilder(classesDefault);
  const tcb = new ClassBuilder(titleClassesDefault);
  const acb = new ClassBuilder(actionsClassesDefault);

  $: c = cb.flush().add(classes, true, classesDefault).get();

  $: t = tcb.flush().add(titleClasses, true, actionsClassesDefault).get();

  $: a = acb.flush().add(actionsClasses, true, actionsClassesDefault).get();
</script>

<div class="fixed w-full h-full top-0 left-0 z-30" class:hidden="{!value}">
  <Scrim opacity="{opacity}" on:click="{() => !persistent && (value = false)}" />
  <div class="h-full w-full absolute flex items-center justify-center">
    <div in:scale="{transitionProps}" class="{c}" style="width: {width}; height: {height}">
      <div class="{t}">
        <slot name="title" />
      </div>
      <slot />
      <div class="{a}">
        <slot name="actions" />
      </div>
    </div>
  </div>
</div>
