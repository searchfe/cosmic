<script lang="ts" setup>
import { ref } from 'vue';
 import { IImage, IAvatar, IImageList } from '@cosmic/core/browser';
 import { Select, SelectOption, Input } from 'cosmic-vue';

import { Images, Avatars } from './data';


const imageSrc = ref('https://t15.baidu.com/it/u=4099293214,170987867&fm=30&app=106&size=r3,2&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1DC5A9444B81017E1243B9010300E099');

const isShowAvatar = ref('1');
const avatar = ref('https://gimg3.baidu.com/search/src=https%3A%2F%2Fpic.rmb.bdstatic.com%2F25128e15d012d3a2da58101a57c98709.png&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=b45,45&n=0&g=0n&er=404&q=75&fmt=auto&maxorilen2heic=2000000');
const avatarTitle = ref('极兔测试');

const imageList = ref(Images.filter((_, index) => index < 3).map(item => item.value));

const style = {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
};

function chngeImageList(images: string[], index: number, event: {value: string}) {
    imageList.value[index] = event.value;
    console.log(images);
}

</script>

<template>
    <div class="m-12" :class="$style.content">
        <h1>图片切换</h1>
        <div class="flex justify-between items-center">
            <span class="mr-8">图片地址：</span>
            <div>
                <Select
                    size="sm"
                    :value="imageSrc"
                    @on-change="(event) => imageSrc = event.value"
                >
                    <select-option
                        v-for="item of Images"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </Select>
            </div>
        </div>
        <h1>图片集合</h1>
        <div>
            <div class="flex justify-between items-center mb-8">
                <span class="mr-8">图片1：</span>
                <div>
                    <Select
                        size="sm"
                        :value="imageList[0]"
                        @on-change="(event) => chngeImageList(imageList, 0, event)"
                    >
                        <select-option
                            v-for="item of Images"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </Select>
                </div>
            </div>
            <div class="flex justify-between items-center mb-8">
                <span class="mr-8">图片2：</span>
                <div>
                    <Select 
                        size="sm"
                        :value="imageList[1]"
                        @on-change="(event) => chngeImageList(imageList, 1, event)"
                    >
                        <select-option
                            v-for="item of Images"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </Select>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="mr-8">图片3：</span>
                <div>
                    <Select 
                        size="sm"
                        :value="imageList[2]"
                        @on-change="(event) => chngeImageList(imageList, 2, event)"
                    >
                        <select-option
                            v-for="item of Images"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </Select>
                </div>
            </div>
        </div>

        <h1>头像</h1>
        <div>
            <div class="flex justify-between items-center mb-8">
                <span class="mr-8">标题: </span>
                <div>
                    <Input 
                        size="sm"
                        placeholder="请输入标题"
                        :value="avatarTitle"
                        @on-input="event => avatarTitle = event.value"
                    />
                </div>
            </div>
            <div class="flex justify-between items-center mb-8">
                <span class="mr-8">是否隐藏头像</span>
                <div>
                    <Select
                        :value="isShowAvatar"
                        @on-change="(event) => isShowAvatar = event.value"
                    >
                        <select-option value="1" label="是" />

                        <select-option value="0" label="否" />
                    </Select>
                </div>
            </div>
            <div class="flex justify-between items-center mb-8">
                <span class="mr-8">头像: </span>
                <div>
                    <Select 
                        size="sm"
                        :value="avatar"
                        @on-change="(event) => avatar = event.value"
                    >
                        <select-option
                            v-for="item of Avatars"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </Select>
                </div>
            </div>
        </div>
    </div>

    <div class="m-12">
        <h1>图片</h1>
        <div class="h-80">
            <i-image :src="imageSrc" />
        </div>

        <h1>图片集</h1>
        <div class="h-50">
            <IImageList :style="style" :images="imageList" />
        </div>

        <h1>头像</h1>
        <i-avatar 
            :is-show-avatar="isShowAvatar === '1'"
            :src="avatar"
            :title="avatarTitle"
        />
    </div>
</template>

<style module>
.content {
    font-size: 1.2rem;
}
</style>