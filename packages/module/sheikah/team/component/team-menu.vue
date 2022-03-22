<script lang="ts" setup>
import { watchEffect, ref } from 'vue';
import { Collapse, CollapseItem, Button, Input } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import TeamItem from './team-menu-item.vue';
import { generateProjectForest } from '../../common/util/tree';
import { useProjects } from '../../project/api';
import { useAllTeams } from '../api';
import { useCreateProject } from '../../project/api';
import Dialog from '../../common/component/dialog.vue';

interface Team extends gql.Team{
    avatar?: string;
}

const { executeMutation: createProject } = useCreateProject();

let teams = ref<Team[]>([]);
let projects  = ref<gql.Project[]>([]);
let teamMaps = ref(new Map);

const { useRoute, useRouter } = vueRouter;
const { query } = useRoute();
const router = useRouter();
const selectedTeam = ref<string>(query.team as string || '');

// TODO merge into one query in server side
const { data: teamData, fetching: teamFetching } = useAllTeams();
const { data: projectData, fetching: projectFetching } = useProjects({});

let newProject: gql.CreateProjectDTO;
const openDialog = ref(false);

async function changeSelectedTeam(arg: string | string[]) {
    const newValue = Array.isArray(arg) ? arg[0] : arg;
    if (!newValue) {
        return;
    }
    selectedTeam.value = newValue;
    await router.push({ name: 'team:detail', query: { team: selectedTeam.value }});
}


watchEffect(() => {
    if (teamData.value && !teamFetching.value) {
        teams.value = teamData.value?.teams || [];
        if (projectData.value && !projectFetching.value) {
            projects.value = projectData.value.projects;
        }
        teamMaps.value = generateProjectForest(projects.value, teams.value.map(team => team.id));
        if (!selectedTeam.value) {
            changeSelectedTeam(teams.value[0].id);
        }
    }
});

const defautlAvatar = 'https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png';

function onAddProject(data: gql.CreateProjectDTO) {
    console.log(1);
    newProject = data;
    openDialog.value = true;
}

function onChangeNewProjectName(e: { value: string }) {
    newProject.name = e.value;
}

function onSaveProject() {
    if (newProject && newProject.name) {
        createProject({ project: newProject }).finally(() => {
            openDialog.value = false;
        });
    }
}

function onCancel() {
    openDialog.value = false;
}

</script>

<template>
    <collapse
        accordion
        :active-key="selectedTeam"
        @change="changeSelectedTeam"
    >
        <collapse-item
            v-for="team in teams"
            :key="team.id"
            :header="team.name"
        >
            <template #prefix>
                <img :src="team.avatar || defautlAvatar" alt="SC">
            </template>
            <div class="w-full">
                <team-item :data="teamMaps.get(team.id)" :team="team.id" @add-project="onAddProject" />
            </div>
        </collapse-item>
    </collapse>
    <Dialog :open="openDialog">
        <template #title>
            <div class="pl-10">
                创建项目
            </div>
        </template>
        <Input placeholder="请输入项目名称" @on-input="onChangeNewProjectName" />
        <template #actions>
            <Button class="mr-20" @click="onCancel">取消</Button>
            <Button @click="onSaveProject">创建</Button>
        </template>
    </Dialog>
</template>
