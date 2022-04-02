export const CLS_MAP: Record<string, any> = {};


export function serializable(name = '') {
    return (target) => {
        CLS_MAP[name] = target;
    };
}
