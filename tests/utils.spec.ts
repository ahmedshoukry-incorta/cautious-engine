import { assert } from "chai";
import { isInt64 } from "../src/util";
import { describe, test } from "mocha";

describe('util', () => {   
    describe('isInt64', () => {
        test('that max int64 number should be valid int64', () => {
            const maxInt64 = '9223372036854775807';
            assert.isTrue(isInt64(maxInt64));
        });

        test('that min int64 number should be valid int64', () => {
            const minInt64 = '-9223372036854775808';
            assert.isTrue(isInt64(minInt64));
        });

        test('that a number more than max int64 by one should be invalid', () => {
            const maxInt64PlusOne = '9223372036854775808';
            assert.isFalse(isInt64(maxInt64PlusOne));
        });

        test('that a number less than min int64 by one should be invalid', () => {
            const minInt64MinusOne = '-9223372036854775809';
            assert.isFalse(isInt64(minInt64MinusOne), 'less than min int 64 by one should be invalid');
        });

        test('that a number exceeds max int64 by a digit should be invalid', () => {
            const oneDigitMoreThanMaxInt64 = '92233720368547758070'
            assert.isFalse(isInt64(oneDigitMoreThanMaxInt64), 'more than max int 64 by a digit should be invalid');
        });

        test('that a number exceeds min int64 by a digit should be invalid', () => {
            const oneDigitMoreThanMinInt64 = '-92233720368547758080'
            assert.isFalse(isInt64(oneDigitMoreThanMinInt64), 'less than min int 64 by a digit should be invalid');
        });

        test('that zero should be a valid int64 number', () => {
            assert.isTrue(isInt64('0'));
        });

        test('that one should be a valid int64 number', () => {
            assert.isTrue(isInt64('1'));
        });

        test('that negative one should be a valid int64 number', () => {
            assert.isTrue(isInt64('-1'));
        });
    });
 })