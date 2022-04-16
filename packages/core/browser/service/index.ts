import { load } from './config';
import type { interfaces } from '@cosmic/core/inversify';


export function createContainer(options: interfaces.ContainerOptions) {
    return load(options);
}

export { TOKENS } from './token';
export * from './gql-client/index.service';
export type { RouterService } from './router/index.service';
export type { default as CanvasService } from './interactivity/canvas.service';
export type { default as KeyboardService } from './interactivity/keyboard.service';
export { type default as ToolService, ToolState } from './interactivity/tool.service';
export type { default as NodeService } from './document/node.service';
export type { default as ComponentService } from './document/component.service';
export type { default as DraftService } from './document/draft.service';
export * from './styles';
