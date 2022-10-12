import { numberIntegerTypeQueryParamsUseCases as numberIntegerUseCases } from "./number-query-parameters.test-data";
import { stringTypeQueryParametersUseCases as stringUseCases } from "./string-query-parameters.test-data";
import { invalidTypeQueryParametersUseCases as invalidUseCases } from './invalid-query-parameters.test-data';

export type UseCase = {
    description: string;
    testData: any;
    expectedResult: any;
}

export const numberIntegerTypeQueryParamsUseCases = numberIntegerUseCases;
export const stringTypeQueryParametersUseCases = stringUseCases;
export const invalidTypeQueryParametersUseCases = invalidUseCases;