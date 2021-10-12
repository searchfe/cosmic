<script lang="typescript">
  import { push } from 'svelte-spa-router';
  import { Icon } from '@cosmic/core/components';
  import Card from '../../common/components/card.svelte';
  import type { Project } from '../../common/types/graphql';
  import { urlFor, ROUTES_ENUM } from '../../routes';

  export let data: Project;

  export let avatar = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069';
  export let userAvatars: string[] = [avatar, avatar, avatar];
  export let info = '协作 30';

  function projectClickHandler() {
    push(urlFor(ROUTES_ENUM.PROJECT_DETAIL, { projectId: data.id }));
  }
</script>

<Card classes="overflow-hidden p-6" on:click={projectClickHandler}>
  <img class="avatar" src={avatar} alt="projcet avatra" />
  <div class="name">
    {data.name}
  </div>
  <div class="meta flex justify-between items-end">
    <div class="user-avatar-list flex justify-between">
      {#each userAvatars as uer}
        <img class="user-avatar" src={uer} alt="" />
      {/each}
    </div>
    <div class="info">
      {info}
    </div>
  </div>
  <Icon classes="absolute top-6 right-6" >more_horiz</Icon>
</Card>

<style>
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }

  .name {
    margin-bottom: 21px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }

  .user-avatar-list {
    left: 14px;
    bottom: 14px;
  }

  .user-avatar {
    width: 24px;
    height: 24px;
    border: 1px solid #f5f5f5;
    margin-right: 4px;
    border-radius: 50%;
  }

  .info {
    font-size: 12px;
  }

  .operation {
    top: 14px;
    right: 14px;
  }
</style>
