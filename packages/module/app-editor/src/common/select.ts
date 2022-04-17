import { service } from '@cosmic/core/browser';
import { type ObjectDirective } from 'vue';

export default {
    mounted(el: HTMLElement, binding) {
        const container = binding.instance?.$.appContext.provides?.container;
        const nodeService: service.NodeService = container.get(service.TOKENS.Node);
        const toolService: service.ToolService = container.get(service.TOKENS.Tool);
        el.addEventListener('mousedown', (event) => {
            if (toolService.getState() === service.ToolState.Null) {
                nodeService.setSelection([binding.value.id]);
                // event.preventDefault();
                event.stopPropagation();
            }
        });
    },
} as ObjectDirective;
