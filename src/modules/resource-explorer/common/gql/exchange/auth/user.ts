import { urlFor, ROUTES } from '../../../../routes';
import { push } from 'svelte-spa-router';
import axios from 'axios';

const CACHE_USER_KEY = 'user';

export interface User extends Record<string, unknown> {
    token?: string;
}

interface ILoginData {
    username: string;
    password: string;
}

let user: User = loadUser();

function set(key: string, value: any) {
    user[key] = value;
    localStorage.setItem(CACHE_USER_KEY, JSON.stringify(user));
}

function loadUser() {
    return JSON.parse(localStorage.getItem(CACHE_USER_KEY) || '{}');
}

export function login({ username, password }: ILoginData) {
  if (!username || !password) {
    return Promise.reject('invalid params');
  }
  return axios.post<any, { data: { accessToken: string } }>('http://sefe-d2r.bcc-bdbl.baidu.com:8280/auth/login', {
      // TODO: password security, this is only a demo
      username, password,
    }, {
      headers: {
        'Content-Type': 'application/json',
    }})
    .then(res => {
      if (res && res.data && res.data.accessToken) {
        localStorage.setItem('accessToken', res.data.accessToken);
      }
      else {
        // TODO: use error code
        throw new Error('no token');
      }
    });
}

export function logout() {
    user = {};
    localStorage.removeItem('CACHE_USER_KEY');
    push(urlFor(ROUTES.LOGIN));
}

export function get() {
    if (!user?.token) {
        loadUser();
    }
    return user;
}
