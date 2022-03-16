import Blueprint from './blueprint.vue';
import Workbench from './workbench.vue';
import Sheika from './sheikah.vue';
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
        return { name: 'sheikah' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
