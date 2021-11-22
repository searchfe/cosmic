<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Icon } from '@cosmic/core/components';
  import { Collapse, CollapsePanel } from '@cosmic/workbench/ui/components/components';
</script>

<Meta title="Collapse" component="{Collapse}" />

<Template let:args id="normal">
  <div class="w-80">
    <Collapse {...args}>
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 1" key="{1}"
        >A dog is a type of domesticated animal.</CollapsePanel
      >
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 2" key="{2}"
        >A dog is a type of domesticated animal.</CollapsePanel
      >
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 3" key="{3}"
        >A dog is a type of domesticated animal.</CollapsePanel
      >
    </Collapse>
  </div>
</Template>

<Template let:args id="custom">
  <div class="w-80">
    <Collapse {...args}>
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 1" key="{1}">
        A dog is a type of domesticated animal.
        <div slot="left">
          <Icon>arrow_drop_down</Icon>
        </div>
      </CollapsePanel>
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 2" key="{2}">
        A dog is a type of domesticated animal.
        <div slot="left">
          <Icon>arrow_drop_down</Icon>
        </div>
      </CollapsePanel>
      <CollapsePanel append="{args.append}" prepend="{args.prepend}" header="This is panel header 3" key="{3}">
        A dog is a type of domesticated animal.
        <div slot="left">
          <Icon>arrow_drop_down</Icon>
        </div>
      </CollapsePanel>
    </Collapse>
  </div>
</Template>

<Story name="Default" args="{{ accordion: false }}" template="normal" />

<Story name="Accordion" args="{{ accordion: true }}" template="normal" />

<Story name="Append" args="{{ accordion: false, append: 'arrow_drop_down', prepend: '' }}" template="normal" />

<Story name="Prepend" args="{{ accordion: false, append: '', prepend: 'arrow_drop_down' }}" template="normal" />

<Story name="Custom" args="{{ accordion: false, append: '', prepend: '' }}" template="custom" />
