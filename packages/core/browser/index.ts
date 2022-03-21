import { createApp } from 'vue';
import urqlPlugin from '@urql/vue';

import { gqlClientOptions }  from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';
import { createContainer } from './ioc/index';
import App from './app.vue';
import { routify } from './routes';

import type { BootstrapOption } from '@cosmic/core/parts';

import MColor from './component/color/color.vue';
import MTitle from './component/title/title.vue';
import MWidget from './component/widget/widget.vue';
import MStandardModal from './component/modal/standard-modal.vue';
import MDetailModal from './component/modal/detail-modal.vue';
import MStandard from './component/standard/standard.vue';

import { RouterService } from './service';


function bootstrap(option: BootstrapOption) {
    const app = createApp(App);

    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    // gql
    app.use(urqlPlugin, gqlClientOptions);

    const router = routify();

    // router
    app.use(router);
    // ioc container
    const container = createContainer({ defaultScope: 'Singleton' });
    container.bind(RouterService).toConstantValue(new RouterService(router));

    app.provide('container', container);

    app.mount(option.root);

}

export { bootstrap };

export * as service from './service';
export * as urql from '@urql/vue';
export * as router from 'vue-router';
export { default as lodash } from 'lodash';
export { MColor, MTitle, MWidget, MStandardModal, MStandard, MDetailModal};
