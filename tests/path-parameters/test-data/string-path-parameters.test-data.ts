import { Parameter } from "swagger-schema-official";
import { UseCase } from ".";
import { AJVPathParameter } from "../../../src/utils/path-parameters";

const stringTypePathParameter = {
    description: 'string type path param',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'string',
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        pattern: undefined,
        maxLength: undefined,
        minLength: undefined
    } as AJVPathParameter
}

const stringTypePathParameterWithPattern = {
    description: 'string type path param with pattern',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'string',
        pattern: '/.*Id$/'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        pattern: '/.*Id$/',
        maxLength: undefined,
        minLength: undefined
    } as AJVPathParameter
}

const stringTypePathParameterWithMaxMinLength = {
    description: 'string type path param with min. max. length',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'string',
        maxLength: 10,
        minLength: 5
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'string',
        pattern: undefined,
        maxLength: 10,
        minLength: 5
    } as AJVPathParameter
}

export const stringTypePathParametersUseCases: UseCase[] = [
    stringTypePathParameter,
    stringTypePathParameterWithPattern,
    stringTypePathParameterWithMaxMinLength
]