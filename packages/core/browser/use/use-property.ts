import { reactive, ref, watch, computed, nextTick, toRaw, watch, watchEffect, toRefs, type WatchStopHandle } from 'vue';
import { inject } from '@cosmic/core/parts';
import type { BaseStyle } from '@cosmic/core/parts';
import type { interfaces } from '@cosmic/core/inversify';
import type { BaseService, NodeService } from '../service';
import { TOKENS } from '../service';

export function usePropterty<T>(token: interfaces.ServiceIdentifier<T> = TOKENS.TextStyle) {

    let stopWatch: WatchStopHandle | null = null;

    const baseService = inject(token) as unknown as BaseService;

    const nodeService = inject<NodeService>(TOKENS.Node);

    const styleId = ref('1');

    const isStandard = ref(false);

    const standard = ref(resetStyle(styleId.value));

    const standardList = ref(baseService.getServiceStyles());

    const isShowStandardModal = ref(false);

    const isShowDetailModal = ref(false);

    const detailTarget = ref<HTMLElement | null>(null);

    const standardTarget = ref<HTMLElement | null >(null);

    let detailEdit = null;

    baseService.subject?.subscribe(subject => {
        switch (subject.type) {
            case 'R':
                standardList.value = subject.data;
                resetStyle(styleId.value);
        } 
    });

    watchEffect(() =>  {
        standard.value = resetStyle(styleId.value);
    });

    function resetStyle(id: string) {
        if (stopWatch) {
            stopWatch();
        }
        const style = baseService.get(id) as unknown as any;
        if (styleId.value !== style.id) {
            styleId.value = style.id;
        }
        isStandard.value = !baseService.isLocalStyle(styleId.value);
        console.log(style);
        const reactivStyle = reactive(style);
        stopWatch = watch([reactivStyle], changeStyle);
        return reactivStyle;
    }


    function changeStyle(newValue, oldValue) {
        // TODO
        const textNode = nodeService.getSelection().filter(item => item.type === 'TEXT');
        const style = baseService.get(styleId.value);
        textNode.forEach(i => {
            const item = i as unknown as any;
            const style = newValue[0];
            if (style.fontSize && item.fontSize) {
                item.fontSize = Number(newValue[0].fontSize);
            }
            if (style.color && item.fills) {
                item.fills = [{...style}];
            }
            if (style.color && item.backgrounds) {
                item.backgrounds = [{...style}];
            }
        });
        nodeService.update(textNode as any[]);
    }

    function cancelStandardModal() {
        isShowStandardModal.value = false;
    }

    function cancelDetailModal() {
        isShowDetailModal.value = false;
    }

    async function saveDetail() {
        isShowDetailModal.value = false;
        await baseService.updateStyle(detailEdit);
    }

    async function openDetaileModal(target: HTMLElement, standard) {
        isShowDetailModal.value = false;
        await nextTick();
        detailEdit = (toRaw(standard) || baseService.get(styleId.value)).clone();
        detailTarget.value = target;
        isShowDetailModal.value = true;
    }

    function openStandardModal(target: HTMLElement) {
        standardTarget.value = target;
        isShowStandardModal.value = true;
    }

    function selectStandard(standard) {
        styleId.value = standard.id;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    function unRef() {
        styleId.value = baseService.unref(styleId.value)?.id;
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    async function updateStyle(style: BaseStyle) {
        const updateStyle = await baseService.updateStyle(style);
        if (isSelected.value) {
            selected.value = reactive(baseService.get(selected.value.id));
        }

        standardList.value = baseService.getLocalStyles();
    }

    async function saveStyle() {
        baseService.saveStyle(styleId.value);
    }

    function getDetailEdit() {
        return detailEdit;
    }

    return {
        styleId,
        isStandard,
        standard,
        isShowStandardModal,
        isShowDetailModal,
        detailTarget,
        standardTarget,
        standardList,

        updateStyle,
        cancelStandardModal,
        cancelDetailModal,
        saveDetail,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unRef,
        getDetailEdit,
        saveStyle,
    };
}
