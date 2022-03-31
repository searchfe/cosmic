<script lang="ts" setup>

const themes = ['theme-red', 'theme-green', 'theme-cyan'];
function changeTheme(theme: string) {
    document.querySelector('.board-test')?.classList.remove(...themes);
    if (theme) document.querySelector('.board-test')?.classList.add(theme);
}
function changeMode(mode: string) {
    if (mode) {
        document.querySelector('.board-test')?.classList.add(mode);
    } else {
        document.querySelector('.board-test')?.classList.remove('cos-mode-dark');
    }
}
</script>
<template>
    <section class="wrapper">
        <div class="primary">
            <div class="default" @click="changeTheme('')" />
            <div class="theme-red" @click="changeTheme('theme-red')" />
            <div class="theme-green" @click="changeTheme('theme-green')" />
            <div class="theme-cyan" @click="changeTheme('theme-cyan')" />
        </div>
        <div class="theme">
            <i-cosmic-sun class="light" @click="changeMode('')" />
            <i-cosmic-night class="dark" @click="changeMode('cos-mode-dark')" />
        </div>
    </section>
</template>
<style scoped>
.wrapper {
    position: absolute;
    top: 2rem;
    right: 1rem;
    text-align: right;
}
@media screen and (max-width: 860px) {
    .wrapper {
        width: 320px;
    }
}
@media screen and (max-width: 680px) {
    .wrapper {
        position: static;
    }
}
.primary > div{
    display: inline-block;
    cursor: pointer;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary-500);
    margin-right: 0.5rem;
    opacity: 0.7;
        vertical-align: middle;
}
.primary > div:hover {
    opacity: 1;
}
.primary , .theme{
    display: inline-block;
    margin-right: 1rem;
}
.theme > * {
    cursor: pointer;
    font-size: 2.2rem;
    border-radius: 0.5rem;
    opacity: 0.7;
    margin-right: 0.5rem;
    vertical-align: middle;
}
.theme > *:hover {
    opacity: 1;
}
.dark {
    color: var(--color-white);
    background: var(--color-black);
}
.light {
    color: var(--color-black);
    background: var(--color-white);
}

</style>
<style>
.theme-red{
    --color-primary-50: #fff1f2;
    --color-primary-100: #ffe4e6;
    --color-primary-200: #fecdd3;
    --color-primary-300: #fda4af;
    --color-primary-400: #fb7185;
    --color-primary-500: #f43f5e;
    --color-primary-600: #e11d48;
    --color-primary-700: #be123c;
    --color-primary-800: #9f1239;
    --color-primary-900: #881337;
}

.theme-green{
    --color-primary-50: #f7fee7;
    --color-primary-100: #ecfccb;
    --color-primary-200: #d9f99d;
    --color-primary-300: #bef264;
    --color-primary-400: #a3e635;
    --color-primary-500: #84cc16;
    --color-primary-600: #65a30d;
    --color-primary-700: #4d7c0f;
    --color-primary-800: #3f6212;
    --color-primary-900: #365314;
}

.theme-cyan{
    --color-primary-50: #f0fdfa;
    --color-primary-100: #ccfbf1;
    --color-primary-200: #99f6e4;
    --color-primary-300: #5eead4;
    --color-primary-400: #2dd4bf;
    --color-primary-500: #14b8a6;
    --color-primary-600: #0d9488;
    --color-primary-700: #0f766e;
    --color-primary-800: #115e59;
    --color-primary-900: #134e4a;
}
</style>
