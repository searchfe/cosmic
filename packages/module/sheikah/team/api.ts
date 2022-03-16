import { urql } from '@cosmic/core/browser';


const { useQuery } = urql;

export function useAllTeams() {
    return useQuery<{ teams: gql.Team[] }>({
        query: `
            query getAllTeams {
                teams {
                    name,
                    id
                }
            }
        `,
    });
}
