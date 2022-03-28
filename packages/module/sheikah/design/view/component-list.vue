<script lang="ts" setup>
import { ref } from 'vue';
import { Input, Dialog, Button, Space } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import CompCard from '../component/card/comp.vue';
import CompFilter from '../component/filter.vue';
import Region from '../../common/component/region.vue';
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';

const { useRouter, useRoute } = vueRouter;

const routerService = inject<service.RouterServiceAPI>(service.TOKENS.Router);
const router = useRouter();
const route = useRoute();
const createComponentDialogIsOpenRef = ref(false);
const newComponentNameRef = ref('');

function onClickComp() {
    router.push({ name: 'component:detail' });
}

function addComponent() {
    const team: string = route.query.team;
    routerService.push({ name: 'blueprint', params: { team, name: newComponentNameRef.value } });
}
</script>
<template>
    <Region title="组件">
        <div class="flex flex-start">
            <comp-filter text="基础类" num="82">
                <template #icon>
                    <i-cosmic-scale />
                </template>
                <template #hover-icon>
                    <i-cosmic-scale style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="布局类" num="13">
                <template #icon>
                    <i-cosmic-layout />
                </template>
                <template #hover-icon>
                    <i-cosmic-layout style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="展示类" num="20">
                <template #icon>
                    <i-cosmic-contain />
                </template>
                <template #hover-icon>
                    <i-cosmic-contain style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="输入类" num="8">
                <template #icon>
                    <i-cosmic-input />
                </template>
                <template #hover-icon>
                    <i-cosmic-input style="color: white;" />
                </template>
            </comp-filter>
            <comp-filter text="反馈类" num="12">
                <template #icon>
                    <i-cosmic-feedback />
                </template>
                <template #hover-icon>
                    <i-cosmic-feedback style="color: white;" />
                </template>
            </comp-filter>
        </div>
        <template #bottom>
            <div class="flex justify-between items-center">
                <Input placeholder="组件查询" :class="$style.input" />
                <div
                    :class="$style.add"
                    class="flex justify-center items-center"
                    @click="createComponentDialogIsOpenRef = true"
                >
                    <i-cosmic-plus class="text-md" />
                </div>
            </div>
        </template>
    </Region>
    <Region inverse>
        <div :class="$style['card-list']" @click="onClickComp">
            <comp-card />
            <comp-card />
            <comp-card />
            <comp-card />
        </div>
    </Region>
    <Dialog v-model:visible="createComponentDialogIsOpenRef" :show-close-icon="false" title="创建组件">
        <div class="my-12 flex justify-between items-center">
            <span style="flex-shrink: 0;">名称</span>
            <Input v-model:value="newComponentNameRef" size="sm" placeholder="起个名字吧" />
        </div>
        <template #actions>
            <Space justify="end">
                <Button
                    @click="createComponentDialogIsOpenRef = false; newComponentNameRef = '';"
                >
                    取消
                </Button>
                <Button @click="addComponent">确定</Button>
            </Space>
        </template>
    </Dialog>
</template>
<style module>
.card-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
.input {
    width: 268px;
    border: 1px solid #1f1f1f;
    border-radius: 4px;
    opacity: 0.3;
}
.add {
    height: 36px;
    width: 36px;
    border-radius: 4px;
    background: #f5f5f5;
}
@media (min-width: 960px) {
    .card-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .card-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1920px) {
    .card-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
</style>
