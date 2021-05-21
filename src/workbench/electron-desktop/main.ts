import 'reflect-metadata';
import { Container } from 'inversify';

import App from './App.svelte';

import AppearanceMode from '@cosmic-workbench/ui/components/appearance-mode.svelte';
import { ColorSetRoot, ColorSet } from '@cosmic-workbench/ui/style/color-set.comp';

import { AppearanceService } from '@cosmic-workbench/services/appearance-service';



function $(dom: string){
  return document.querySelector(dom) as HTMLElement;
}
const app = new App({
  target: $('#app'),
});
const appContainer = new Container();

appContainer.bind(AppearanceService).to(AppearanceService);

appContainer.bind(ColorSetRoot).toDynamicValue(() => $('#head'));
appContainer.bind(ColorSet).to(ColorSet);

const uic = appContainer.get(ColorSet);

const am = new AppearanceMode({
  target: $('#ccc'),
  props: {appContainer},
});

export default app;
