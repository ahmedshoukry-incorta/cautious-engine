import { Parameter } from "swagger-schema-official";
import { UseCase } from ".";
import { AJVPathParameter } from "../../../src/utils/path-parameters";

const doubleTypePathParam = {
    description: 'double type path param',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
        format: 'double'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: 'double',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const floatTypePathParam = {
    description: 'float type path param',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
        format: 'float'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: 'float',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const int32TypePathParam = {
    description: 'int32 type path param',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'integer',
        format: 'int32'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        format: 'int32',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const int64TypePathParam = {
    description: 'int64 type path param',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'integer',
        format: 'int64'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        format: 'int64',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const pathParamWithMinMaxNum = {
    description: 'path param with min. max. values',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
        format: 'double',
        maximum: 10,
        minimum: 5
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: 'double',
        maximum: 10,
        minimum: 5,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter    
} as UseCase;

const pathParamWithExclusiveMinMaxNum = {
    description: 'path param with exclusive min. max. values',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
        format: 'double',
        maximum: 10,
        exclusiveMaximum: true,
        minimum: 5,
        exclusiveMinimum: true
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: 'double',
        maximum: 10,
        minimum: 5,
        exclusiveMaximum: true,
        exclusiveMinimum: true
    } as AJVPathParameter
} as UseCase;

const numberTypePathParamWithoutFormat = {
    description: 'number type path param but without format',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: undefined,
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const integerTypePathParamWithoutFormat = {
    description: 'integer type path param but without format',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'integer'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        format: undefined,
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVPathParameter
} as UseCase;

const pathParamWithExclusiveMinMaxWithoutMinMaxValues = {
    description: 'path parameter with exclusive min. max. but its min. max. values are undefined',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'number',
        format: 'double',
        exclusiveMaximum: true,
        exclusiveMinimum: true,
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        format: 'double',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: true,
        exclusiveMinimum: true
    } as AJVPathParameter
} as UseCase;

export const numberIntegerTypePathParamsUseCases: UseCase[] = [
    doubleTypePathParam,
    floatTypePathParam,
    int32TypePathParam,
    int64TypePathParam,
    pathParamWithMinMaxNum,
    pathParamWithExclusiveMinMaxNum,
    numberTypePathParamWithoutFormat,
    integerTypePathParamWithoutFormat,
    pathParamWithExclusiveMinMaxWithoutMinMaxValues,
]