import { injectable, inject } from '@cosmic/core/inversify';
import { TOKENS } from '../token';
import { GqlClient } from '../gql-client/index.service';
import { FontDao } from '@cosmic/core/parts';


@injectable()
export default class FontDaoService {
    private fontDao: ReturnType<typeof FontDao>;
    constructor(@inject(TOKENS.GqlClient) private client: GqlClient) {
        this.fontDao = FontDao(client);
    }


    async queryList() {
        const { data } = await this.fontDao.query({});
        if (data) {
            return data.fonts;
        }
        return null;
    }

    async create(data: Partial<gql.Font>) {
        const operation = await this.fontDao.create(data);
        return operation;
    }

   async update(data: Partial<gql.Font>) {
        const operation = await this.fontDao.update(data);
   }

}
