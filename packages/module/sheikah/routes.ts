import { router } from '@cosmic/core/browser';
import TeamDetail from './team/view/detail.vue';
import ProjectDetail from './project/view/detail.vue';
import AtomList from './design/view/atom-list.vue';
import AtomDetail from './design/view/atom-detail.vue';
import ComponentList from './design/view/component-list.vue';
import PrefabList from './design/view/prefab-list.vue';
import PrefabDetail from './design/view/prefab-detail.vue';
import Left from './layout/left.vue';

const { createRouter, createMemoryHistory } = router;

const routes = [
    {
        name: 'team:detail',
        path: '/team',
        components: {
            default: TeamDetail,
            Left,
        },
    },
    {
        name: 'project:detail',
        path: '/project',
        components: {
            default: ProjectDetail,
            Left,
        },
    },
    {
        name: 'atom:list',
        path: '/atom/list',
        components: {
            default: AtomList,
            Left,
        },
    },
    {
        name: 'atom:detail',
        path: '/atom',
        components: {
            default: AtomDetail,
            Left,
        },
    },
    {
        name: 'component:list',
        path: '/component/list',
        components: {
            default: ComponentList,
            Left,
        },
    },
    {
        name: 'prefab:list',
        path: '/prefab/list',
        components: {
            default: PrefabList,
            Left,
        },
    },
    {
        name: 'prefab:detail',
        path: '/prefab',
        components: {
            default: PrefabDetail,
            Left,
        },
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
