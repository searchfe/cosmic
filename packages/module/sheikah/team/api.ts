import { useQuery } from '@cosmic/core/urql';


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
