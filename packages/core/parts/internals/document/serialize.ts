import { SceneNode } from '.';
import DocumentNode from './base/document-node';
import PageNode from './base/page-node';
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
            if(key === 'parent' && node.type === 'DOCUMENT') return;
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
            }).filter(v => v !== undefined) as Array<string | number | boolean| NodeRef>;
            return rs;
        }
        if (value.type && CLS_MAP[value.type] && value.id){
            if (value.id) {
                return serializeNode(value);
            } else {
                return value;
            }
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


export function deserialize(data: {
    root: string;
    refs: Refs;
}) {
    const refMap : {
        [index: string]: DocumentNode | PageNode | SceneNode
    } = {};
    // const document =  new
    function create(ref: string) {
        if(refMap[ref]) return refMap[ref];
        const nodeData = data.refs[ref];
        if(nodeData === undefined) {
            throw new Error(`Ref Error ${data.refs}`);
        }
        if(CLS_MAP[nodeData.type] === undefined) {
            throw new Error(`Ref Type Error ${data.refs}`);
        }
        const node = new CLS_MAP[nodeData.type]();
        refMap[ref] = node;
        Object.keys(nodeData).forEach(key => {
            node[key] = generate(nodeData[key]);
        });
        return node;
    }
    
    function generate(
            value:
            string | number | boolean| NodeRef |
            (string | number | boolean| NodeRef)[] | BaseNodeMixin |
            undefined,
    ) {
        if (value === undefined) return;
        if (typeof value === 'string') return value;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value;
        if (Array.isArray(value)) {
            const rs = value.map(v => {
                return generate(v);
            }).filter(v => v !== undefined) as Array<string | number | boolean| BaseNodeMixin>;
            return rs;
        }
        if (value === null) {
            return;
        }
        if (typeof value === 'object') {
            // eslint-disable-next-line no-prototype-builtins
            if ((value as NodeRef).ref) {
                return create((value as NodeRef).ref);
            } else if((value as BaseNodeMixin).type && CLS_MAP[(value as BaseNodeMixin).type] !== undefined) {
                const node = new CLS_MAP[(value as BaseNodeMixin).type]();
                Object.keys(value).forEach(key => {
                    node[key] = generate((value as any)[key]);
                });
                return node;
            }
            
            // if (value.ref) {
            //     return create(value.ref);
            // } else if (value.type) {

            // }
            return value;
        }
        console.warn('Cant deserialize', value);
        return undefined;
    }
    return create(data.root);
}