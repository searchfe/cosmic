// import type { Container } from 'inversify';
// import { getContext } from 'svelte';

export default function inject<T>(token: any) {
    console.log(token as T);
    return null; // (getContext('container') as Container).get(token) as T;
}
