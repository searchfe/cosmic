<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Input } from 'cosmic-vue';
import { useRouter } from '@cosmic/core/router';
import Region from '../../common/component/region.vue';
import AtomCard from '../component/card/atom.vue';
import AtomFilter from '../component/filter.vue';
import ColorDialog from '../component/dialog/atom/color.vue';
import FontDialog from '../component/dialog/atom/font.vue';

import { query as queryBorder } from '../api/border';
import { query as queryColor } from '../api/color';
import { query as queryShadow } from '../api/shadow';
import { query as queryOpacity } from '../api/opacity';
import { query as queryCorner } from '../api/corner';
import { query as queryFont } from '../api/font';

import type { UseQueryResponse } from '@cosmic/core/urql';
import type { AtomType } from '../types';


// TODO: 筛选功能把组件和原子抽象为一套组件, 数据请求部分抽象为通用函数，减少模版代码
// query api 拆分为每个原子，可以避免每次查询都声明使用的字段
// 可以创造一种机制，通过gql内省拿到数据类型，用户通过取对象的get方式，拿到数据，类似ORM
interface AtomData extends Record<string, any> {
    id?: string;
}

const dialogMap = {
    color: ColorDialog,
    font: FontDialog,
    border: ColorDialog,
    shadow: ColorDialog,
    corner: ColorDialog,
    opacity: ColorDialog,
};

const router = useRouter();
const currentType = ref<AtomType>('color');
const atoms = ref<AtomData[]>([]);

const {
    data: colorData,
    fetching: colorFetching,
    executeQuery: refreshColor,
} = queryColor({});

const {
    data: borderData,
    fetching: borderFetching,
    executeQuery: refreshBorder,
} = queryBorder({});

const {
    data: cornerData,
    fetching: cornerFetching,
    executeQuery: refreshCorner,
} = queryCorner({}, ['id', 'team', 'tl', 'tr', 'bl', 'br', 'name', 'desc']);

const {
    data: opacityData,
    fetching: opacityFetching,
    executeQuery: refreshOpacity,
} = queryOpacity({}, ['id', 'team', 'opacity', 'name', 'desc']);

const {
    data: shadowData,
    fetching: shadowFetching,
    executeQuery: refreshShadow,
} = queryShadow({}, ['id', 'team', 'type', 'offsetX', 'offsetY', 'blur', 'spread', 'color', 'name', 'desc']);

const {
    data: fontData,
    fetching: fontFetching,
    executeQuery: refreshFont,
} = queryFont({}, ['id', 'team', 'weight', 'size', 'lineHeight', 'family', 'name', 'desc']);

const refreshers: Record<AtomType, (opts?: any) => UseQueryResponse<unknown, unknown>> = {
    color: refreshColor,
    shadow: refreshShadow,
    border: refreshBorder,
    font: refreshFont,
    opacity: refreshOpacity,
    corner: refreshCorner,
};

watchEffect(() => {
    if (currentType.value === 'color' && colorData.value && !colorFetching.value) {
        atoms.value = colorData.value.colors.map(atom => {
            const { id, day, night, dark, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    day, night, dark,
                },
            };
        });
    }
    if (currentType.value === 'border' && borderData.value && !borderFetching.value) {
        atoms.value = borderData.value.borders.map(atom => {
            const { id, top, left, right, bottom, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    top, left, right, bottom,
                },
            };
        });
    }
    if (currentType.value === 'corner' && cornerData.value && !cornerFetching.value) {
        atoms.value = cornerData.value.corners.map(atom => {
            const { id, tl, tr, br, bl, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    tl, tr, br, bl,
                },
            };
        });
    }
    if (currentType.value === 'opacity' && opacityData.value && !opacityFetching.value) {
        atoms.value = opacityData.value.opacitys.map(atom => {
            const { id, opacity, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    opacity,
                },
            };
        });
    }
    if (currentType.value === 'font' && fontData.value && !fontFetching.value) {
        atoms.value = fontData.value.fonts.map(atom => {
            const { id, style, variant, weight, size, lineHeight, family, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    style, variant, weight, size, lineHeight, family,
                },
            };
        });
    }
    if (currentType.value === 'shadow' && shadowData.value && !shadowFetching.value) {
        atoms.value = shadowData.value.shadows.map(atom => {
            const { id, type, offsetX, offsetY, blur, spread, color, name, desc } = atom;
            return {
                id, name, desc,
                data: {
                    type, offsetX, offsetY, blur, spread, color,
                },
            };
        });
    }
});

function onItemClick(id: string) {
    if (id) {
        router.push({ name: 'atom:detail', query: { id, type: currentType.value } });
    }
}

function changeAtom(atom: AtomType) {
    currentType.value = atom;
}

function refresh() {
    refreshers[currentType.value]();
}

</script>

<template>
    <Region title="原子">
        <div class="flex items-center text-black w-full" :class="$style.filter">
            <atom-filter text="颜色" num="12" :selected="currentType==='color'" @click="changeAtom('color')">
                <template #icon>
                    <img class="w-40 h-40" src="https://fe-dev.bj.bcebos.com/Table-%E9%A2%9C%E8%89%B2%EF%BC%88%E6%9C%AA%E9%80%89%E4%B8%AD%EF%BC%89.png" alt="color">
                </template>
                <template #hover-icon>
                    <img class="w-40 h-40" src="https://fe-dev.bj.bcebos.com/Table-%E9%A2%9C%E8%89%B2.png" alt="color">
                </template>
            </atom-filter>
            <atom-filter text="字形" num="12" :selected="currentType==='font'" @click="changeAtom('font')">
                <template #icon>
                    <i-cosmic-text />
                </template>
                <template #hover-icon>
                    <i-cosmic-text style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="边角" num="12" :selected="currentType==='corner'" @click="changeAtom('corner')">
                <template #icon>
                    <i-cosmic-corner />
                </template>
                <template #hover-icon>
                    <i-cosmic-corner style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="边框" num="12" :selected="currentType==='border'" @click="changeAtom('border')">
                <template #icon>
                    <i-cosmic-border />
                </template>
                <template #hover-icon>
                    <i-cosmic-border style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="阴影" num="12" :selected="currentType==='shadow'" @click="changeAtom('shadow')">
                <template #icon>
                    <i-cosmic-shadow />
                </template>
                <template #hover-icon>
                    <i-cosmic-shadow style="color: white" />
                </template>
            </atom-filter>
            <atom-filter text="透明度" num="12" :selected="currentType==='opacity'" @click="changeAtom('opacity')">
                <template #icon>
                    <i-cosmic-intersection />
                </template>
                <template #hover-icon>
                    <i-cosmic-intersection style="color: white" />
                </template>
            </atom-filter>
        </div>
        <template #bottom>
            <Input placeholder="查询" class="w-200" style="border: 1px solid rgba(31, 31, 31, .1)" />
        </template>
        <template #rb-actions>
            <div class="flex justify-end">
                <component :is="dialogMap[currentType]" @success="refresh" />
            </div>
        </template>
    </Region>
    <Region inverse>
        <div :class="$style['atom-grid']">
            <div v-for="atom in atoms" :key="atom.id" @click="onItemClick(atom.id)">
                <atom-card v-bind="atom" :type="currentType" />
            </div>
        </div>
    </Region>
</template>

<style module>
.atom-grid {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
    margin-top: 12px;
}
@media (min-width: 960px) {
    .atom-grid {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .atom-grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1440px) {
    .atom-grid {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
.filter {
    overflow-x: scroll;
}
.filter::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
