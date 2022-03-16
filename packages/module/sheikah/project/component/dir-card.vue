<script lang="ts" setup>
    import { Button } from 'cosmic-vue';
    import Card from '../../common/component/card.vue';

    interface Props {
        id: string;
        name: string;
        team: string;
        img: string;
    }

    withDefaults(defineProps<Props>(), {
        id: '',
        name: '',
        team: '',
        img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069',
    });

</script>

<template>
    <Card :class="$style['card']">
        <div :class="$style['card-content']">
            <div :class="$style['card-info']">
                <div :class="$style['card-name']">
                    {{ name }}
                </div>
                <div style="flex: none;">
                    20个
                </div>
                <div :class="$style['card-more']">
                    <Button icon="more_horiz" />
                </div>
            </div>
            <div :class="$style['card-preview']">
                <div class="col-span-7 row-span-2">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
                <div class="col-span-5">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
                <div class="col-span-5">
                    <img
                        :src="img"
                        alt=""
                    >
                </div>
            </div>
        </div>
    </Card>
</template>

<style module>
.card {
    overflow: hidden;
    height: 0;
    padding-bottom: 66.66667%;
    border-radius: 8px;
}
.card-content {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
}
.card-info {
    height: 26%;
    width: 100%;
    display: flex;
    align-items: center;
}
.card-name {
    flex: auto;
    font-size: 16px;
}
.card-more {
    margin-left: 5px;
    flex: none;
}
.card-preview {
    overflow: hidden;
    flex: auto;
    margin-top: 12px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    /* grid grid-cols-12 gap-2 */
}
.card-preview img {
    width: 100%;
    height: 100%;
}
</style>
