import { router } from '@cosmic/core/browser';
import AtomList from './design/view/atom-list.vue';
import TeamDetail from './team/view/detail.vue';

const { createRouter, createMemoryHistory } = router;

const routes = [{
    name: 'team:detail',
    path: '/sheikah/team',
    component: TeamDetail,
}, {
    name: 'atom:list',
    path: '/sheikah/atom/list',
    component: AtomList,
}, {
    path: '/',
    redirect: () => {
    return { path: '/sheikah/team' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
