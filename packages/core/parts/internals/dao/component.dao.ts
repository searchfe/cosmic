export interface ComponentDao {
    name: string;
    description: string;
    variants: Variant[]
}

export interface Variant {
    key: string,
    value: string,
}
export class ComponentDaoImpl implements ComponentDao {
    name = '';
    description = '';
    variants = [];
}