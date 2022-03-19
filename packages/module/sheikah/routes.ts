import { router } from '@cosmic/core/browser';
import TeamDetail from './team/view/detail.vue';
import ProjectDetail from './project/view/detail.vue';
import AtomList from './design/view/atom-list.vue';
import AtomDetail from './design/view/atom-detail.vue';
import ComponentList from './design/view/component-list.vue';
import ComponentDetail from './design/view/component-detail.vue';

const { createRouter, createMemoryHistory } = router;

const routes = [{
    name: 'team:detail',
    path: '/team',
    component: TeamDetail,
}, {
    name: 'project:detail',
    path: '/project',
    component: ProjectDetail,
}, {
    name: 'atom:list',
    path: '/atom/list',
    component: AtomList,
}, {
    name: 'atom:detail',
    path: '/project',
    component: AtomDetail,
}, {
    name: 'component:list',
    path: '/project/list',
    component: ComponentList,
}, {
    name: 'component:detail',
    path: '/project',
    component: ComponentDetail,
}, {
    path: '/',
    redirect: () => {
        return { path: '/atom/list' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
