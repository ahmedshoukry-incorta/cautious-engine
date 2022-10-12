import { assert } from "chai";
import { describe, test } from "mocha";
import { Parameter } from "swagger-schema-official";
import { AJVPathParameter, convertPathTemplateToRegex, extractPathParameters, validateAPIPathMatchesAJVPathParameter, validateAPIPathMatchesPathRegex } from "../../src/utils/path-parameters";
import { invalidTypePathParametersUseCases, numberIntegerTypePathParamsUseCases, stringTypePathParametersUseCases, UseCase } from "./test-data";

describe('Path Parametters Operations', () => {        
    describe('extractPathParameters', () => {
        describe('Valid Path Parameters Extraction', () => {
            const validPathParamUseCases: UseCase[] = [
                ...numberIntegerTypePathParamsUseCases,
                ...stringTypePathParametersUseCases,
            ];
            validPathParamUseCases.forEach(useCase => {
                test(`that extracting "${useCase.description}" works`, () => {
                    const apiPath = '/api/v1/resource/{resourceId}'
                    const swagger = {
                        paths: {
                            [apiPath]: {
                                parameters: [
                                    useCase.testData,
                                    {
                                        name: 'query',
                                        in: 'query',
                                        required: true,
                                        type: 'string'
                                    }
                                ]
                            }
                        }
                    };
    
                    assert.deepEqual(extractPathParameters(swagger.paths[apiPath].parameters as Parameter[]), [useCase.expectedResult]);
                });
            });
        });

        describe('Invalid Path Parameters Extraction', () => {
            invalidTypePathParametersUseCases.forEach((useCase: UseCase) => {
                test(`that extracting "${useCase.description}" fails`, () => {
                    const apiPath = '/api/v1/resource/{resourceId}'
                    const swagger = {
                        paths: {
                            [apiPath]: {
                                parameters: [
                                    useCase.testData,
                                    {
                                        name: 'query',
                                        in: 'query',
                                        required: true,
                                        type: 'string'
                                    }
                                ]
                            }
                        }
                    };

                    try {
                        extractPathParameters(swagger.paths[apiPath].parameters as Parameter[]);
                        assert.fail('Extracting path parameter should have been failed');
                    } catch (error) {
                        assert.equal((error as any).message, useCase.expectedResult.message);
                    }
                });
            });
        });
    });

    describe('convertPathTemplateToRegex', () => {
        test('that converting API path template to regext works', () => {
            const apiPathTemplate = '/api/v1/resource/{resourceId}/sub-resource/{sub-resourceId}';
            const expectedRegex = '\\/api\\/v1\\/resource\\/[a-zA-Z0-9_.-]*\\/sub-resource\\/[a-zA-Z0-9_.-]*';

            assert.equal(convertPathTemplateToRegex(apiPathTemplate), expectedRegex);
        });

        test('that converting given empty value works', () => {
            const apiPathTemplate = '';
            const expectedRegex = '';

            assert.equal(convertPathTemplateToRegex(apiPathTemplate), expectedRegex);
        });
    });

    describe('validateAPIPathMatchesPathRegex', () => {
        test('that validating an API against given regex works', () => {
            const api = '/api/v1/resources/1';
            const apiRegex = '\\/api\\/v1\\/resources\\/[a-zA-Z0-9_.-]*';

            assert.isTrue(validateAPIPathMatchesPathRegex(api, apiRegex));
        });

        test('that validating an API where the regex matches it partially should fail', () => {
            const api = '/api/v1/resources/1/sub-resources';
            const apiRegex = '\\/api\\/v1\\/resources\\/[a-zA-Z0-9_.-]*';

            assert.isFalse(validateAPIPathMatchesPathRegex(api, apiRegex));
        });
    });

    describe('validateAPIPathMatchesAJVPathParameter', () => {
        describe('Valid AJV Path Parameters', () => {
            test('that validating API path against valid double type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1.5';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid float type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1.05';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'float',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid int32 type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid int64 type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param equals AJV path param min. value should work', () => {
                const apiPath = '/api/v1/resources/5';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param more than AJV path param min. value should work', () => {
                const apiPath = '/api/v1/resources/6';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param equals AJV path param max. value should work', () => {
                const apiPath = '/api/v1/resources/10';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param less than AJV path param max. value should work', () => {
                const apiPath = '/api/v1/resources/7';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid AJV path param with exclusive min. max. should work', () => {
                const apiPath = '/api/v1/resources/6';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: true,
                    exclusiveMinimum: true
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid number type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'number',
                    format: undefined,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid integer type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameter = {
                    name: 'resourceId',
                    type: 'integer',
                    format: undefined,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against valid string type AJV path param should work', () => {
                const apiPath = '/api/v1/resources/resourceName';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against string type AJV path param with pattern should work', () => {
                const apiPath = '/api/v1/resources/resourceName';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: '.*Name$',
                    maxLength: undefined,
                    minLength: undefined
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param length equals AJV path param min. length should work', () => {
                const apiPath = '/api/v1/resources/12345';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: 15,
                    minLength: 5
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param length equals AJV path param max. length should work', () => {
                const apiPath = '/api/v1/resources/1234567';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param length less than AJV path param max. length should work', () => {
                const apiPath = '/api/v1/resources/12345';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path with path param length more than AJV path param min. length should work', () => {
                const apiPath = '/api/v1/resources/12345';
                const pathTemplate = '/api/v1/resources/{resourceName}';
                const ajvPathParameter = {
                    name: 'resourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: 7,
                    minLength: 1
                } as AJVPathParameter;

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, [ajvPathParameter], pathTemplate))
            });

            test('that validating API path against multiple AJV path param should work', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with no path params should return true', () => {
                const apiPath = '/api/v1/resources';
                const pathTemplate = '/api/v1/resources';
                const ajvPathParameters: AJVPathParameter[] = [];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals max int32 and AJV path parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources/2147483647';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals min int32 and AJV path parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources/-2147483648';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param less than max int32 and AJV path parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param more than min int32 and AJV path parameter int32 integer type should work', () => {
                const apiPath = '/api/v1/resources/-1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals max int64 and AJV path parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources/9223372036854775807';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals min int64 and AJV path parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources/-9223372036854775808';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param less than max int64 and AJV path parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources/1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param more than min int64 and AJV path parameter int64 integer type should work', () => {
                const apiPath = '/api/v1/resources/-1';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isTrue(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });
        });

        describe('Invalid AJV Path parameters', () => { 
            test('that validating API path with AJV path parameters that doesn\'t match path template throws error', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                try {
                    validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate);
                    assert.fail('Should have failed');
                } catch (error) {
                    assert.equal(
                        (error as any).message,
                        "Given AJV path paremeters doesn't match given path template /api/v1/resources/{resourceId}/sub-resources/{subResuourceName}"
                    );
                }
            });

            test('that validating API path with not matching path template throws error', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }, {
                    name: 'subResuourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                }];

                try {
                    validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate);
                    assert.fail('Should have failed');
                } catch (error) {
                    assert.equal(
                        (error as any).message,
                        'Given API path "/api/v1/resources/1/sub-resources/subResourceName" doesn\'t match given path template /api/v1/resources/{resourceId}/sub-resources'
                    );
                }
            });

            test('that validating API path against AJV Path parameter with exlusive max. but no max. value throws error', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: true,
                    exclusiveMinimum: undefined
                }, {
                    name: 'subResuourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                }];

                try {
                    validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate);
                    assert.fail('Should have failed');
                } catch (error) {
                    assert.equal(
                        (error as any).message,
                        'Path parameter has exclusiveMaximum as true but there\'s no maximum value'
                    );
                }
            });

            test('that validating API path against AJV Path parameter with exlusive min. but no min. value throws error', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: true
                }, {
                    name: 'subResuourceName',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: undefined,
                }];

                try {
                    validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate);
                    assert.fail('Should have failed');
                } catch (error) {
                    assert.equal(
                        (error as any).message,
                        'Path parameter has exclusiveMinimum as true but there\'s no minimum value'
                    );
                }
            });

            test('that validating API path with string path param against AJV path parameter of number type should fail', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'number',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with string path param against AJV path parameter of integer type should fail', () => {
                const apiPath = '/api/v1/resources/1/sub-resources/subResourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    format: 'double',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'integer',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param less than AJV path parameter min. value should fail', () => {
                const apiPath = '/api/v1/resources/10/sub-resources/5';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    maximum: undefined,
                    minimum: 10,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'number',
                    maximum: undefined,
                    minimum: 10,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param more than AJV path parameter max. value should fail', () => {
                const apiPath = '/api/v1/resources/10/sub-resources/15';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'number',
                    maximum: 10,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals AJV path parameter max. value but exclusiveMaximum is true should fail', () => {
                const apiPath = '/api/v1/resources/10/sub-resources/10';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'number',
                    maximum: 10,
                    minimum: undefined,
                    exclusiveMaximum: true,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param equals AJV path parameter min. value but exclusiveMinimum is true should fail', () => {
                const apiPath = '/api/v1/resources/10/sub-resources/5';
                const pathTemplate = '/api/v1/resources/{resourceId}/sub-resources/{subResuourceName}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'number',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                },
                {
                    name: 'subResuourceName',
                    type: 'number',
                    maximum: 10,
                    minimum: 5,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: true
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param more than max int32 and AJV path parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources/2147483648';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param less than min int32 and AJV path parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources/-2147483649';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with double path param and AJV path parameter int32 integer type should fail', () => {
                const apiPath = '/api/v1/resources/1.5';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int32',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param more than max int64 and AJV path parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources/9223372036854775808';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param less than min int64 and AJV path parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources/-9223372036854775809';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with double path param and AJV path parameter int64 integer type should fail', () => {
                const apiPath = '/api/v1/resources/1.5';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'integer',
                    format: 'int64',
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param length more than AJV path parameter max. length should fail', () => {
                const apiPath = '/api/v1/resources/123456';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    pattern: undefined,
                    maxLength: 5,
                    minLength: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param length less than AJV path parameter min. length should fail', () => {
                const apiPath = '/api/v1/resources/123';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    pattern: undefined,
                    maxLength: undefined,
                    minLength: 5
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });

            test('that validating API path with path param doesn\'t match AJV path parameter pattern should fail', () => {
                const apiPath = '/api/v1/resources/resourceName';
                const pathTemplate = '/api/v1/resources/{resourceId}';
                const ajvPathParameters: AJVPathParameter[] = [{
                    name: 'resourceId',
                    type: 'string',
                    pattern: '.*ID$',
                    maxLength: undefined,
                    minLength: undefined
                }];

                assert.isFalse(validateAPIPathMatchesAJVPathParameter(apiPath, ajvPathParameters, pathTemplate));
            });
         })
    });
});