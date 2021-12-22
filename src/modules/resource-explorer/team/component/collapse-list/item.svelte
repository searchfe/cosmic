<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Dropdown, CollapseItem } from '@cosmic/core/components';
  import type { TreeNode } from '@cosmic/core/components';
  import ProjectTree from '../../../project/component/project-tree.svelte';
  import type { Team } from '../../../common/types/graphql';
  import DesignTree from '../../../design/component/design-tree.svelte';

  export let team: Team;
  export let project: TreeNode;

  const dispatch = createEventDispatcher();

  const items = [
    { value: 1, text: '新建项目' },
    { value: 2, text: '信息设置' },
    { value: 3, text: '成员管理' },
    { value: 4, text: '删除项目' },
  ];

  function addProjectHandler(event) {
    dispatch('add-project', { team: team.id, parent: event.detail });
  }
</script>

<CollapseItem header={team.name} key={team.id}>
  <img slot="prefix" src="https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png" alt="" />
  <Dropdown slot="extra" {items} />
  <DesignTree {team} />
  <ProjectTree data={project} on:add-project={addProjectHandler} />
</CollapseItem>
