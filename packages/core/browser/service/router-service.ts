import { type Router, type RouteLocationRaw } from 'vue-router';
import { injectable } from '@cosmic/core/inversify';

@injectable()
export class RouterService {
    constructor(private router: Router) {}
    push(to: RouteLocationRaw) {
        this.router.push(to);
    }
}