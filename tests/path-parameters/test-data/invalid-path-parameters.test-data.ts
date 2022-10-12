import { Parameter } from "swagger-schema-official";

const arrayTypePathParams = {
    description: 'array type path params',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'array',
        items: {
            type: 'string'
        }            
    } as Parameter,
    expectedResult: new Error('Unkown Path Parameter Type array')
}

const objectTypePathParams = {
    description: 'object type path params',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'object',        
    } as Parameter,
    expectedResult: new Error('Unkown Path Parameter Type object')
}

const fileTypePathParams = {
    description: 'file type path params',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'file',        
    } as Parameter,
    expectedResult: new Error('Unkown Path Parameter Type file')
}

const booleanTypePathParams = {
    description: 'object type path params',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'boolean',        
    } as Parameter,
    expectedResult: new Error('Unkown Path Parameter Type boolean')
}

const invalidTypePathParams = {
    description: 'invalid type path params',
    testData: {
        name: 'resourceId',
        in: 'path',
        required: true,
        type: 'invalid',        
    },
    expectedResult: new Error('Unkown Path Parameter Type invalid')
}

export const invalidTypePathParametersUseCases = [
    arrayTypePathParams,
    objectTypePathParams,
    fileTypePathParams,
    booleanTypePathParams,
    invalidTypePathParams
]