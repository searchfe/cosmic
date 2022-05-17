<script lang="ts" setup>
import { ref } from 'vue';
import { Input, Dialog, Button, Space } from 'cosmic-vue';
import { useRoute } from '@cosmic/core/router';
import CompFilter from '../component/filter.vue';
import Region from '../../common/component/region.vue';
import { service, inject } from '@cosmic/core/browser';
import CompCard from '../component/card/comp.vue';

import { type QueryComponentResult, createFetchTeamComponentsRequest } from '@cosmic/core/parts';
// import { inject, type QueryComponentResult, createFetchTeamComponentsRequest, deleteComponentQuery } from '@cosmic/core/parts';
import { useQuery } from '@cosmic/core/urql';

// const { useQuery, useMutation } = urql;

const routerService = inject<service.RouterService>(service.TOKENS.Router);
const componentService = inject<service.ComponentService>(service.TOKENS.Component);
const route = useRoute();
const team = route.query.team as string;
const createComponentDialogIsOpenRef = ref(false);
const newComponentNameRef = ref('');
const componentsRef = ref<QueryComponentResult[]>();
const imgMap = {
    '文本段落': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-1%E6%96%87%E6%9C%AC%E6%AE%B5%E8%90%BD%20%20x4.png',
    '单图': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-2%E5%8D%95%E5%9B%BE%20%20x4.png',
    '图集': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-3%E5%9B%BE%E9%9B%86%20%20x4.png',
    '来源': 'https://fe-dev.bj.bcebos.com/%E7%BB%84%E4%BB%B6%E5%88%97%E8%A1%A8-4%E6%9D%A5%E6%BA%90%20%20x4.png',
};

const { executeQuery: fetchTeamComponents } = useQuery(createFetchTeamComponentsRequest({ team }));

fetchTeamComponents().then(({ data }) => data.value!.components).then(data => {
    componentService.components.next(data);
});

// const { executeMutation: deleteComponentMutation } = useMutation<
//     { deleteComponentByTeamAndName: number },
//     { data: gql.QueryComponentDTO }
// >(deleteComponentQuery);

componentService.components.subscribe(next => {
    componentsRef.value = next;
});

componentService.component.subscribe(next => {
    let isNew = true;
    componentsRef.value = componentsRef.value?.map(i => {
        if (i.name === next.name) {
            isNew = false;
            return next;
        }
        return i;
    });
    if (isNew) {
        componentsRef.value?.push(next);
    }
});

function onClickComp(component: QueryComponentResult) {
    routerService.push({ name: 'blueprint', params: { raw: JSON.stringify({ ...component, team }) } });
}

function addComponent() {
    routerService.push({ name: 'blueprint', params: { team, name: newComponentNameRef.value } });
    createComponentDialogIsOpenRef.value = false;
}

// function deleteComponent(name: string) {
//     deleteComponentMutation({ data: { team, name } }).then(({ data }) => {
//         const cnt = data?.deleteComponentByTeamAndName;
//         if (cnt === 1) {
//             fetchTeamComponents().then(({ data }) => data.value!.components).then(data => {
//                 componentService.components.next(data);
//             });
//         }
//     });
// }
</script>
<template>
    <Region title="组件">
        <div class="flex flex-start" :class="$style.filter">
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
            <div class="flex justify-end items-center">
                <!-- <Input placeholder="组件查询" :class="$style.input" /> -->
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
        <div :class="$style['card-list']">
            <section v-for="i, index of componentsRef" :key="index" :class="['relative', $style.card]">
                <comp-card
                    :name="i.displayName || '图集'"
                    :meta="[i.name, i.desc]"
                    :img="imgMap[i.displayName || '图集']"
                    @click="onClickComp(i)"
                />
                <!-- <i-cosmic-close
                    :class="['absolute', $style['card-delete']]"
                    @click="deleteComponent(i.name)"
                /> -->
            </section>
        </div>
    </Region>
    <Dialog
        v-model:visible="createComponentDialogIsOpenRef"
        :show-close-icon="false"
        title="创建组件"
        :class="$style.dialog"
    >
        <section class="my-12 flex justify-between items-center">
            <Input v-model:value="newComponentNameRef" placeholder="请输入组件名称" />
        </section>
        <template #actions>
            <Space justify="end" class="w-full">
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
.card:not(:hover) .card-delete {
    display: none;
    width: 240px;
    height: 230px;
}
.card-delete {
    top: 1.2rem;
    right: 1.2rem;
    color: #e11d48;
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

.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}

.dialog {
    box-shadow: 1px 4px 6px #0000001a;
}
</style>
