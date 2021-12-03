import { urlFor, ROUTES } from '../../../../routes';
import { push } from 'svelte-spa-router';
import axios from 'axios';

interface ILoginData {
  username: string;
  password: string;
}

export function login({ username, password }: ILoginData) {
  if (!username || !password) {
    return Promise.reject('invalid params');
  }
  return axios.post<any, { data: { accessToken: string } }>('http://localhost:3000/auth/login', {
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
  localStorage.clear();
  push(urlFor(ROUTES.LOGIN));
}
