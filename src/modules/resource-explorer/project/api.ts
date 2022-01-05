import type { Project, QueryProjectDTO, CreateProjectDTO } from '../common/types/graphql';
import { operationStore, mutation } from '@urql/svelte';

// TODO: it gql increases a lot, split it
export const queryProjects = (project: QueryProjectDTO = {}) => {
    return operationStore<{ projects: Project[] }, { project: QueryProjectDTO }>(
        `
    query ($project: QueryProjectDTO) {
      projects(project: $project) {
        id,
        name,
        team,
        parent
      }
    }
  `,
        { project },
        { requestPolicy: 'cache-first' },
    );
};

export const createProject = () => {
    return mutation<{ createProject: { id: string } }, { project: CreateProjectDTO }>({
        query: `
      mutation ($project: CreateProjectDTO!) {
        createProject(project: $project) {
          id,
        }
      }
    `,
    });
};
