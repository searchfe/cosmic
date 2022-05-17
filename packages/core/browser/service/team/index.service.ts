import { injectable, inject } from 'inversify';
import { UserService } from '../user/index.service';
import { TOKENS } from '../token';
import { GqlClient } from '../gql-client/index.service';
import { inject as injectFun } from '../';
import { teamDao } from '@cosmic/core/parts';

@injectable()
export class TeamService {
    private user: UserService;
    private teamList: Array<Partial<gql.Team>> = [];
    private teamDao: ReturnType<typeof teamDao>;
    constructor(@inject(TOKENS.GqlClient) private client: GqlClient) {
        this.user = injectFun(TOKENS.User) as unknown as UserService;
        this.teamDao = teamDao(client);
    }

    async queryList() {
        const { data } = await this.teamDao.query({});
        if (data?.teams) {
            this.teamList = data.teams;
        }
    }

    async get() {
        if (this.teamList.length > 0) return this.teamList;
        await this.queryList();
        return this.teamList;
    }

    async getCurrentUserTeam() {
        const user = await this.user.get();
        await this.get();
        const team = this.teamList.find(team => team.members?.some(member => member.user === user.id));
        return team;
    }
}  