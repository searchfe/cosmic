import 'reflect-metadata';
import App from './App.svelte';
import { Container } from 'inversify';
import 'reflect-metadata';
import type {UIColorRef } from '../services/color';
import {UIColor, UIColorElement} from '../services/color';

// const myContainer = new Container();

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

const appContainer = new Container();
appContainer.bind<UIColorRef>(UIColor).to(UIColor);
appContainer.bind<HTMLElement>(UIColorElement).toDynamicValue(() => document.getElementById('') as HTMLElement);

export default app;
