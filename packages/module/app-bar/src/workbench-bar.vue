<script lang="ts" setup>
import { inject } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { Button } from 'cosmic-vue';
import buttonText from './workbench-button.module.css';
import { WorkbenchBarService, type WorkbenchBarItem } from './workbench-bar.service';
import { ref } from 'vue';

const routerService = inject(service.RouterService);
const workbenchBarService = inject(WorkbenchBarService);

function onButtonClicked(id: string) {
    routerService.push({name: id});
    selectedId.value = id;
}
const configs = ref<WorkbenchBarItem []>();
const selectedId = ref();

workbenchBarService.getConfigs().subscribe(c => {
    configs.value = c;
    if (!selectedId.value) selectedId.value = c[0].id;
});
</script>
<template>
    <div class="flex justify-start mr-16">
        <Button
            v-for="(config, index) in configs" :key="index"
            size="xs"
            :class="[config.id === selectedId ? 'active': '', 'min-w-70 mx-1 mt-4']"
            :styles="buttonText"
            @mousedown="onButtonClicked(config.id)"
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
