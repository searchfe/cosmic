<style>
  .input {
    height: 36px;
    border: 1px solid rgba(31, 31, 31, 0.1);
  }
</style>

<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { Dialog, Button } from '@cosmic/core/components';
  import { createProject } from '../api';

  export let show = false;
  export let parent = '';
  export let team = '';
  let name = '';

  const createPromise = createProject();
  const dipatch = createEventDispatcher();

  function onCancel() {
    show = false;
  }

  function onCreate() {
    createPromise({
      project: { name, parent, team },
    }).then((res) => {
      if (res.data && res.data.createProject.id) {
        dipatch('success', res.data.createProject.id);
        onCancel();
      }
    });
  }
</script>

<Dialog bind:value="{show}" width="656px">
  <div slot="title">创建项目</div>
  <div class="flex items-center mb-12">
    <label class="flex-none text-tiny mr-4" for="name">名称*</label>
    <input
      bind:value="{name}"
      class="flex-1 input text-sm rounded-lg"
      name="name"
      type="text"
      placeholder="请输入业务名称"
    />
  </div>
  <div class="justify-center flex" slot="actions">
    <Button class="rounded-full mr-4" on:click="{onCancel}">取消</Button>
    <Button class="rounded-full" type="primary" on:click="{onCreate}">创建</Button>
  </div>
</Dialog>
