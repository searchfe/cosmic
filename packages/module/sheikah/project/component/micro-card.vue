<script lang="ts" setup>
    import { router as vueRouter } from '@cosmic/core/browser';
    import Card from '../../common/component/card.vue';
    import Dropdown from '../../common/component/dropdown.vue';


    interface Props {
        id: string;
        team: string;
        avatar: string;
        users: string[];
        info: string;
        name: string;
    }

    const { useRouter } = vueRouter;
    const router = useRouter();

    const props = withDefaults(defineProps<Props>(), {
        info: '协作 30',
        name: '项目名称',
        users: () => [
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F01.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F02.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F03.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F04.png',
        ],
        id: '',
    });

    const emits = defineEmits(['delete']);

    const menuData = [{
        label: '新建分组',
        id: '1',
    }, {
        label: '信息设置',
        id: '2',
    }, {
        label: '复制项目',
        id: '3',
    }, {
        label: '删除项目',
        id: '4',
    }];

    function projectClickHandler() {
        router.push({
            name: 'project:detail',
            query: { project: props.id, team: props.team },
        });
    }

    function onDropdownChange(data: { id: string }) {
        if (data.id === '4') {
            emits('delete', { id: props.id });
        }
    }
</script>

<template>
    <Card
        :class="$style.card"
        @click.stop="projectClickHandler"
    >
        <div :class="$style['card-img']">
            {{ (name || 'P')[0] }}
        </div>
        <div class="text-lg" :class="$style['card-name']">
            {{ name }}
        </div>
        <div :class="$style['card-info']">
            <div :class="$style['card-user-list']">
                <img
                    v-for="user in users"
                    :key="user"
                    class="mr-8"
                    :class="$style['card-user-img']"
                    :src="user"
                    alt=""
                >
            </div>
            <div class="flex items-center h-full">
                {{ info }}
            </div>
        </div>
        <div
            :class="$style['card-more']"
            class="flex items-center justify-center"
            @click.stop="() => {}"
        >
            <Dropdown :data="menuData" @change="onDropdownChange" />
        </div>
    </Card>
</template>

<style module>
.card {
    position: relative;
    overflow: visible;
    padding-bottom: 60%;
    height: 0;
    font-size: 12px;
}
.card-img {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    overflow: hidden;
    background: url(https://fe-dev.bj.bcebos.com/%E9%A1%B9%E7%9B%AE%E8%83%8C%E6%99%AF%E5%9B%BE.png);
    background-size: 100%;
    color: #fff;
    font-size: 20px;
}
.card-name {
    position: absolute;
    left: 12px;
    top: 62px;
    height: 20px;
    line-height: 20px;
    width: 129px;
    color: #1f1f1f;
    font-weight: var(--font-normal);
}
.card-info {
    position: absolute;
    left: 0px;
    bottom: 12px;
    box-sizing: border-box;
    padding-left: 14px;
    padding-right: 12px;
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.card-user-list {
    display: flex;
    justify-content: space-between;
    height: 24px;
    margin-right: 6px;
}
.card-user-img {
    width: 24px;
    height: 24px;
    border: 1px solid #f5f5f5;
    border-radius: 50%;
}
.card-more {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #f5f5f5;
    width: 25px;
    height: 25px;
    border-radius: var(--rounded-md);
}
.menu {
    border-radius: 8px;
}
.menu-option {
    width: 88px;
    height: 30px;
}
</style>
