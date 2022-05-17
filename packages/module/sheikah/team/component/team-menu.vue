<script lang="ts" setup>
import { ref } from 'vue';
import { Collapse, CollapseItem, Input, Dialog, Button } from 'cosmic-vue';
import { buttonLight } from 'cosmic-ui';
import { useRoute, useRouter } from '@cosmic/core/router';
import TeamItem from './team-menu-item.vue';
import { generateProjectForest } from '../../common/util/tree';
import { useCreateProject } from '../../project/api';
import { service, inject } from '@cosmic/core/browser';

interface Team extends gql.Team{
    avatar?: string;
}

const userService = inject<service.UserService>(service.TOKENS.User);
const client = inject<service.GqlClient>(service.TOKENS.GqlClient);
const { executeMutation: createProject } = useCreateProject();

const teams = ref<Team[]>([]);
const projects  = ref<gql.Project[]>([]);
const teamMaps = ref(new Map);
const projectMaps = ref(new Map);
const userId = ref('');
const { query } = useRoute();
const router = useRouter();
const selectedTeam = ref<string>(query.team as string || '');

let newProject = ref<Partial<gql.CreateProjectDTO>>({
    name: '',
});
const openDialog = ref(false);

userService.user.subscribe(async user => {
    userId.value = user.id || '';
    if (user.id) {
        const { data: teamData } = await client.query(
            `query teams($query: QueryTeamDTO!) {
                teams(query: $query) {
                    id,
                    name,
                    members{
                        user
                    }
                }
            }`,
            { query: { members: { user: userId.value }} },
        ).toPromise();
        teams.value = teamData.teams || [];
        const { data: projectData } = await client.query(
            `query ($project: QueryProjectDTO) {
                projects(project: $project) {
                    id,
                    name,
                    team,
                    parent
                }
            }`,
            { team: { $in: teams.value.map(team => team.id) }},
        ).toPromise();
        projects.value = projectData.projects || [];

        const { teamMap, projectMap } = generateProjectForest(projects.value, teams.value.map(team => team.id));
        teamMaps.value = teamMap;
        projectMaps.value = projectMap;
        if (!selectedTeam.value) {
            changeSelectedTeam(teams.value[0].id);
        }
    }
});

async function changeSelectedTeam(arg: string | { keys: string[] }) {
    const newValue = typeof arg === 'string' ? arg : arg.keys[0];
    if (!newValue) {
        return;
    }
    selectedTeam.value = newValue;
    router.push({ name: 'team:detail', query: { team: selectedTeam.value }});
}

const defautlAvatar = 'https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png';

function onAddProject(data: gql.CreateProjectDTO) {
    if (!data.name) {
        data.name = '';
    }
    newProject.value = data;
    openDialog.value = true;
}

function saveProject() {
    if (newProject.value && newProject.value.name) {
        createProject({ project: newProject.value }).finally(() => {
            openDialog.value = false;
        });
    }
}

function onToogleProject(data: { id: string, team: string }) {
    console.log(data);
    const { id: project, team } = data;
    // const treeNode = projectMaps.value.get(id);
    // treeNode.open = '1';
    // console.log('--open---', treeNode.open)
    // teamMaps.value = new Map(teamMaps.value);
    if (project) {
        router.push({ name: 'project:detail', query: { project, team } });
    }
}
</script>

<template>
    <collapse
        accordion
        :nullable="false"
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
                <team-item :data="teamMaps.get(team.id)" :team="team.id" @add-project="onAddProject" @toogle-project="onToogleProject" />
            </div>
        </collapse-item>
    </collapse>
    <Dialog v-model:visible="openDialog" :class="$style.dialog" width="434px" height="245px" title="创建项目" :show-close-icon="false" @ok="saveProject">
        <div :class="$style['input-container']">
            <Input v-model:value="newProject.name" :class="$style.input" placeholder="请输入项目名称" />
        </div>
        <template #actions>
            <Button
                size="sm"
                :styles="buttonLight"
                :class="$style['cancel-button']"
                class="rounded-full w-64 -v-border-apparent font-normal"
            >
                取消
            </Button>
            <Button
                size="sm"
                :class="$style['confirm-button']"
                class="rounded-full w-64 font-normal"
            >
                确定
            </Button>
        </template>
    </Dialog>
</template>

<style module>
.dialog {
    padding-left: 73px;
    padding-right: 73px;
}

.input-container {
    margin-top: 38px;
    margin-bottom: 42px;
    width: 288px;
    height: 36px;

}
.input {
    opacity: .3;
    border: 1px solid rgba(31, 31, 31, .1)
}
.cancel-button:hover {
    opacity: .3;
}
.cancel-button {
    width: 122px;
    height: 40px !important;
    margin-right: 10px;
    background: #f5f5f5;
    font-size: 16px !important;
    border: none !important;
}
.confirm-button {
    width: 122px;
    height: 40px !important;
    font-size: 16px !important;
}
</style>
