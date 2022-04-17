import axios from 'axios';
import { injectable, inject } from 'inversify';
import { TOKENS } from '../token';
import { BehaviorSubject } from '@cosmic/core/rxjs';


import type { RouterService } from '../router/index.service';

const LOGIN_URL = import.meta.env.VITE_SERVER + '/auth/login';

const CACHE_USER_KEY = 'user';

type userKeys = Exclude<keyof gql.User, 'password'>;

interface User extends Partial<Pick<gql.User, userKeys>>{
    token?: string;
}

export interface UserService {
    set(key: string, value: User): void;
    set(key: userKeys | 'token', value: any): void;
    login({ username, password }: { username: string; password: string; }): Promise<void>;
    logout(): Promise<void>;
    hasLogin(): boolean;
}

@injectable()
export class UserService implements UserService {
    public user: BehaviorSubject<User>;
    private _user: User;
    private static ins: UserService;

    constructor(@inject(TOKENS.Router) private router: RouterService) {
        this._user = {};
        this.user = new BehaviorSubject(this._user);
        this.loadUser();
        UserService.ins = this;
    }

    set(key: userKeys | 'token', value: any) {
        this._user[key] = value;
        localStorage.setItem(CACHE_USER_KEY, JSON.stringify(this._user));
        this.user.next(this._user);
    }

    get() {
        if (!this._user?.token) {
            this.loadUser();
        }
        return this._user;
    }

    hasLogin() {
        return Boolean(this.get().token);
    }

    private loadUser() {
        this._user = JSON.parse(localStorage.getItem(CACHE_USER_KEY) || '{}');
        this.user.next(this._user);
    }

    async login({ username, password }: { username: string; password: string; }) {
        if (!username || !password) {
            return Promise.reject('invalid params');
        }
        return axios
            .post<any, { data: { accessToken?: string, user?: Partial<gql.User> } }>(
                LOGIN_URL,
                {
                    // TODO: password security, this is only a demo
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(res => {
                const token = res?.data?.accessToken;
                const user = res?.data?.user || {};
                if (token) {
                    this.set('token', token);
                    Object.keys(user).forEach((k: string) => {
                        this.set(k, user[k]);
                    });
                } else {
                    // TODO: use error code
                    throw new Error('no token');
                }
            });
    }

    async logout(route?: { name?: string }) {
        this._user = {};
        localStorage.removeItem(CACHE_USER_KEY);
        if (route) {
            localStorage.setItem('redirect', JSON.stringify(route));
        }
        this.user.next({});
        await this.router.push({ name: 'user' });
    }

    static getInstance() {
        return UserService.ins;
    }

}

// TODO: 升级gql service 移除这里
export async function logout(route?: { name?: string }) {
    UserService.getInstance().logout(route);
}

export function get() {
    return UserService.getInstance().get();
}
