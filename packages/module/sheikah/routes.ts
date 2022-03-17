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
    path: '/sheikah/team',
    component: TeamDetail,
}, {
    name: 'project:detail',
    path: '/sheikah/project',
    component: ProjectDetail,
}, {
    name: 'atom:list',
    path: '/sheikah/atom/list',
    component: AtomList,
}, {
    name: 'atom:detail',
    path: '/sheikah/project',
    component: AtomDetail,
}, {
    name: 'component:list',
    path: '/sheikah/project/list',
    component: ComponentList,
}, {
    name: 'component:detail',
    path: '/sheikah/project',
    component: ComponentDetail,
}, {
    path: '/',
    redirect: () => {
        return { path: '/sheikah/atom/list' };
    },
}];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
