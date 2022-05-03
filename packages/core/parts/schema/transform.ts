import { cloneDeep } from '../../lodash';
import { ComponentNode, FrameNode, SceneNode } from '../internals';
import { SchemaType } from './type';

const layoutKeys = [
    'layoutMode',
    'primaryAxisSizingMode',
    'counterAxisSizingMode',
    'primaryAxisAlignItems',
    'counterAxisAlignItems',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'itemSpacing',
    'clipsContent',
    'x',
    'y',
    'rotation',
    'width',
    'height',
    'layoutAlign',
    'constraints',
    'layoutGrow',
    'topLeftRadius',
    'topRightRadius',
    'bottomLeftRadius',
    'bottomRightRadius',
    'overflowDirection',
];

const excludeKeys = [
    'allOf',
    'oneOf',
];



export function transformUiShema(root: FrameNode | ComponentNode, model: Record<string, any>, type: 'pc' | 'wise') {
    const uiSchema = {
        title: 'wuji_template',
        type: 'array',
        flatten: true,
        items: [
            ...transformTreeNode(root, model, type),
        ],
    };
    return uiSchema;
}

export function getRenderSchemaAndModel(schema: SchemaType, model: Record<string, any>): {schema: SchemaType, model: Record<string, any>} {
    const renderSchema = cloneDeep(schema);
    // 当前渲染的model
    const renderModel = cloneDeep(model);
    // 根据model生成了renderSchema
    generateShema(renderSchema, renderModel);
    const updateModel = generateModel(renderSchema, renderModel) as Record<string, any>;
    return {
        schema: renderSchema,
        model: updateModel,
    };
}

function transformTreeNodeLayout(treeNode: FrameNode | ComponentNode) {
    return layoutKeys.reduce((previousValue: Record<string, any>, key: string) => {
        const value = (treeNode as Record<string, any>)[key];
        if (!value) return previousValue;
        previousValue[key] = {
            type: 'string',
            dataType: 'const',
            const: value,
        };
        return previousValue;
    }, {});
}

function transformTreeNode(treeNode: FrameNode | ComponentNode, model: Record<string, any>, type: 'pc' | 'wise'): Array<Record<string, any>> {
    if (!treeNode.children) return [];
    return treeNode.children.map((child) => {
        if (child instanceof ComponentNode) {
            return transformComponent(child, model, type);
        } else {
            return {
                type: 'object',
                properties: {
                    component: {
                        type: 'string',
                        dataType: 'const',
                        const: 'container',
                    },
                    data: {
                        type: 'object',
                        title: 'container',
                        description: '布局区域',
                        required: [
                            'designProperty',
                            'children',
                        ],
                        properties: {
                            designProperty: {
                                type: 'object',
                                dataType: 'const',
                                properties: transformTreeNodeLayout(treeNode),
                            },
                            children: {
                                flatten: true,
                                type: 'array',
                                items: [...transformTreeNode(child as FrameNode, model, type)],
                            },
                        },
                    },
                },
            };
        }
    });
}

function transformComponent(treeNode: ComponentNode, model:Record<string, any>, type: 'pc' | 'wise'): Record<string, any> {
    const schema = {};
    return {
        type: 'object',
        properties: {
            component: {
                type: 'string',
                dataType: 'const',
                const: 'poster',
            },
            data: transFormSchema(schema, model),
        },
    };
}

function transFormSchema(schema: SchemaType, model: Record<string, any>) {
    const { properties } = schema;
    if (!properties) return schema;
    const keys = Reflect.ownKeys(schema.properties as Record<string, any>) as string[];
    keys.reduce((pre: SchemaType, key: string) => {
        if (pre[key].type === 'object') {
            pre[key] = transFormSchema(pre[key], model[key]);
        } else if (pre[key].type === 'array') {
            const original = pre[key];
            pre[key] = {
                type: 'array',
                description: original.description,
                items: model[key].map((value: Record<string, any>) => transFormSchema(original.items, value)),
            };
        } else {
            if (model[key] != null) {
                pre[key].const = model[key];
            }
            if (model.customNewDataType?.[key]) {
                pre[key].newDataType = model.customNewDataType[key];
            }
        }
        return pre;
    }, properties);
    excludeKeys.forEach(key => Reflect.deleteProperty(schema, key));
    
}

// 根据schema对model进行更行
function generateModel(schema: SchemaType, model: Record<string, any> = {}) {
    const curModel = cloneDeep(model);
    const { properties } = schema;
    if (!properties) return;
    const keys = Reflect.ownKeys(properties) as string[];
    // 把当前删除属性，删除掉
    Reflect.ownKeys(curModel)
    .filter(item => !keys.includes(item as string))
    .forEach(key => Reflect.deleteProperty(curModel, key));
    
    for (const key of keys) {
        const curSchema = properties[key];
        if (curSchema.type === 'object') {
            const childMode = generateModel(curSchema, curModel[key]);
            if (childMode !== undefined) {
                curModel[key] = childMode;
            }
        } else if (curSchema.type === 'array') {
            curModel[key].forEach(( model:any, index: number) => {
                curModel[key][index] =  generateModel(curSchema.items, model);
            });
        } else {
            const value = curSchema.const || curSchema.default;
            if (value !== undefined) {
                curModel[key] = curModel[key] !== undefined ? curModel[key] : value;
            }
        }
    }
    return curModel;
}

function generateShema(schema: SchemaType, model: Record<string, any> = {}) {
    const { properties, allOf, oneOf } = schema;
    if (!properties) return;
    const keys = Object.keys(properties as object);
    for (const key of keys) {
        if ( properties[key].type === 'object') {
            if (model[key] === undefined) model[key] = {};
            generateShema(properties[key], model[key]);
        }
        if (properties[key].type === 'array') {
            if (model[key] === undefined) model[key] = [];
            generateShema(properties[key], model[key]);
        }
        if (properties[key].const !== undefined && model[key] === undefined) {
            model[key] = properties[key].const;
        }
    }
    if (allOf || oneOf) {
        dealAllofOrOneOf(schema, model);
    }
}

function dealAllofOrOneOf(schema: SchemaType, model: Record<string, any>) {
    const {properties, allOf, oneOf } = schema;
    if (!properties) return;
    const condition = allOf || oneOf as any[];
    for(const item  of condition) {
        if (item.if) {
            handleCondition(item, schema, model);
        }
    }
}

function handleCondition(item: SchemaType, schema: SchemaType, model: Record<string, any>) {
    const {then: thenValue, else: elseValue, if: ifValue} = item;
    const { properties : ifValueProperties } = ifValue;
    if (!ifValueProperties || !schema.properties) return;
    const keys = Object.keys(ifValueProperties);
    let canInsert = true;
    let firstMatchPropertyKey;
    for(const key of keys) {
        if (model[key] !== undefined
            && model[key] === ifValueProperties[key].const){
            if (!firstMatchPropertyKey) {
                firstMatchPropertyKey = key;
            }
        } else {
            canInsert = false;
        }
    }
    if (canInsert) {
        if (thenValue && thenValue.properties) {
            if (elseValue && elseValue.properties) {
                removeProperties(elseValue, schema.properties, ifValue);
            }
            schema.properties = addProperties(thenValue, schema.properties, model, firstMatchPropertyKey);
        }
    } else {
        if (thenValue && thenValue.properties) {
            removeProperties(thenValue, schema.properties, ifValue);
        }
        if (elseValue && elseValue.properties) {
            schema.properties = addProperties(elseValue, schema.properties, model, firstMatchPropertyKey);
        }
    }
}

function addProperties(value: SchemaType, schemaProperties: SchemaType, model: Record<string, any>,  firstMatchPropertyKey: string | undefined) {
    const { properties } = value;
    if (!properties) return;
    const keys = Object.keys(properties);

    // 重新对key排序 
    if (firstMatchPropertyKey) {
        const tempSchema = schemaProperties;
        schemaProperties = {};
        const schemaKeys = Reflect.ownKeys(tempSchema) as string[];
        for (const schemaKey of schemaKeys) {
            schemaProperties[schemaKey] = tempSchema[schemaKey];
            if (schemaKey === firstMatchPropertyKey) {
                for (const key of keys) {
                    schemaProperties[key] = cloneDeep(properties[key]);
                }
            }
        }
    } else {
        for (const key of keys) {
            schemaProperties[key] = cloneDeep(properties[key]);
        }
    }
    
    return schemaProperties;
}

function removeProperties(value: SchemaType, schema: SchemaType, ifValue: SchemaType) {
    const { properties, required } = value;
    if (!properties) return;
    const keys = Object.keys(properties as object);
    for(const key of keys) {
        Reflect.deleteProperty(schema, key);
    }
}

function addModel(schema: SchemaType) {
    let model: string | boolean | number | Record<string, any>;
    if (schema.type === 'object') {
        console.log(1212);
       return {};
    }
}
