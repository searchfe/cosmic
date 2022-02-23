import App from './app.vue';
import {createApp} from 'vue';
import type { BootstrapOption } from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';

function bootstrap(option: BootstrapOption) {
  const app = createApp(App);

  // eslint-disable-next-line vue/component-definition-name-casing
  app.component('m-component', MComponent);
  app.mount(option.root);

}

export { bootstrap };
