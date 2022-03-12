import { createApp } from 'vue';
import urql from '@urql/vue';

import { gqlClientOptions }  from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';
import { createContainer } from './ioc/index';
import App from './app.vue';
import { routify } from './routes';

import type { BootstrapOption } from '@cosmic/core/parts';


function bootstrap(option: BootstrapOption) {
    const app = createApp(App);

    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    // gql
    app.use(urql, gqlClientOptions);
    // router
    app.use(routify());
    // ioc container
    app.provide('container', createContainer({ defaultScope: 'Singleton' }));

    app.mount(option.root);

}

export { bootstrap };

export { interfaces as iocInterface, TOKENS as iocToken } from './ioc/index';
export * as router from 'vue-router';
