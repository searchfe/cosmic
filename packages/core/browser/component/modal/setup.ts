import { ref, onMounted, onUnmounted } from 'vue';
import type { EmitFn, EE } from 'vue';

export function useModal(target: HTMLElement, emits: EmitFn<EE[]>) {

    const positionStyle = ref({});

    let containerTarget: HTMLElement | null = null;

    function autoClose(event: MouseEvent) {
        console.log(22);
        const currentTarget = event.target as HTMLElement;
        const isIncludes = containerTarget && containerTarget.contains(currentTarget);
        if (isIncludes) {
            return;
        }
        emits('cancel');
    }

    function setContainerTarget(ele: HTMLElement) {
        containerTarget = ele;
    }

    function comoutPositionStyle() {
        if (!target) return {};
        const react = (target as HTMLElement).getBoundingClientRect();
        positionStyle.value = {left: `${react.left}px`, top: `${react.top}px`, zIndex: 9};
    }


    onUnmounted(() =>  {
        window.document.body.removeEventListener('click', autoClose);
    });

    onMounted(() => {
        window.document.body.addEventListener('click', autoClose, false);
    });

    return {
        emits,
        positionStyle,
        setContainerTarget,
        comoutPositionStyle,
    };
}
