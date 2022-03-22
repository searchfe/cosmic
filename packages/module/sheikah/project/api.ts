import { urql } from '@cosmic/core/browser';


const { useQuery, useMutation } = urql;

export function useProjects<T extends gql.QueryProjectDTO>(project: T) {
    return useQuery<{ projects: gql.Project[] }, { project: T }>({
        query: `
            query ($project: QueryProjectDTO) {
                projects(project: $project) {
                    id,
                    name,
                    team,
                    parent
                }
            }
        `,
        variables: { project },
        requestPolicy: 'cache-first',
    });
}

export function useCreateProject() {
    return useMutation<gql.CreateProjectDTO>(`
        mutation ($project: CreateProjectDTO!) {
            createProject(project: $project) {
            id,
            }
        }
    `);
}

export function useDeleteProject() {
    return useMutation<{ deleteProject: boolean }, { id: string }>(`
        mutation deleteProject($id: String!) {
            deleteProject(id: $id)
        }
    `);
}

export function useProjectStructure(id: string) {
    return useQuery<{ projectStructure: gql.ProjectPlus[] }, { id: string }>({
        query: `
            query ($id: String!) {
                projectStructure(id: $id) {
                    id,
                    name,
                    team,
                    parent,
                    hasChildren
                }
            }
        `,
        variables: { id },
        requestPolicy: 'cache-first',
    });
}
