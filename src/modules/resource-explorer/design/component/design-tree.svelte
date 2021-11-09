<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { Tree } from '@cosmic/core/components';
  import { ROUTES, urlFor } from '../../routes';
  import type { TreeNode } from '@cosmic/core/components';
  import type { Team } from '../../common/types/graphql';

  const leaves = {
    label: '设计资产',
    key: '0',
    children: [
      {
        key: '1',
        label: '视觉原子',
      },
      {
        key: '2',
        label: '组件预置',
      },
      {
        key: '3',
        label: '上线资产',
      },
    ],
  };

  export let team: Team;

  const keySelectHandlers = {
    0: function () {},
    1: function () {
      push(urlFor(ROUTES.DESIGN_ATOM, { teamId: team.id }));
    },
    2: function () {},
    3: function () {},
  };

  function projectNodeClickedHandler(event) {
    keySelectHandlers[event.detail.selectedKey]();
  }
</script>

<Tree data="{leaves}" primaryIndent="{2.2}" treeIcon="grid_view" on:click="{projectNodeClickedHandler}" />
