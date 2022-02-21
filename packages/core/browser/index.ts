import App from './app.vue';
import {createApp} from 'vue';
import type { BootstrapOption } from '@cosmic/core/parts';

function bootstrap(option: BootstrapOption) {
  const app = createApp(App);
  // import();

  // Object.keys(option.modules).forEach(key => {
  //   app.component(
  //     key,
  //     defineAsyncComponent(() => import(option.modules[key])),
  //   );
  // });

  app.mount(option.root);
}

export { bootstrap };
