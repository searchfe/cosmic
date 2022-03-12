import { inversify } from '@cosmic/core/parts';
import type { iocInterface} from '@cosmic/core/browser';
import { iocToken} from '@cosmic/core/browser';


const { injectable, inject } = inversify;

@injectable()
export class TeamAPIService {

    constructor(@inject(iocToken.GqlClient) private gqlClient: iocInterface.GqlClient) {
    }

    useAllTeams() {
        return this.gqlClient.useQuery<{ teams: gql.Team[] }>({
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
}
