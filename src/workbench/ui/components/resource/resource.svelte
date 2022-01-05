<script lang="ts">
    import Widget from './widget/widget.svelte';
    import Self from './self/self.svelte';
    import Shandard from './standard/standard.svelte';
    import { Tabs, Tab } from '@cosmic/core/components';
    const tabButtonClasses = () => 'max-h-32';
</script>

<div class="flex flex-1 flex-row h-full dark:bg-cgray-800 bg-cgray-200 max-w-100">
    <Tabs
        selected="1"
        class="shadow-sm text-white rounded-t-xl flex-col w-20 dark:bg-cgray-600 bg-cgray-400"
        let:selected
        {tabButtonClasses}
        items={[
            { id: '1', text: '组件库', icon: 'alarm_on' },
            { id: '2', text: '规范库', icon: 'bug_report' },
            { id: '3', text: '我的', icon: 'eject' },
        ]}
    >
        <div slot="content" class="flex overflow-hidden flex-1 py-4">
            <Tab id="1" {selected}>
                <Widget />
            </Tab>
            <Tab id="2" {selected}>
                <Self />
            </Tab>
            <Tab id="3" {selected}>
                <Shandard />
            </Tab>
        </div>
    </Tabs>
</div>
