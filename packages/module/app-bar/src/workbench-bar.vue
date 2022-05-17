<script lang="ts" setup>
import { service, inject } from '@cosmic/core/browser';
import { Button, Menu, MenuOption } from 'cosmic-vue';
import buttonText from './workbench-button.module.css';
import { WorkbenchBarService, type WorkbenchBarItem } from './workbench-bar.service';
import { ref, onBeforeMount } from 'vue';



const routerService = inject<service.RouterService>(service.TOKENS.Router);
const userService = inject<service.UserService>(service.TOKENS.User);

const user = ref({});

userService.user.subscribe(u => {
    user.value = u;
});

const workbenchBarService = inject(WorkbenchBarService);

const configs = ref<WorkbenchBarItem []>([]);
const selectedId = ref();

workbenchBarService.getConfigs().subscribe(currentConfig => {
    configs.value = currentConfig;
    const first = currentConfig[0]?.id;
    if (first && !selectedId.value) {
        selectedId.value = first;
    }
});

onBeforeMount(async () => {
    const lastRoute = JSON.parse(localStorage.getItem('route') || '{}') as { name: string };
    if (lastRoute.name && routerService.currentRoute().name !== lastRoute.name) {
        await changeRoute(lastRoute.name, true);
    }
});

function changeRoute(id: string, replace = false) {
    const to = { name: id };
    selectedId.value = id;
    localStorage.setItem('route', JSON.stringify(to));
    if (replace) {
        return routerService.replace(to);
    } else {
        return routerService.push(to);
    }
}

const menuData = [{
    label: '退出',
    value: '1',
}];

function onClickUser(data: { value: string } = { value: '' }) {
    if (data.value === '1') {
        userService.logout();
    }
}
</script>

<template>
    <div class="flex justify-start mr-16  items-center">
        <Button
            v-for="(config, index) in configs" :key="index"
            size="xs"
            :class="[config.id === selectedId ? 'active': '', 'min-w-70 mx-1']"
            :styles="buttonText"
            @mousedown="changeRoute(config.id)"
        >
            {{ config.text }}
        </Button>
        <Menu size="xs" value="2" :class="$style.menu" @on-change="onClickUser">
            <template #activator>
                <div class="flex items-center">
                    <img v-if="user.token" :class="$style.avatar" class="ml-10 rounded-full mr-6" src="https://erp.baidu.com/avatar/getAvatar?appCode=ERP&uuap=biyingshuai&token=HNURPZHFZC" alt="avatar">
                    <div class="text-sm" :class="$style.username">{{ user.name || '登录' }}</div>
                </div>
            </template>
            <MenuOption v-for="data of menuData" :key="data.value" :value="data.value" :label="data.label" :has-check="false" />
        </Menu>
    </div>
</template>

<style module>
.logo {
  color: #D8D8D8;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  border-radius: 0.4rem;
}
.logo:hover {
    background: #424242;
}
.username {
    color: var(--color-white);
}
.avatar {
    width: 16px;
    height: 16px;
}
</style>
