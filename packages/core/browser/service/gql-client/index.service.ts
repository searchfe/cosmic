import { type Client, createClient } from '@urql/vue';
import { exchanges } from './exchange/index';
import { inject, injectable } from 'inversify';
import type { UserService } from '../user/index.service';
import { TOKENS } from '../token';


export type GqlClient = Client;

@injectable()
export class GqlClientService {
    // 必须有user，gql初始化的时候可能要做logout
    constructor(@inject(TOKENS.User) private user: UserService) {
        const client = createClient({
            exchanges,
            url: import.meta.env.VITE_SERVER + '/api/graphql',
            requestPolicy: 'cache-and-network',
        });
        Object.keys(client).forEach((prop: string)=> {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this[prop] = client[prop];
        });
    }
}
