<script lang="ts" setup>
    // import { push } from 'svelte-spa-router';
    // import { urlFor, ROUTES } from '../../routes';
    import Card from '../../common/component/card.vue';

    interface Props {
        avatar: string;
        users: string[];
        info: string;
        name: string;
    }

    withDefaults(defineProps<Props>(), {
        avatar: 'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%9B%BE%E6%A0%8740*40.png',
        info: '协作 30',
        name: '项目名称',
        users: () => [
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F01.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F02.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F03.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F04.png',
            'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F05.png',
        ],
    });

    function projectClickHandler() {
        // push(urlFor(ROUTES.PROJECT_DETAIL, { projectId: data.id }));
    }
</script>

<template>
    <Card
        :class="$style.card"
        @click.stop="projectClickHandler"
    >
        <img
            :class="$style['card-img-container']"
            :src="avatar"
            alt="projcet avatar"
        >
        <div :class="$style['card-name']">
            {{ name }}
        </div>
        <div :class="$style['card-info']">
            <div :class="$style['card-user-list']">
                <img
                    v-for="user in users"
                    :key="user"
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
        >
            <i-cosmic-more style="font-size: 20px" />
        </div>
    </Card>
</template>

<style module>
.card {
    position: relative;
    overflow: hidden;
    padding-bottom: 40.7%;
    height: 0;
    font-size: 12px;
}
.card-img-container {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    top: 12px;
    left: 12px;
    border-radius: 4px;
}
.card-name {
    position: absolute;
    left: 12px;
    top: 62px;
    height: 16px;
    width: 129px;
    color: #1f1f1f;
    font-weight: 700;
}
.card-info {
    position: absolute;
    left: 0px;
    bottom: 12px;
    box-sizing: border-box;
    padding: 0 14px;
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
    width: 26px;
    height: 26px;
    border-radius: var(--rounded-md);
}
</style>
