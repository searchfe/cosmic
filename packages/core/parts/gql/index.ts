import { exchanges } from './exchange/index';


export const gqlClientOptions = {
    exchanges,
    url: import.meta.env.VITE_SERVER + '/api/graphql',
};
