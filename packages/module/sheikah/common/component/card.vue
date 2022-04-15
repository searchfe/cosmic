<template>
    <div :class="$style.card">
        <slot />
    </div>
</template>

<style module>
.card {
    position: relative;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
}
.card:hover {
    box-shadow: 1px 4px 6px 0 rgba(0, 0, 0, 0.1);
}
.card:active {
    opacity: .7;
}
</style>
