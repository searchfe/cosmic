<script lang="ts" setup>
import { onMounted } from 'vue';
import { inject } from '@cosmic/core/parts';
import { Collapse, CollapseItem } from 'cosmic-vue';

import { TeamAPIService } from '../api.service';
import TeamItem from './team-menu-item.vue';
import { generateProjectForest } from '../../common/util/tree';

interface Team extends gql.Team{
    avatar: string;
}
const service = inject(TeamAPIService);

onMounted(() => {
    console.log('----', service);
});

const teams: Team[] = [{
    id: '123',
    name: '百度搜索-业务',
    members: [],
    avatar: 'https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png',
}];
const projects: gql.Project[] = [];

const teamMaps = generateProjectForest(projects, teams.map(team => team.id));

</script>

<template>
    <collapse accordion>
        <collapse-item
            v-for="team in teams"
            :key="team.id"
            :header="team.name"
        >
            <template #prefix>
                <img
                    :src="team.avatar"
                    alt="SC"
                >
            </template>
            <div :class="$style['team-item-content']">
                <TeamItem :data="teamMaps.get(team.id)" />
            </div>
        </collapse-item>
    </collapse>
</template>

<style module>
.team-item-content {
    width: 100%;
}
</style>
