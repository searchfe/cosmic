import { createRouter, createMemoryHistory } from '@cosmic/core/router';
import Login from './view/login.vue';


const routes = [{
    name: 'login',
    path: '/login',
    component: Login,
}, {
    path: '/',
    redirect: () => {
        return { name: 'login' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
