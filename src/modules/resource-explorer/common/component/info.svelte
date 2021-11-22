<script>
  export let title = '';
</script>

<div class="mb-40 p-20 bg-white rounded-xl text-h1">
  <div class="flex justify-start items-center">
    <span>{title}</span>
    <slot name="extra" />
  </div>
  <slot />
  <slot name="bottom" />
</div>
