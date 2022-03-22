
<template>
    <div
        :class="$style.px"
    >
        <slot />
    </div>
</template>

<style module>
.px {
    padding: 0 2rem
}
</style>