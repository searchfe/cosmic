import Workbench from './workbench.vue';
import { createRouter, createMemoryHistory } from 'vue-router';


const routes = [{
    path: '/',
    component: Workbench,
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
