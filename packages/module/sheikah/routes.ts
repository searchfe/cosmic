import { router } from '@cosmic/core/browser';
import TeamDetail from './team/view/detail.vue';
import ProjectDetail from './project/view/detail.vue';
import AtomList from './design/view/atom-list.vue';
import AtomDetail from './design/view/atom-detail.vue';
import ComponentList from './design/view/component-list.vue';
import PrefabList from './design/view/prefab-list.vue';
import PrefabDetail from './design/view/prefab-detail.vue';

const { createRouter, createMemoryHistory } = router;

const routes = [
    {
        name: 'team:detail',
        path: '/team',
        component: TeamDetail,
    },
    {
        name: 'project:detail',
        path: '/project',
        component: ProjectDetail,
    },
    {
        name: 'atom:list',
        path: '/atom/list',
        component: AtomList,
    },
    {
        name: 'atom:detail',
        path: '/atom',
        component: AtomDetail,
    },
    {
        name: 'component:list',
        path: '/component/list',
        component: ComponentList,
    },
    {
        name: 'prefab:list',
        path: '/prefab/list',
        component: PrefabList,
    },
    {
        name: 'prefab:detail',
        path: '/prefab',
        component: PrefabDetail,
    },
    {
        path: '/',
        redirect: () => {
            return { name: 'team:detail' };
        },
    },
];

export function routify() {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}
