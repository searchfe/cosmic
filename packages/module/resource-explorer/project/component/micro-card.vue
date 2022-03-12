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
        name: '',
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
        <div :class="$style['card-img-container']">
            <img
                :class="$style['card-img']"
                :src="avatar"
                alt="projcet avatar"
            >
        </div>
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
            <div>
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
    padding: 0 14px 50%;
    height: 0;
    font-size: 12px;
}
.card-img-container {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 14px;
    padding-bottom: 25%;
    height: 0;
    width: 25%;
    border-radius: 4px;
}
.card-img {
    position: absolute;
    width: 100%;
    height: 100%;
}
.card-name {
    margin-top: 10px;
    height: 14px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
    font-weight: 700;
}
.card-info {
    position: absolute;
    left: 0;
    bottom: 14px;
    box-sizing: border-box;
    padding: 0 14px;
    width: 100%;
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
    top: 14px;
    right: 14px;
    background: #f5f5f5;
    width: 26px;
    height: 26px;
    border-radius: var(--rounded-md);
}
</style>
