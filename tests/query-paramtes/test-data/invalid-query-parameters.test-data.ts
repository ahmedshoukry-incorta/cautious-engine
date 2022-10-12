import { Parameter } from "swagger-schema-official";

const arrayTypeQueryParams = {
    description: 'array type query params',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'array',
        items: {
            type: 'string'
        }            
    } as Parameter,
    expectedResult: new Error('Unkown Query Parameter Type array')
}

const objectTypeQueryParams = {
    description: 'object type query params',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'object',        
    } as Parameter,
    expectedResult: new Error('Unkown Query Parameter Type object')
}

const fileTypeQueryParams = {
    description: 'file type query params',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'file',        
    } as Parameter,
    expectedResult: new Error('Unkown Query Parameter Type file')
}

const invalidTypeQueryParams = {
    description: 'invalid type query params',
    testData: {
        name: 'resourceId',
        in: 'query',
        required: true,
        type: 'invalid',        
    },
    expectedResult: new Error('Unkown Query Parameter Type invalid')
}

export const invalidTypeQueryParametersUseCases = [
    arrayTypeQueryParams,
    objectTypeQueryParams,
    fileTypeQueryParams,
    invalidTypeQueryParams
]