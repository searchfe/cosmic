import { Container, type interfaces  }  from '@cosmic/core/inversify';
import { TOKENS } from './token';
import { gqlClient, type GqlClient } from './gql.service';
import { RouterService, type RouterServiceAPI } from './router/index.service';
import NodeService from './document/node.service';
import ComponentService from './document/component.service';
import TextStyleService from './styles/text-style.service';
import KeyboardService from './interactivity/keyboard.service';


/**
 * @description put all service coupling loigc here
 */
export function load(options: interfaces.ContainerOptions) {
    const container = new Container(options);

    // urql: gql client
    container.bind<GqlClient>(TOKENS.GqlClient).toFactory<GqlClient>(() => {
        return () => {
            return gqlClient;
        };
    });

    // router
    container.bind<RouterServiceAPI>(TOKENS.Router).toConstantValue(RouterService.create());
    container.bind<KeyboardService>(TOKENS.Keyboard).toConstantValue(new KeyboardService());

    container.bind<NodeService>(TOKENS.Node).to(NodeService);
    container.bind<TextStyleService>(TOKENS.TextStyle).to(TextStyleService);

    container.bind<ComponentService>(TOKENS.Component).to(ComponentService);
    

    return container;
}
