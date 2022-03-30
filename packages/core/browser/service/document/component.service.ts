import { injectable } from '@cosmic/core/inversify';
import { type QueryComponentResult } from '@cosmic/core/parts';
import { Subject } from '@cosmic/core/rxjs';

@injectable()
export default class ComponentService {
    components = new Subject<QueryComponentResult[]>();
    component = new Subject<QueryComponentResult>();
}
