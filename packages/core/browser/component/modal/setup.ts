import { ref, onMounted, onUnmounted, defineEmits } from 'vue';
import { service, inject } from '@cosmic/core/browser';


export function useModal(
    target: HTMLElement,
    emits: (event: 'ok' | 'cancel', ...args: any[]) => void,
) {

    const toolService = inject<service.ToolService>(service.TOKENS.Tool);

    const positionStyle = ref({});

    let containerTarget: HTMLElement | null = null;

    function autoClose(event: MouseEvent) {
        const currentTarget = event.target as HTMLElement;
        const isIncludes = containerTarget && containerTarget.contains(currentTarget);
        if (isIncludes) {
            return;
        }
        cancel();
    }

    function setContainerTarget(ele: HTMLElement) {
        containerTarget = ele;
    }

    function comoutPositionStyle() {
        if (!target) return {};
        const react = (target as HTMLElement).getBoundingClientRect();
        positionStyle.value = {left: `${react.left}px`, top: `${react.top}px`, zIndex: 9};
    }

    function cancel() {
        toolService.cancel(service.ToolState.Modal);
        emits('cancel');
    }

    function ok() {
        toolService.cancel(service.ToolState.Modal);
        emits('ok');
    }


    onUnmounted(() =>  {
        window.document.body.removeEventListener('mousedown', autoClose);
    });

    onMounted(() => {
        toolService.set(service.ToolState.Modal);
        window.document.body.addEventListener('mousedown', autoClose);
    });

    return {
        positionStyle,
        setContainerTarget,
        comoutPositionStyle,
        ok,
        cancel,
    };
}
