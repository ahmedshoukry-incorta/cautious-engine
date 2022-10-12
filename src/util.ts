import { Schema, BodyParameter, HeaderParameter, Parameter, Path, PathParameter, QueryParameter, Response, Spec } from "swagger-schema-official";
import { convertPathTemplateToRegex, extractPathParameters } from "./utils/path-parameters";

let count = 0;
export function echo(action: string) {
    console.log(`${++count}. ${action}`)
}

export function isPathParam(param: Parameter): param is PathParameter {
    return param.in === 'path';
}

export function isQueryParam(param: Parameter): param is QueryParameter {
    return param.in === 'query';
}

export function isRequestBodyParam(param: Parameter): param is BodyParameter {
    return param.in === 'body';
}

export function isHeaderParam(param: Parameter): param is HeaderParameter{
    return param.in === 'header';
}

export function schemaMapper(apiMethod: 'get' | 'post' | 'delete' | 'put' | 'patch', value: Path, map: any, pathName: string, apiPathParameters?: any) {    
    const apiPath = `${apiMethod.toUpperCase()} ${convertPathTemplateToRegex(pathName)}`;
    const pathParams = extractPathParameters(value[apiMethod]?.parameters as Parameter[]);
    const queryParams = value[apiMethod]?.parameters?.
        filter(param => isQueryParam(param as Parameter)).
        map((param: any) => ({ [param.name]: { type: param.type, nullable: !param.required } }));
    const headers = value[apiMethod]?.parameters?.
        filter(param => isHeaderParam(param as Parameter)).
        map((param: any) => ({ [param.name]: { type: param.type, nullable: param.required } }));
    const requestBody = value[apiMethod]?.parameters?.
        filter(param => isRequestBodyParam(param as Parameter)).
        map((param: any) => param.schema)[0];

    const responses = Object.keys(value[apiMethod]?.responses!).reduce((acc: any, key: string) => {
        const tmp = (value[apiMethod]?.responses[key] as Response).schema!;
        objectSchema(tmp);
        acc[key] = tmp;
        return acc;
    }, {});
            
    map[apiPath] = {
        template: `${apiMethod.toUpperCase()} ${pathName}`
    };
            
    if (pathParams?.length || queryParams?.length || apiPathParameters?.length) {
        map[apiPath].parameters = {};

        if (apiPathParameters?.length) {
            map[apiPath]['parameters']['path'] = apiPathParameters;
        }
        
        if (pathParams?.length) {
            map[apiPath]['parameters']['path'] = apiPathParameters?.length ? [...apiPathParameters, ...pathParams] : pathParams;
        }

        if (queryParams?.length) {
            map[apiPath]['parameters']['query'] = queryParams;
        }
    }

    if (headers?.length) {
        map[apiPath]['headers'] = headers;
    }

    if (requestBody) {
        objectSchema(requestBody);
        map[apiPath]['request'] = requestBody;
    }

    if (responses) {
        map[apiPath]['responses'] = responses;
    }
}

export function objectSchema(schema: any) {
    if (typeof schema !== 'object') return;
    const required = schema.required ? schema.required : [];
    if (schema.properties) {
        Object.entries(schema.properties!).forEach(([key, val]: [string, any]) => {
            if (!required.includes(key)) {
                ((schema.properties as any)[key] as any)['nullable'] = true;
            }
            if (val.type === 'object') objectSchema(val);
        });
    } else {
        Object.entries(schema!).forEach(([key, val]: [string, any]) => {            
            if (typeof val === 'object') objectSchema(val);
        });
    }
    // if (schema.additionalProperties) {        
    //     Object.entries(schema.additionalProperties!).forEach(([key, val]: [string, any]) => {
    //         // if (!required.includes(key)) {
    //         //     ((schema.additionalProperties as any)[key] as any)['nullable'] = true;
    //         // }                    
    //         // if (val.type === 'object') objectSchema(val);        
    //     });
    // }
}

function _validateSchmea(schema: any, obj: any) {
    Object.entries(obj).forEach(([key, val]: [string, any]) => {
        if (schema[key] == undefined) throw new Error(`property ${key} was not found`)
        if (val?.type === 'object') _validateSchmea(schema, val);
    });
}

export function validateSchema(schemas: any[], obj: any) {
    // console.log(schemas)
    if (typeof obj !== 'object') return;
    let tmp: any = {};
    schemas.forEach(schema => {
        tmp = Object.assign(tmp, schema.properties);
    });
    // console.log(tmp);
    
    _validateSchmea(tmp, obj);
}


export function ajvSchema({paths}: Spec) {
    const map = {} as Record<string, any>;
    Object.entries(paths).forEach(([key, value]: [key: string, value: Path]) => {
        const apiPathParameters = value.parameters?.
            filter(param => isPathParam(param as Parameter)).
            map((param: any) => ({ [param.name]: { type: param.type, required: true } }));      
        
        if (value.get) {
            schemaMapper('get', value, map, key, apiPathParameters);
        }
        if (value.post) {
            schemaMapper('post', value, map, key, apiPathParameters);
        }
        if (value.put) {
            schemaMapper('put', value, map, key, apiPathParameters);
        }
        if (value.patch) {
            schemaMapper('patch', value, map, key, apiPathParameters);
        }
        if (value.delete) {
            schemaMapper('delete', value, map, key, apiPathParameters);
        }
    });
    return map;
}

export const replaceAll = function (match: RegExp, replace: string, val: string) {
    return val.replace(new RegExp(match, 'g'), () => replace);
}

export const isInt = function (num: number) {
    return num % 1 === 0;
}

export const isInt64 = function (num: string): boolean {
    const MAX_INT_64 = '9223372036854775807';
    const MIN_INT_64 = '9223372036854775808';
    const isNegativeNum = num[0] === '-';
    const numWithoutSign = isNegativeNum ? num.substring(1, num.length) : num;
    let numWithoutExceedingZeros = numWithoutSign;

    for (let i = 0; i < numWithoutSign.length; i++) {
        if (numWithoutSign[i] === '0') continue;
        numWithoutExceedingZeros = numWithoutSign.substring(i, numWithoutSign.length);
        break;
    }

    if (numWithoutExceedingZeros.length > MIN_INT_64.length) return false;
    if (numWithoutExceedingZeros.length > MAX_INT_64.length) return false;

    if (isNegativeNum && numWithoutExceedingZeros.length === MIN_INT_64.length) {
        for (let i = 0; i < numWithoutExceedingZeros.length; i++) {
            if (numWithoutExceedingZeros[i] > MIN_INT_64[i]) return false;
        }
    }

    if (!isNegativeNum && numWithoutExceedingZeros.length === MAX_INT_64.length) {
        for (let i = 0; i < numWithoutExceedingZeros.length; i++) {
            if (numWithoutExceedingZeros[i] > MAX_INT_64[i]) return false;
        }
    }

    return true;
    
}

export const isInt32 = function (num: string): boolean {
    const maxInt32 = 2147483647;
    const minInt32 = -2147483648;
    
    return Number(num) <= maxInt32 && Number(num) >= minInt32;
}

