import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';

@injectable()
export class fillStyle extends BaseService<any> {
    constructor() {
        super();
        this.setType('fill');
    }
}