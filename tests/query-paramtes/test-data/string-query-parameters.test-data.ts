import { Parameter } from "swagger-schema-official";
import { UseCase } from ".";
import { AJVQueryParameter } from "../../../src/utils/query-paramters";

const stringTypeQueryParameter = {
    description: 'string type path param',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'string',
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        required: true,
        pattern: undefined,
        maxLength: undefined,
        minLength: undefined
    } as AJVQueryParameter
}

const stringTypeQueryParameterWithPattern = {
    description: 'string type path param with pattern',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'string',
        pattern: '/.*Id$/'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        required: true,
        pattern: '/.*Id$/',
        maxLength: undefined,
        minLength: undefined
    } as AJVQueryParameter
}

const stringTypeQueryParameterWithMaxMinLength = {
    description: 'string type path param with min. max. length',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'string',
        maxLength: 10,
        minLength: 5
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        required: true,
        pattern: undefined,
        maxLength: 10,
        minLength: 5
    } as AJVQueryParameter
}

export const stringTypeQueryParametersUseCases: UseCase[] = [
    stringTypeQueryParameter,
    stringTypeQueryParameterWithPattern,
    stringTypeQueryParameterWithMaxMinLength
]