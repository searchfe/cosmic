import {createApp} from 'vue';
import type { BootstrapOption } from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';

import { createContainer } from './ioc/index';
import App from './app.vue';

function bootstrap(option: BootstrapOption) {
    const app = createApp(App);
    const container = createContainer({ defaultScope: 'Singleton' });
    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    app.provide('container', container);
    app.mount(option.root);

}

export { bootstrap };
