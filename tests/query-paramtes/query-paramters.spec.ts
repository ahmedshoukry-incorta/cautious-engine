import { assert, expect } from "chai";
import { Parameter } from "swagger-schema-official";
import { AJVQueryParameter, extractQueryParameters, extractQueryParametersFromApiPath, validateAPIPathMatchesAJVQueryParameter } from "../../src/utils/query-paramters";
import { UseCase } from "../path-parameters/test-data";
import { describe, test } from "mocha";
import { invalidTypeQueryParametersUseCases, numberIntegerTypeQueryParamsUseCases, stringTypeQueryParametersUseCases } from "./test-data";

describe('Query Paramters Operations', () => {
    describe('extractQueryParameters', () => {
        describe('Valid Query Parameters Extraction', () => {
            const validQueryParamUseCases: UseCase[] = [
                ...numberIntegerTypeQueryParamsUseCases,
                ...stringTypeQueryParametersUseCases,
                {
                    description: 'boolean type query param',
                    testData: {
                        name: 'query',
                        in: 'query',
                        type: 'boolean',
                        required: true,
                    },
                    expectedResult: {
                        name: 'query',
                        type: 'boolean',
                        required: true,
                    }
                }
            ];
            validQueryParamUseCases.forEach(useCase => {
                test(`that extracting "${useCase.description}" works`, () => {
                    const apiPath = '/api/v1/resource/{resourceId}'
                    const swagger = {
                        paths: {
                            [apiPath]: {
                                parameters: [
                                    useCase.testData,
                                    {
                                        name: 'query',
                                        in: 'path',
                                        required: true,
                                        type: 'string'
                                    }
                                ]
                            }
                        }
                    };
    
                    assert.deepEqual(extractQueryParameters(swagger.paths[apiPath].parameters as Parameter[]), [useCase.expectedResult]);
                });
            });
        });

        describe('Invalid Query Parameters Extraction', () => {
            invalidTypeQueryParametersUseCases.forEach((useCase: UseCase) => {
                test(`that extracting "${useCase.description}" fails`, () => {
                    const apiPath = '/api/v1/resource/{resourceId}'
                    const swagger = {
                        paths: {
                            [apiPath]: {
                                parameters: [
                                    useCase.testData,
                                    {
                                        name: 'query',
                                        in: 'path',
                                        required: true,
                                        type: 'string'
                                    }
                                ]
                            }
                        }
                    };

                    try {
                        extractQueryParameters(swagger.paths[apiPath].parameters as Parameter[]);
                        assert.fail('Extracting query parameter should have been failed');
                    } catch (error) {
                        assert.equal((error as any).message, useCase.expectedResult.message);
                    }
                });
            });
        });
    });

    describe('extractQueryParametersFromApiPath', () => {
        test('that extracting query parameters from api path works', () => {
            const apiPath = '/api/v1/resources?limit=20&skip=0&sort=creationDate&isDesc=true&filter={"name":"resourceName"}';

            assert.deepEqual(extractQueryParametersFromApiPath(apiPath), [
                {
                    name: 'limit',
                    type: 'number',
                    value: '20'
                },
                {
                    name: 'skip',
                    type: 'number',
                    value: '0'
                },
                {
                    name: 'sort',
                    type: 'string',
                    value: 'creationDate'
                },
                {
                    name: 'isDesc',
                    type: 'boolean',
                    value: true
                },
                {
                    name: 'filter',
                    type: 'string',
                    value: '{"name":"resourceName"}'
                }
            ]);
        })
    });   

    describe('validateAPIPathMatchesAJVQueryParameter', () => {
        describe('Valid AJV Query Parameters', () => {
            test('that validating API path against valid double type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1.5';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid float type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1.05';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'float',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid int32 type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid int64 type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param equals AJV query param min. value should work', () => {
                const apiPath = '/api/v1/resources?resourceId=5';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param more than AJV query param min. value should work', () => {
                const apiPath = '/api/v1/resources?resourceId=6';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param equals AJV query param max. value should work', () => {
                const apiPath = '/api/v1/resources?resourceId=10';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param less than AJV pqueryath param max. value should work', () => {
                const apiPath = '/api/v1/resources?resourceId=7';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid AJV query param with exclusive min. max. should work', () => {
                const apiPath = '/api/v1/resources?resourceId=6';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: true,
                    exclusiveMinimum: true
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid number type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: undefined,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid integer type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvQueryParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: undefined,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against valid string type AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceName=resourceName';                
                const ajvQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against string type AJV query param with pattern should work', () => {
                const apiPath = '/api/v1/resources?resourceName=resourceName';                
                const ajvQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: '.*Name$',
                    maxLength: undefined,
                    minLength: undefined
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param length equals AJV query param min. length should work', () => {
                const apiPath = '/api/v1/resources?resourceName=12345';                
                const ajvQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: 15,
                    minLength: 5
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param length equals AJV query param max. length should work', () => {
                const apiPath = '/api/v1/resources?resourceName=1234567';                
                const ajvQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param length less than AJV query param max. length should work', () => {
                const apiPath = '/api/v1/resources?resourceName=12345';                
                const ajvQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                } as AJVQueryParameter;

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path with path param length more than AJV query param min. length should work', () => {
                const apiPath = '/api/v1/resources?resourceName=12345';                
                const ajvQueryParameter: AJVQueryParameter = {
                    name: 'resourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                };

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, [ajvQueryParameter]))
            });

            test('that validating API path against multiple AJV query param should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1&subResourceName=subResourceName';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with no query params should return true', () => {
                const apiPath = '/api/v1/resources';                
                const ajvPathParameters: AJVQueryParameter[] = [];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param equals max int32 and AJV query parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=2147483647';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param equals min int32 and AJV query parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=-2147483648';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param less than max int32 and AJV query parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param more than min int32 and AJV query parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=-1';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param equals max int64 and AJV query parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=9223372036854775807';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param equals min int64 and AJV query parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=-9223372036854775808';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param less than max int64 and AJV query parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=1';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with path param more than min int64 and AJV query parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources?resourceId=-1';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });
        });

        describe('Invalid AJV Query parameters', () => {             
            test('that validating API path with string query param against AJV query parameter of number type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=1&subResourceName=subResourceName';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with string query param against AJV path parameter of query type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=1&subResourceName=subResourceName';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'integer',
                    required: true,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param less than AJV query parameter min. value should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=1&subResourceName=5';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: 10,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: 10,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param more than AJV query parameter max. value should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=10&subResourceName=15';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'number',
                    required: true,
                    maximum: 10,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param equals AJV query parameter max. value but exclusiveMaximum is true should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=10&subResourceName=10';          
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'number',
                    required: true,
                    maximum: 10,
                    minimum: undefined,
                    exclusiveMaximum: true,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param equals AJV query parameter min. value but exclusiveMinimum is true should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=10&subResourceName=5';
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    required: true,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResourceName',
                    type: 'number',
                    required: true,
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: true
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param more than max int32 and AJV query parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=2147483648';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param less than min int32 and AJV query parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=-2147483649';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with double query param and AJV query parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=1.5';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param more than max int64 and AJV query parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=9223372036854775808';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param less than min int64 and AJV query parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=-9223372036854775809';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with double query param and AJV query parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=1.5';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    required: true,
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param length more than AJV query parameter max. length should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=123456';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: 5,
                    minLength: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param length less than AJV query parameter min. length should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=123';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    required: true,
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: 5
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });

            test('that validating API path with query param doesn\'t match AJV query parameter pattern should fail', () => {
                const apiPath = '/api/v1/resources?resourceId=resourceName';                
                const ajvPathParameters: AJVQueryParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    required: true,
                    pattern: '.*ID$',
                    maxLength: undefined,
                    minLength: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVQueryParameter(apiPath, ajvPathParameters));
            });
         })
    });
 })