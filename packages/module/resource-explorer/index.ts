import type { Module } from '@cosmic/core/parts';
import root from './index.vue';
import { TeamAPIService } from './team/api.service';


export default {
    root,
    imports: [
        '@cosmic-module/resource-explorer',
    ],
    providers: [ TeamAPIService ],
} as Module;

export { TeamAPIService };
