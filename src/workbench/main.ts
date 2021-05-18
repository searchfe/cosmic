import App from './App.svelte';
// import { Container } from "inversify";
import 'reflect-metadata';

// const myContainer = new Container();

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
