export interface GqlClient {
    useQuery: () => void;
}

export type GqlClientProvider = () => Promise<GqlClient>;
