import { reactive, ref, watch, toRaw } from 'vue';
import { inject } from '@cosmic/core/parts';
import type { BaseStyle } from '@cosmic/core/parts';
import type { interfaces, TextStyle } from '@cosmic/core/inversify';
import type { BaseService, NodeService } from '../service';
import { TOKENS } from '../service';


export function useStyle(
    token: interfaces.ServiceIdentifier<T> = TOKENS.TextStyle,
    id: string,
    autoSave = true,
) {
    const baseService = inject(token) as BaseService;
    const textStyle = reactive<TextStyle>(baseService.get(id));

    
    if (autoSave) {
        watch(textStyle, (newValue, oldValue) => {
            updateStyle();
        });
    }

    function updateStyle() {
        // TODO:
    }

    return {
        textStyle,
        updateStyle,
    };
}
 
