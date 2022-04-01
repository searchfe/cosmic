import Blueprint from './view/blueprint.vue';
import Preview from './view/preview.vue';
import Editor from './view/editor.vue';
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
    name: 'preview',
    path: '/preview',
    component: Preview,
}, {
    name: 'editor',
    path: '/editor',
    component: Editor,
}, {
    name: 'home',
    path: '/',
    redirect: () => {
        return { name: 'editor' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
