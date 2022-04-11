import { service } from '@cosmic/core/browser';
import { FrameNode, GroupNode, PageNode, SceneNode } from '@cosmic/core/parts';
import { type ObjectDirective } from 'vue';

export default {
    mounted(el: HTMLElement, binding) {
        const container = binding.instance?.$.appContext.provides?.container;
        let targetNode: PageNode | FrameNode | GroupNode = binding.value.target;
        const root: HTMLElement = binding.value.container && el.getElementsByClassName(binding.value.container)[0] || el;
        if (!container) return;
        const toolService: service.ToolService = container.get(service.TOKENS.Tool);
        const nodeService: service.NodeService = container.get(service.TOKENS.Node);

        let startX: number, startY: number, originX: number, originY: number;
        let editState: service.ToolState | undefined;
        let editingChild: SceneNode | undefined;
        toolService.state().subscribe((state: service.ToolState) => {
            if (editState === service.ToolState.Component && state !== editState) {
                addComponent();
            }
            if (
                state === service.ToolState.Frame ||
                state === service.ToolState.Text ||
                state === service.ToolState.Component
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
                const width = event.offsetX - startX;
                const height = event.offsetY - startY;
                editingChild.width = Math.abs(width);
                editingChild.height = Math.abs(height);
                editingChild.x = width > 0 ? originX : originX + width;
                editingChild.y = height > 0 ? originY : originY + height ;

                // editingChild.width = Math.max(event.offsetX - startX, 10);
                // editingChild.height = Math.max(event.offsetY - startY, 10);
                nodeService.update([editingChild]);
            }
        });
        window.addEventListener('mousemove', (event: MouseEvent) => {
            if (editState === service.ToolState.Component) {
                const rect = root.getBoundingClientRect();
                if (rect.x < event.clientX  && event.clientX < rect.x + rect.width) {
                    if (rect.y < event.clientY && event.clientY < rect.y + rect.height) {
                        const style = window.getComputedStyle(root);
                        const matrix = new DOMMatrixReadOnly(style.transform);
                        originX = event.clientX - rect.x - matrix.m41;
                        originY = event.clientY - rect.y - matrix.m42;
                        return;
                    }
                }
                originX = originY = -9999;
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
            targetNode = (el as any).__c_target || targetNode;
            switch(editState) {
                case service.ToolState.Frame:
                    editingChild = nodeService.addFrame(targetNode);
                    editingChild.x = x;
                    editingChild.y = y;
                    editingChild.width = width;
                    editingChild.height = height;
                break;
                case service.ToolState.Text:
                    editingChild = nodeService.addText(targetNode);
                    editingChild.x = x;
                    editingChild.y = y;
                    editingChild.width = width;
                    editingChild.height = height;
                break;
            }
        }
        function addComponent() {
            targetNode = (el as any).__c_target || targetNode;
            let width = 60, height = 32;
            if (originX !== -9999 && originY !== -9999) {
                switch(toolService.data.name) {
                    case 'aladin':
                        width=480;
                        height=400;
                        break;
                    case 'image':
                        width=40;
                        height=40;
                        break;
                    case 'scroll':
                        width=480;
                        height=125;
                        break;
                }
                const node = nodeService.addComponent(targetNode);
                node.x = originX - width/2;
                node.y = originY - height/2;
                node.width = width;
                node.height = height;
                node.cname = toolService.data.name;
            }
            editState = undefined;
        }
    },
    updated(el, binding) {
        (el as any).__c_target = binding.value.target;
    },
} as ObjectDirective;
