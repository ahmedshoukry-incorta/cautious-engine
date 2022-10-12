import { Parameter, PathParameter } from "swagger-schema-official";
import { isInt, isInt32, isInt64, replaceAll } from "../util";

function isPathParam(param: Parameter): param is PathParameter {
    return param.in === 'path';
}

export type AJVPathParameter = {
    name: string;
    type: 'string' | 'number' | 'integer';
    format?: string;
    pattern?: string;
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: boolean;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
}

export function extractPathParameters(parameters?: Parameter[]): AJVPathParameter[] {
    if (!parameters || !parameters.length) return [];
    const pathParameters = parameters.filter(param => isPathParam(param)) as PathParameter[];

    return pathParameters.map(pathParam => {
        if (pathParam.type === 'number' || pathParam.type === 'integer') {
            return {
                name: pathParam.name,
                type: pathParam.type,
                format: pathParam.format,
                maximum: pathParam.maximum,
                minimum: pathParam.minimum,
                exclusiveMaximum: pathParam.exclusiveMaximum ? pathParam.exclusiveMaximum : undefined,
                exclusiveMinimum: pathParam.exclusiveMinimum ? pathParam.exclusiveMinimum : undefined,
            };
        } else if (pathParam.type === 'string') {
            return {
                name: pathParam.name,
                type: 'string',
                pattern: pathParam.pattern,
                maxLength: pathParam.maxLength,
                minLength: pathParam.minLength
            };
        }
        throw new Error(`Unkown Path Parameter Type ${pathParam.type}`);
    });
}

export function convertPathTemplateToRegex(pathTemplate: string): string {
    // for example: "/resource/{resourceID}/sub-resource/{subResourceId}"
    const escapedForwaredSlashes = replaceAll(/\//g, "\\/", pathTemplate); // will be "\/resource\/{resourceID}\/sub-resource\/{subResourceId}"
    const pathParamsRegex = replaceAll(/\{(.*?)\}/, '[a-zA-Z0-9_.-]*', escapedForwaredSlashes); // will be "\/resource\/[a-zA-Z0-9_.-]*\/sub-resource\/[a-zA-Z0-9_.-]*"
    return pathParamsRegex;
}

export function validateAPIPathMatchesPathRegex(apiPath: string, pathRegex: string): boolean {
    const apiPaths = apiPath.split('/');
    const pathRegexPaths = pathRegex.split('\\/');
    if (apiPaths.length !== pathRegexPaths.length) return false;

    return new RegExp(pathRegex).test(apiPath);
}

export function validateAPIPathMatchesAJVPathParameter(apiPath: string, ajvPathParameters: AJVPathParameter[], pathTemplate: string): boolean {
    if (!validateAPIPathMatchesPathRegex(apiPath, convertPathTemplateToRegex(pathTemplate))) {
        throw new Error(`Given API path "${apiPath}" doesn't match given path template ${pathTemplate}`);
    }

    const apiPaths = apiPath.split('/');
    const pathTemplatePaths = pathTemplate.split('/');

    const apiPathParameters: { name: string; value: string;}[] = [];

    pathTemplatePaths.forEach((path, index) => {
        if (path[0] === '{' && path[path.length - 1] === '}') {
            apiPathParameters.push({ name: path.substring(1, path.length - 1), value: apiPaths[index] });
        }
    });

    if (apiPathParameters.length !== ajvPathParameters.length) {
        throw new Error(`Given AJV path paremeters doesn't match given path template ${pathTemplate}`);
    }

    if (!apiPathParameters.length) return true;

    return apiPathParameters.every(param => {
        const [ajvPathParameter] = ajvPathParameters.filter(ajvPathParam => ajvPathParam.name === param.name);

        if (ajvPathParameter.type === 'number' || ajvPathParameter.type === 'integer') {
            const paramVal = Number(param.value);
            const isParamNumber = !isNaN(paramVal);            

            if (!isParamNumber) return false;
            
            if (ajvPathParameter.exclusiveMaximum) {
                if (ajvPathParameter.maximum == undefined) throw new Error('Path parameter has exclusiveMaximum as true but there\'s no maximum value');
                if (paramVal >= ajvPathParameter.maximum) return false;
            }

            if (ajvPathParameter.maximum) {
                if (paramVal > ajvPathParameter.maximum) return false;
            }

            if (ajvPathParameter.exclusiveMinimum) {
                if (ajvPathParameter.minimum == undefined) throw new Error('Path parameter has exclusiveMinimum as true but there\'s no minimum value');
                if (paramVal <= ajvPathParameter.minimum) return false;
            }

            if (ajvPathParameter.minimum) {
                if (paramVal < ajvPathParameter.minimum) return false;
            }

            if (ajvPathParameter.format) {
                if (ajvPathParameter.format === 'int32') { 
                    if (!isInt(paramVal)) return false;
                    if (!isInt32(param.value)) return false;
                } else if (ajvPathParameter.format === 'int64') { 
                    if (!isInt(paramVal)) return false;
                    if (!isInt64(param.value)) return false;
                }
                // else if (ajvPathParameter.format === 'float') {
                    
                // } else if (ajvPathParameter.format === 'double') {

                // }
            }

            return true;
        } else {
            if (ajvPathParameter.pattern) {
                if (!new RegExp(ajvPathParameter.pattern).test(param.value)) return false;            
            }

            if (ajvPathParameter.maxLength) {
                if (param.value.length > ajvPathParameter.maxLength) return false;
            }

            if (ajvPathParameter.minLength) {
                if (param.value.length < ajvPathParameter.minLength) return false;
            }

            return true;
        }
    })
}