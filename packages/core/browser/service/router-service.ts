import { type Router, type RouteLocationRaw } from 'vue-router';
import { inversify } from '@cosmic/core/parts';

@inversify.injectable()
export class RouterService {
    constructor(private router: Router) {}
    push(to: RouteLocationRaw) {
        this.router.push(to);
    }
}