export type Type = gql.Variant;

export const empty: Type = {
    name: '',
    type: '',
    defaultValue: '',
    desc: '',
};

export const tableColumns: Array<{ title: string; key: keyof Type }> = [
    { title: '名称', key: 'name' },
    { title: '类型', key: 'type' },
    { title: '默认值', key: 'defaultValue' },
    { title: '说明', key: 'desc' },
];
