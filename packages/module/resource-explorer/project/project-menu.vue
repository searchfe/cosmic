<script lang="ts" setup>
    // import { push } from 'svelte-spa-router';
    // import { ROUTES, urlFor } from '../../routes';
    import { Tree, TreeNode } from 'cosmic-vue';

    // export let data: TreeNode;

    // const dispatch = createEventDispatcher();

    // function projectNodeClickedHandler(event) {
    //     if (event.detail.selectedKey) {
    //         push(urlFor(ROUTES.PROJECT_DETAIL, { projectId: event.detail.selectedKey }));
    //     }
    // }

    // function addButtonClickedHandler(event) {
    //     dispatch('add-project', event.detail.clickedKey);
    // }

    // import ProjectTree from '../../../project/component/project-menu.vue';
    // import DesignTree from '../../../design/component/design-tree.vue';

    // import type { Team } from '../../../../../../types/graphql';
    // import type { TreeNode } from '@cosmic/core/components';

    // export let team: Team;
    // export let project: TreeNode;

    // const items = [
    //     { value: 1, text: '新建项目' },
    //     { value: 2, text: '信息设置' },
    //     { value: 3, text: '成员管理' },
    //     { value: 4, text: '删除项目' },
    // ];

    // function addProjectHandler(event) {
    //     // dispatch('add-project', { team: team.id, parent: event.detail });
    // }

    // import type { TreeNodeOption } from 'cosmic-vue';
    // import { TreeNode } from 'cosmic-vue';
    // // import type { Project } from '../../../../../core/parts/lib/gql/graphql';
    // import ProjectCreateDialog from '../../../project/component/create-dialog.vue';
    // // import { push } from 'svelte-spa-router';
    // // import { query } from '@urql/svelte';
    // // import { Collapse } from '@cosmic/core/components';
    // // import { queryProjects } from '../../../project/api';
    // import TeamItem from './item.vue';
    // // import { teamsQuery } from '../../api';
    // // import { ROUTES, urlFor } from '../../../routes';

    // // TODO: extract traverse logic to common, accept visit function as a param




    // // const pojectStore = queryProjects();
    // // query(teamsQuery);

    // let projectForest: Map<string, typeof TreeNode>;

    // let showProjectDialog = false;
    // let newProjectParent = '';
    // let dialogTeam = '';

    // let activeKey = [];

    // $: {
    //     if (!$teamsQuery.fetching && $teamsQuery.data.teams && $teamsQuery.data.teams.length) {
    //         query(pojectStore);
    //         if (!$pojectStore.fetching && $pojectStore.data.projects) {
    //             projectForest = generateProjectForest(
    //                 $pojectStore.data.projects,
    //                 $teamsQuery.data.teams.map(team => team.id),
    //             );
    //         }
    //         if (activeKey.length === 0) {
    //             activeKey = [teamsQuery.data.teams[0].id];
    //             push(urlFor(ROUTES.TEAM_DETAIL, { teamId: activeKey[0] }));
    //         }
    //     }
    // }

    // function refresh() {
    //     //TODO: find out why not refresh
    //     $pojectStore.context = {};
    // }

    // function selectedTeamChangeHandler(event) {
    //     push(urlFor(ROUTES.TEAM_DETAIL, { teamId: event.detail.activeKey[0] }));
    // }

    // function addProjectHandler(event) {
    //     newProjectParent = event.detail.parent;
    //     dialogTeam = event.detail.team;
    //     showProjectDialog = true;
    // }
</script>

<template>
    123123
    <tree>
        <tree-node title="原子" />
        <tree-node title="组件" />
    </tree>
    <!--
    <Tree
        {data}
        extraIcon="add"
        primaryIndent={2.2}
        treeIcon="folder_open"
        on:click={projectNodeClickedHandler}
        on:click-extra={addButtonClickedHandler}
    /> -->
</template>


<!-- <template>
    <div header={team.name} key={team.id}>
        <img
            slot="prefix"
            src="https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png"
            alt=""
        />
        <Dropdown slot="extra" {items} />
        <DesignTree {team} />
        <ProjectTree data={project} on:add-project={addProjectHandler} />
    </div>
</template>

<template> -->

<!-- <div>
    {#if !$teamsQuery.fetching && $teamsQuery.data.teams && !$pojectStore.fetching}
        <Collapse bind:activeKey accordion on:change={selectedTeamChangeHandler}>
            {#each $teamsQuery.data.teams as team}
                <TeamItem {team} project={projectForest.get(team.id)} on:add-project={addProjectHandler} />
            {/each}
        </Collapse>
    {/if}
</div> -->


    <!-- <ProjectCreateDialog bind:show={showProjectDialog} parent={newProjectParent} team={dialogTeam} on:success={refresh} /> -->
<!-- </template> -->
