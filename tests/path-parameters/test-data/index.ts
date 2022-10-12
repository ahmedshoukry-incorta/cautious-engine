import { numberIntegerTypePathParamsUseCases as numberIntegerUseCases } from "./number-path-parameters.test-data";
import { stringTypePathParametersUseCases as stringUseCases } from "./string-path-parameters.test-data";
import { invalidTypePathParametersUseCases as invalidUseCases } from './invalid-path-parameters.test-data';

export type UseCase = {
    description: string;
    testData: any;
    expectedResult: any;
}

export const numberIntegerTypePathParamsUseCases = numberIntegerUseCases;
export const stringTypePathParametersUseCases = stringUseCases;
export const invalidTypePathParametersUseCases = invalidUseCases;