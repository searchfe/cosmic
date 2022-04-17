<script lang="ts" setup>
import { ref } from 'vue';
import { Input, Button } from 'cosmic-vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';


const rootRouterService = inject<service.RouterService>(service.TOKENS.Router);
const userService = inject<service.UserService>(service.TOKENS.User);

const username = ref('');
const password = ref('');
const redirect = JSON.parse(localStorage.getItem('redirect') || '{"path":"/"}');
localStorage.removeItem('redirect');


function onLogin() {
    userService.login({
        username: username.value, password: password.value,
    }).then(() => {
        rootRouterService.replace(redirect);
    });
}
</script>

<template>
    <Layout>
        <div class="w-full h-full relative" :class="$style.page">
            <div class="flex flex-col items-center box-border" :class="$style.login">
                <div :class="$style.logo">
                    <img class="w-full h-full" src="https://fe-dev.bj.bcebos.com/login-logo.png" alt="logo">
                </div>
                <div class="text-2xl font-medium" :class="$style.title">欢迎登陆无极</div>
                <Input v-model:value="username" placeholder="请输入账号/邮箱" class="w-full mt-30 mb-12" :class="$style.input" />
                <Input v-model:value="password" type="password" placeholder="请输入密码" class="w-full mb-24" :class="$style.input" />
                <Button type="primary" class="w-full" size="lg" @click="onLogin">登陆</Button>
            </div>
        </div>
    </Layout>
</template>

<style module>
.page {
    background: #f3f3f3;
}
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 384px;
    height: 376px;
    padding: 45px 70px 60px;
    background: var(--color-white);
    border-radius: 8px;
}
.logo {
    margin-top: 18px;
    width: 48px;
    height: 48px;
}
.title {
    margin-top: 18px;
    height: 28px;
    line-height: 28px;
}
.input {
    border: 1px solid #e0e0e0;
}
</style>
