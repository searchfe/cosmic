import type { Container } from 'inversify';
import { getContext } from 'svelte';

export default function inject(token: any) {
  return (getContext('container') as Container).get(token) as any;
}
