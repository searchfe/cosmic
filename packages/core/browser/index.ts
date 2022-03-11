import { createApp } from 'vue';
import urql from '@urql/vue';
import { gqlClientOptions }  from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';

import { createContainer } from './ioc/index';
import App from './app.vue';

import type { BootstrapOption } from '@cosmic/core/parts';


function bootstrap(option: BootstrapOption) {
    const container = createContainer({ defaultScope: 'Singleton' });
    const app = createApp(App);

    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    app.use(urql, gqlClientOptions);
    app.provide('container', container);
    app.mount(option.root);

}

export { bootstrap };

export { interfaces as iocInterface, TOKENS as iocToken } from './ioc/index';
