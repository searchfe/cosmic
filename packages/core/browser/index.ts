import {createApp} from 'vue';
import type { BootstrapOption } from '@cosmic/core/parts';
import { Container}  from '@cosmic/core/parts';
// import { MComponent } from '@cosmic-module/core';

import App from './app.vue';

function bootstrap(option: BootstrapOption) {
  const container = new Container({ defaultScope: 'Singleton' });
  const app = createApp(App);

  // eslint-disable-next-line vue/component-definition-name-casing
  // app.component('m-component', MComponent);
  app.provide('container', container);
  app.mount(option.root);

}

export { bootstrap };
