<script lang="ts" setup>
import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { Button } from 'cosmic-vue';
import buttonText from './workbench-button.module.css';
import { WorkbenchBarService, type WorkbenchBarItem } from './workbench-bar.service';
import { ref, onBeforeMount } from 'vue';

const routerService = inject<service.RouterService>(service.TOKENS.Router);
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

async function changeRoute(id: string, replace = false) {
    const to = { name: id };
    selectedId.value = id;
    localStorage.setItem('route', JSON.stringify(to));
    if (replace) {
        return routerService.replace(to);
    } else {
        return routerService.push(to);
    }
}

</script>

<template>
    <div class="flex justify-start mr-16">
        <Button
            v-for="(config, index) in configs" :key="index"
            size="xs"
            :class="[config.id === selectedId ? 'active': '', 'min-w-70 mx-1 mt-4']"
            :styles="buttonText"
            @mousedown="changeRoute(config.id)"
        >
            {{ config.text }}
        </Button>
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
</style>
