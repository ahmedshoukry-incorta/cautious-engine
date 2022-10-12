import { Parameter, QueryParameter } from "swagger-schema-official";
import { isInt, isInt32, isInt64, replaceAll } from "../util";

function isQueryParam(param: Parameter): param is QueryParameter {
    return param.in === 'query';
}

export type AJVQueryParameter = {
    name: string;
    type: 'string' | 'number' | 'integer' | 'boolean';
    required: boolean;
    format?: string;
    pattern?: string;
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: boolean;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
}

export function extractQueryParameters(parameters?: Parameter[]): AJVQueryParameter[] {
    if (!parameters || !parameters.length) return [];
    const queryParameters = parameters.filter(param => isQueryParam(param)) as QueryParameter[];

    return queryParameters.map(queryParam => {
        if (queryParam.type === 'number' || queryParam.type === 'integer') {
            return {
                name: queryParam.name,
                type: queryParam.type,
                required: !!queryParam.required,
                format: queryParam.format,
                maximum: queryParam.maximum,
                minimum: queryParam.minimum,
                exclusiveMaximum: queryParam.exclusiveMaximum ? queryParam.exclusiveMaximum : undefined,
                exclusiveMinimum: queryParam.exclusiveMinimum ? queryParam.exclusiveMinimum : undefined,
            };
        } else if (queryParam.type === 'string') {
            return {
                name: queryParam.name,
                type: 'string',
                required: !!queryParam.required,
                pattern: queryParam.pattern,
                maxLength: queryParam.maxLength,
                minLength: queryParam.minLength
            };
        } else if (queryParam.type === 'boolean') {
            return {
                name: queryParam.name,
                type: queryParam.type,
                required: !!queryParam.required,
            }
        }
        throw new Error(`Unkown Query Parameter Type ${queryParam.type}`);
    });
}

export function extractQueryParametersFromApiPath(apiPath: string): { name: string; type: 'string' | 'number' | 'boolean' | 'integer'; value: any }[] {
    const [, queryString] = apiPath.split('?');

    if (!queryString) return [];

    return queryString.split('&').map(queryParam => queryParam.split('=')).map(([name, value]) => {
        if (value === 'true' || value === 'false') {
            return {
                name,
                type: 'boolean',
                value: value === 'true' ? true : false
            }
        } else if (!isNaN(Number(value))) {
            return {
                name,
                type: 'number',
                value,
            }
        } else {
            return {
                name,
                type: 'string',
                value
            }
        }
    });
}

export function validateAPIPathMatchesAJVQueryParameter(apiPath: string, ajvParameters: AJVQueryParameter[]) {
    const queryParams = extractQueryParametersFromApiPath(apiPath);

    if (queryParams.length > ajvParameters.length) {
        throw new Error('Given api path query param doesn\'t match given AJV query params. Query params count is more than given AJV query params');
    }

    ajvParameters.filter(param => param.required).forEach(requiredParam => {
        if (queryParams.findIndex(param => param.name === requiredParam.name) === -1) {
            throw new Error(`Missing required query param ${requiredParam.name}`);
        }
    });

    return queryParams.every(apiPathQueryParam => {
        const ajvParameter = ajvParameters.find(param => param.name === apiPathQueryParam.name);

        if (!ajvParameter) {
            throw new Error(`Given api path query param doesn\'t match given AJV query params. Api path query param ${apiPathQueryParam.name} was not found`);
        }        

        if (ajvParameter.type === 'number' || ajvParameter.type === 'integer') {
            const paramVal = Number(apiPathQueryParam.value);
            const isParamNumber = !isNaN(paramVal);

            if (!isParamNumber) return false;
            
            if (ajvParameter.exclusiveMaximum) {
                if (ajvParameter.maximum == undefined) throw new Error('Path parameter has exclusiveMaximum as true but there\'s no maximum value');
                if (paramVal >= ajvParameter.maximum) return false;
            }

            if (ajvParameter.maximum) {
                if (paramVal > ajvParameter.maximum) return false;
            }

            if (ajvParameter.exclusiveMinimum) {
                if (ajvParameter.minimum == undefined) throw new Error('Path parameter has exclusiveMinimum as true but there\'s no minimum value');
                if (paramVal <= ajvParameter.minimum) return false;
            }

            if (ajvParameter.minimum) {
                if (paramVal < ajvParameter.minimum) return false;
            }

            if (ajvParameter.format) {
                if (ajvParameter.format === 'int32') {
                    if (!isInt(paramVal)) return false;
                    if (!isInt32(apiPathQueryParam.value)) return false;
                } else if (ajvParameter.format === 'int64') {
                    if (!isInt(paramVal)) return false;
                    if (!isInt64(apiPathQueryParam.value)) return false;
                }
                // else if (ajvPathParameter.format === 'float') {
                    
                // } else if (ajvPathParameter.format === 'double') {

                // }
            }
        } else if (ajvParameter.type === 'string') {
            if (ajvParameter.pattern) {
                if (!new RegExp(ajvParameter.pattern).test(apiPathQueryParam.value)) return false;
            }

            if (ajvParameter.maxLength) {
                if (apiPathQueryParam.value.length > ajvParameter.maxLength) return false;
            }

            if (ajvParameter.minLength) {
                if (apiPathQueryParam.value.length < ajvParameter.minLength) return false;
            }
        }        
        return true;
    });

}