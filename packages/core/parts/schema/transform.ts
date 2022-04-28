import { cloneDeep } from '../../lodash';
import { SchemaType } from './type';

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
