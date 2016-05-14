/* global describe, it, expect, beforeEach, jasmine, toBeCustom, math */

describe("Custom matchers can be written", function () {
    'use strict';

    var isWithinPrecision = function (result, precision) {
        return result <= precision;
    };

    beforeEach(function () {

        jasmine.addCustomEqualityTester(isWithinPrecision);


        jasmine.addMatchers({

            toBeDivisibleBy: function () {
                return {
                    compare: function (actual, divisibleBy) {
                        var passed = actual % divisibleBy === 0;

                        return {
                            pass: passed,
                            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to be divisible by ' + divisibleBy
                        };
                    }
                };
            },

            toBeDivisibleByIsh: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, divisibleBy) {

                        var remainder = actual % divisibleBy;
                        var passed = util.equals(0.5, remainder, customEqualityTesters);
                        return {
                            pass: passed,
                            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to be divisible by '
                            + divisibleBy + ' within a precision of 0.5'
                        };
                    }
                };
            }
        });
    });

    it('to allow you to define your own assertions', function () {
        expect(10).toBeDivisibleBy(2);
        expect(10).not.toBeDivisibleBy(3);
    });

    it('and can be used in conjunction with custom equality testers', function () {
        expect(9.5).toBeDivisibleByIsh(3);
    });
});
