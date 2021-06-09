<script>
  import "smelte/src/tailwind.css";
  import "../../../src/core/components/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Dialog from "../../../src/core/components/dialog";
  import Button from "../../../src/core/components/button";

  let showDialog = false;

  function handleClick() {
    console.log(showDialog);
    showDialog = true;
  }

</script>

<Meta title="Dialog" component="{Dialog}" />

<Template let:args>
  <Button on:click="{handleClick}" class="w-40">show dialog</Button>
  <Dialog bind:value={showDialog}>
    <h5 slot="title">Title</h5>
    <div class="text-gray-700">Content</div>
    <div slot="actions">
      <Button text on:click={() => showDialog = false}>Disagree</Button>
      <Button text on:click={() => showDialog = false}>Agree</Button>
    </div>
  </Dialog>
</Template>

<Story name="Default" args="{{ value: showDialog }}" />
