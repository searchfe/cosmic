import { urql } from '@cosmic/core/browser';


const { useQuery, useMutation } = urql;

export function useDrafts(query: gql.QueryDraftDTO, fields: string[] = ['id', 'name', 'team', 'project']) {
    return useQuery<{ drafts: Partial<gql.Draft>[] }, gql.QueryDraftDTO>({
        query: `query ($fields: [String!], $query: QueryDraftDTO) {
            drafts(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function useCreateDraft(fields: string[] = []) {
    return useMutation<{ createDraft: Partial<gql.Draft> }, { data: gql.CreateDraftDTO }>(
        `mutation ($data: CreateDraftDTO!) {
            createDraft(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

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
