import { reactive, ref } from 'vue';


export interface Atom {
    property: object;
    standard: any[]
}

export function useAtom(data: Atom) {

    const { property, standard } = data;

    const proxyProperty = reactive(property);

    const standardList = ref(standard);

    const isShowStandardModal = ref(false);

    const isShowDetailModal = ref(false);

    const detailTarget = ref<HtmlElement | null >(null);

    const standardTarget = ref<HtmlElement | null >(null);

    const selected = ref(null); 

    function cancelStandardModal() {
        isShowStandardModal.value = false;
    }

    function cancelDetailModal() {
        isShowDetailModal.value = false;
    }

    function openDetaileModal(target: HtmlElement) {
        console.log(target);
        detailTarget.value = target;
        isShowDetailModal.value = true;
    }

    function openStandardModal(target: HtmlElement) {
        standardTarget.value = target;
        isShowStandardModal.value = true;
    }

    function selectStandard(standard) {
        selected.value = standard;
        console.log(standard);
        isShowStandardModal.value = false;
        isShowDetailModal.value = false;
    }

    function unSelectStandard() {
        selected.value =  null;
    }

    return {
        property: proxyProperty,
        isShowStandardModal,
        isShowDetailModal,
        selected,
        detailTarget,
        standardTarget,
        standardList,

        cancelStandardModal,
        cancelDetailModal,
        selectStandard,
        openDetaileModal,
        openStandardModal,
        unSelectStandard,
    };
}
