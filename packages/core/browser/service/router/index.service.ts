import { type Router, type RouteLocationRaw } from 'vue-router';
import { routify } from './routes';


export interface RouterServiceAPI {
    getRouterConfig(): Router;
    push(to: RouteLocationRaw): void;
}


// control all initial logic inside the module
let instance:symbol;

export class RouterService implements RouterServiceAPI {

    private constructor(private router: Router, token: symbol) {
        if (!token) {
            throw new Error('can\'t initiate RouterService outside the module');
        }
    }

    static create() {
        if (!instance) {
            instance = Symbol.for('router-instance');
        }
        return new RouterService(routify(), instance);
    }

    getRouterConfig() {
        return this.router;
    }

    push(to: RouteLocationRaw) {
        this.router.push(to);
    }

}

