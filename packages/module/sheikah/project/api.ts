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
    // mutation<{ createProject: { id: string } }, { project: CreateProjectDTO }>({
    //     query: ,
    // });
}
