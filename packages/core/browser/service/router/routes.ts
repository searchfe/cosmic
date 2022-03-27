import Blueprint from './view/blueprint.vue';
import Workbench from './view/workbench.vue';
import Sheika from './view/sheikah.vue';
import { createRouter, createMemoryHistory } from 'vue-router';


const routes = [{
    name: 'sheikah',
    path: '/sheikah',
    component: Sheika,
}, {
    name: 'blueprint',
    path: '/blueprint',
    component: Blueprint,
}, {
    name: 'workbench',
    path: '/workbench',
    component: Workbench,
}, {
    name: 'home',
    path: '/',
    redirect: () => {
        return { name: 'workbench' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
