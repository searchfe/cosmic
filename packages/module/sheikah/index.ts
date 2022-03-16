import type { Module } from '@cosmic/core/parts';
import root from './app.vue';


export default {
    root,
    imports: [
        '@cosmic-module/sheikah',
    ],
} as Module;
