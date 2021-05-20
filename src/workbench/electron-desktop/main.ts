import 'reflect-metadata';
import App from './App.svelte';
import { Container } from 'inversify';
import 'reflect-metadata';
import { UIColorModule, UIColor } from '../services/color';

// const myContainer = new Container();

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

const appContainer = new Container();

appContainer.load(UIColorModule);

const uic = appContainer.get(UIColor);

console.log('equal?', uic);
export default app;
