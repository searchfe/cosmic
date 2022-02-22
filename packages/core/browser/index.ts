import App from './app.vue';
import {createApp, defineAsyncComponent} from 'vue';
import type { BootstrapOption } from '@cosmic/core/parts';
import load from '@cosmic-module/module-loader';

function bootstrap(option: BootstrapOption) {
  const app = createApp(App);
  // import();

  Object.keys(option.modules).forEach(key => {
    app.component(
      key,
      defineAsyncComponent(() => load(option.modules[key]).then(module => {
        console.log(module.default.Component);
        return module.default.Component;
      })),
    );
  });

  app.mount(option.root);
}

export { bootstrap };
