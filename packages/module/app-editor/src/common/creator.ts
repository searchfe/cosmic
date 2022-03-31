import { service } from '@cosmic/core/browser';
import { FrameNode, GroupNode, PageNode, SceneNode } from '@cosmic/core/parts';
import { type ObjectDirective } from 'vue';

export default {
    mounted(el: HTMLElement, binding) {
        const container = binding.instance?.$.appContext.provides?.container;
        const targetNode: PageNode | FrameNode | GroupNode = binding.value.target;
        const root: HTMLElement = binding.value.container && el.getElementsByClassName(binding.value.container)[0] || el;
        if (!container) return;
        const toolService: service.ToolService = container.get(service.TOKENS.Tool);
        const nodeService: service.NodeService = container.get(service.TOKENS.Node);

        let startX: number, startY: number, originX: number, originY: number;
        let editState: service.ToolState | undefined;
        let editingChild: SceneNode | undefined;
        toolService.state().subscribe((state: service.ToolState) => {
            if (
                state === service.ToolState.Frame ||
                state === service.ToolState.Text
            ) {
                editState = state;
            } else {
                editState = undefined;
            }
        });
        el.addEventListener('mousedown', (event: MouseEvent) => {
            if(!editState) return;
            event.preventDefault();
            event.stopPropagation();
            const style = window.getComputedStyle(root);
            const matrix = new DOMMatrixReadOnly(style.transform);
            startX = event.offsetX;
            startY = event.offsetY;
            originX = event.offsetX - matrix.m41;
            originY = event.offsetY - matrix.m42;
            appendChild(originX, originY);
        });
        el.addEventListener('mousemove', (event: MouseEvent) => {
            if (editState && editingChild) {
                editingChild.width = Math.max(event.offsetX - startX, 10);
                editingChild.height = Math.max(event.offsetY - startY, 10);
                nodeService.update([editingChild]);
            }
        });
        el.addEventListener('mouseup', () => {
            if(editState) {
                toolService.cancel(editState);
                editState = undefined;
            }
            if (editingChild) editingChild = undefined;
            startX = startY = originX = originY = 0;
        });

        function appendChild(x: number, y: number, width = 10, height = 10) {
            switch(editState) {
                case service.ToolState.Frame:
                    editingChild = nodeService.addFrame(targetNode, {
                        x,
                        y,
                        width,
                        height,
                    });
                break;
                case service.ToolState.Text:
                    editingChild = nodeService.addFrame(targetNode, {
                        x,
                        y,
                        width,
                        height,
                    });
                break;
            }
        }
    },
} as ObjectDirective;
