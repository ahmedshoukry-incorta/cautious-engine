import { Parameter } from "swagger-schema-official";
import { UseCase } from ".";
import { AJVQueryParameter } from "../../../src/utils/query-paramters";


const doubleTypeQueryParam = {
    description: 'double type query param',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'number',
        format: 'double'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        required: true,
        format: 'double',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const floatTypeQueryParam = {
    description: 'float type query param',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'number',
        format: 'float'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        required: true,
        format: 'float',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const int32TypeQueryParam = {
    description: 'int32 type query param',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'integer',
        format: 'int32'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        required: true,
        format: 'int32',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const int64TypeQueryParam = {
    description: 'int64 type query param',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'integer',
        format: 'int64'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        required: true,
        format: 'int64',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const queryParamWithMinMaxNum = {
    description: 'query param with min. max. values',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'number',
        format: 'double',
        maximum: 10,
        minimum: 5
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        required: true,
        format: 'double',
        maximum: 10,
        minimum: 5,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter    
} as UseCase;

const queryParamWithExclusiveMinMaxNum = {
    description: 'query param with exclusive min. max. values',
    testData: {
        name: 'resourceId',
        in: 'query',
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
        required: true,
        format: 'double',
        maximum: 10,
        minimum: 5,
        exclusiveMaximum: true,
        exclusiveMinimum: true
    } as AJVQueryParameter
} as UseCase;

const numberTypeQueryParamWithoutFormat = {
    description: 'number type query param but without format',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'number',
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        required: true,
        format: undefined,
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const integerTypeQueryParamWithoutFormat = {
    description: 'integer type query param but without format',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'integer'
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'integer',
        required: true,
        format: undefined,
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: undefined,
        exclusiveMinimum: undefined
    } as AJVQueryParameter
} as UseCase;

const queryParamWithExclusiveMinMaxWithoutMinMaxValues = {
    description: 'query parameter with exclusive min. max. but its min. max. values are undefined',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'number',
        format: 'double',
        exclusiveMaximum: true,
        exclusiveMinimum: true,
    } as Parameter,
    expectedResult: {
        name: 'resourceId',
        type: 'number',
        required: true,
        format: 'double',
        maximum: undefined,
        minimum: undefined,
        exclusiveMaximum: true,
        exclusiveMinimum: true
    } as AJVQueryParameter
} as UseCase;

export const numberIntegerTypeQueryParamsUseCases: UseCase[] = [
    doubleTypeQueryParam,
    floatTypeQueryParam,
    int32TypeQueryParam,
    int64TypeQueryParam,
    queryParamWithMinMaxNum,
    queryParamWithExclusiveMinMaxNum,
    numberTypeQueryParamWithoutFormat,
    integerTypeQueryParamWithoutFormat,
    queryParamWithExclusiveMinMaxWithoutMinMaxValues,
]