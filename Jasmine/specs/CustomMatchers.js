/* global describe, it, expect, beforeEach, jasmine, toBeCustom, math */

describe("Custom matchers", function () {
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
                        var passed = util.equals(0, 0.5, customEqualityTesters);
                        return {
                            pass: passed,
                            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to be divisible by ' + divisibleBy + ' within a preision of 0.5'
                        };
                    }
                };
            }
        });
    });

    it('allow you to defined your own assertions', function () {
        expect(10).toBeDivisibleBy(2);
        expect(10).not.toBeDivisibleBy(3);
    });

    it('allow you to defined your own assertions with custom equality testers', function () {
        expect(9.5).toBeDivisibleByIsh(3);
    });
});
