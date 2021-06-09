<script>
  import "smelte/src/tailwind.css";
  import "../../../src/core/components/global.css";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Checkbox from "../../../src/core/components/checkbox";

</script>

<Meta title="Selection Control" component="{Checkbox}" />

<Template let:args>
  <Checkbox label="A checkbox" />
  <Checkbox color="secondary" label="A colored checkbox" />
  <Checkbox disabled label="A disabled checkbox" />
</Template>

<Story name="CheckBox" />
