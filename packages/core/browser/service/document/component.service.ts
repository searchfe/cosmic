import { injectable } from '@cosmic/core/inversify';
import { useTeamComponents, type QueryComponentResult } from '@cosmic/core/parts';
import { Subject } from '@cosmic/core/rxjs';
import { from } from 'rxjs';

@injectable()
export default class ComponentService {
    components = new Subject<QueryComponentResult[]>();
    constructor() {
        const components = useTeamComponents({
            team: '62400d235a1f0899ad341838',
        });
        from(components.then(({ data }) => data.value!.components)).subscribe(this.components);
    }
}
