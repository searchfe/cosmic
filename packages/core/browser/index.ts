import { createApp, ref, type App as VueApp } from 'vue';

import { MComponent } from '@cosmic-module/core';
import { SanComponent } from '@cosmic-module/san-loader';
import { createContainer, TOKENS, type RouterService } from './service/index';
import App from './app.vue';
import Preview from './component/preview/preview.vue';
import ChildrenRender from './component/preview/render/children.vue';
import MColor from './component/color/color.vue';
import MClolorWidget from './component/color/color-widget.vue';
import MTitle from './component/title/title.vue';
import MWidget from './component/widget/widget.vue';
import MStandardModal from './component/modal/standard-modal.vue';
import MDetailModal from './component/modal/detail-modal.vue';
import MStandard from './component/standard/standard.vue';

import type { BootstrapOption } from '@cosmic/core/parts';
import type { GqlClient } from './service/index';

export { default as IImage} from './case/image/image.vue';

export { default as IAvatar } from './case/avatar/avatar.vue';


function bootstrap(option: BootstrapOption) {
    const app = createApp((location.search || '').indexOf('preview=1') == -1? App: Preview);
    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    app.component('SComponent', SanComponent);
    app.component('ChildrenRender', ChildrenRender);

    // ioc container
    const container = createContainer({ defaultScope: 'Singleton' });


    const routerPlugin = container.get<RouterService>(TOKENS.Router);
    app.use(routerPlugin.getRouterConfig());
    const urql = container.get<GqlClient>(TOKENS.GqlClient);

    app.use(function (app: VueApp) {
        app.provide('$urql', ref(urql));
    });

    app.provide('container', container);
    app.mount(option.root);

}

export { bootstrap };

// export * as service from './service/index';
export * as router from 'vue-router';
export { default as lodash } from 'lodash';
export { default as color } from 'color';

export { MColor, MTitle, MWidget, MStandardModal, MStandard, MDetailModal, MClolorWidget};

export * from './use';
export * as service from './service/index';
export * as esl from './esl.js';
