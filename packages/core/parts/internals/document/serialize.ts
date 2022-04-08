import BaseNodeMixin from './mixin/base-node-mixin';

interface NodeRef {
    ref: string;
}
interface NodeData {
    id: string;
    type: string;
    [index: string]: string | number | NodeRef | Array<NodeRef>
}
interface Refs {
    [index: string]: NodeData;
}

const CLS_MAP: Record<string, any> = {};

type NodeValueType = string | boolean | BaseNodeMixin | number;

export function serializable(name?: string) {
    return (target: any) => {
        CLS_MAP[name || (new target()).type] = target;
    };
}

export function serialize(object: BaseNodeMixin) {
    const refs: Refs = {};

    function serializeNode(node: BaseNodeMixin) {
        if (refs[node.id]) return {ref: node.id} as NodeRef;
        const rs: NodeData = {id: node.id, type: node.type}; 
        refs[node.id] = rs;
        Object.keys(node).forEach(key => {
            (rs as any)[key] = transfer((node as any)[key]);
        });
        return {ref: node.id} as NodeRef;
    }

    function transfer(value: NodeValueType | Array<NodeValueType>) {
        if (value === undefined || value === null) return undefined;
        if (typeof value === 'string') return value;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value;
        if (Array.isArray(value)) {
            const rs = value.map(v => {
                return transfer(v);
            }).filter(v => v !== undefined) as Array<string | boolean| NodeRef>;
            return rs;
        }
        if (value.type && CLS_MAP[value.type] && value.id){
            return serializeNode(value);
        }
        if (typeof value === 'object') {
            return value;
        }
        console.warn('Cant serialize', value);
        return undefined;
    }

    return {
        root: serializeNode(object).ref,
        refs,
    };
}
