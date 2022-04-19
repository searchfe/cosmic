import { Client } from '@urql/core';


export default function teamDao(client: Client) { 
    return {
        query(query: gql.QueryTeamDTO) {
            return client.query< {teams: Partial<gql.Team>[]}>(
                `query ($query: QueryTeamDTO!) {
                    teams(query: $query) {
                        id,
                        name,
                        members {
                            user,
                            permission
                        }
                    }
                }`,
                {query},
            ).toPromise();
        },
    };
}