export interface SchemaType {
    properties?: Record<string, any>;
    const?: string;
    enum?: Array<number | string>;
    default?: string;
    example?: string;
    allOf?: Array<Record<string, any>>;
    oneOf?: Record<string, any>;
    then?: Record<string, string>;
    else?: Record<string, string>;
    [key: string]: any;
}