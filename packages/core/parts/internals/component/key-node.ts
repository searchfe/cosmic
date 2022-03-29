type NodeType = 'Slot' | 'Text'

export type Type = Omit<gql.KeyNode, 'type'> & { type: NodeType };

export const empty: Type = {
    name: '',
    type: 'Text',
    desc: '',
};

export const tableColumns: Array<{ title: string; key: keyof Type }> = [
    { title: '名称', key: 'name' },
    { title: '类型', key: 'type' },
    { title: '说明', key: 'desc' },
];
