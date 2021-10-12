<script lang="typescript" context="module">
  import type { TreeNode } from '@cosmic/core/components';
  import type { Project } from '../../../common/types/graphql';
  import ProjectCreateDialog from '../../../project/component/create-dialog.svelte';

  
  // TODO: extract traverse logic to common, accept visit function as a param
  export function generateProjectForest(projects: Project[], teams: string[]) {
    const teamMap = new Map<string, TreeNode>();
    const idNodeMap = new Map<string, TreeNode>();
    const unresolvedNode: TreeNode[] = [];
    
    teams.forEach(team => {
      teamMap.set(team, {
        key: '',
        label: '项目类别',
        children: []
      });
    });
    
    projects.forEach(project => {
      const treeNode = {
        key: project.id,
        label: project.name,
        children: [],
        parent: project.parent,
      };
      idNodeMap.set(project.id, treeNode);
      if (!project.parent) {
        teamMap.get(project.team).children.push(treeNode);
      }
      else if (idNodeMap.has(project.parent)) {
        // parent node has been visited
        idNodeMap.get(project.parent).children.push(treeNode);
      }
      else {
        // put in next traverse 
        unresolvedNode.push(treeNode);
      }
    });
    
    unresolvedNode.forEach(pro => {
      if (idNodeMap.get(pro.parent)) {
        // in case of wrong data
        idNodeMap.get(pro.parent).children.push(pro);
        delete pro.parent;
      }
    });
    return teamMap;
  }
</script>

<script lang="typescript">
  import { push } from 'svelte-spa-router';
  import { query } from '@urql/svelte';
  import { Collapse } from '@cosmic/core/components';
  import {queryProjects} from '../../../project/api';
  import TeamItem from './item.svelte';
  import { teamsQuery } from '../../api';
  import { ROUTES_ENUM, urlFor } from '../../../routes';

  const pojectStore = queryProjects();
  query(teamsQuery);

  let projectForest: Map<string, TreeNode>;

  let showProjectDialog = false;
  let newProjectParent = '';
  let dialogTeam = '';

  let activeKey = [];

  $: {
    if (!$teamsQuery.fetching && $teamsQuery.data.teams && $teamsQuery.data.teams.length) {
      query(pojectStore);
      if (!$pojectStore.fetching && $pojectStore.data.projects) {
        projectForest = generateProjectForest(
          $pojectStore.data.projects,
          $teamsQuery.data.teams.map(team => team.id)
        );
      }
      if (activeKey.length === 0) {
        activeKey = [teamsQuery.data.teams[0].id];
        push(urlFor(ROUTES_ENUM.TEAM_DETAIL, { teamId: activeKey[0] }))
      }
    }
  }

  function refresh() {
    //TODO: find out why not refresh
    $pojectStore.context = {};
  }

  function selectedTeamChangeHandler(event) {
    push(urlFor(ROUTES_ENUM.TEAM_DETAIL, { teamId: event.detail.activeKey[0] }));
  }

  function addProjectHandler(event) {
    newProjectParent = event.detail.parent;
    dialogTeam = event.detail.team;
    showProjectDialog = true;
  }
  
</script>
<div>
  {#if !$teamsQuery.fetching && $teamsQuery.data.teams && !$pojectStore.fetching}
    <Collapse bind:activeKey={activeKey} accordion on:change={selectedTeamChangeHandler}>
      {#each $teamsQuery.data.teams as team}
        <TeamItem team={team} project={projectForest.get(team.id)} on:add-project={addProjectHandler}/>
      {/each}
    </Collapse>
  {/if}
</div>

<ProjectCreateDialog bind:show={showProjectDialog} parent={newProjectParent} team={dialogTeam} on:success={refresh}/>
