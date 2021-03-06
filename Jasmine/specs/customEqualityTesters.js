/* global describe, it, expect, beforeEach, jasmine, toBeCustom */

describe("Custom equality functions can be written", function () {
    "use strict";

    var isArraysEqual = function (array1, array2) {

        return Array.isArray(array1) &&
            Array.isArray(array2) && array1.length === array2.length &&
            array1.every(function (element, index) {
                return element === array2[index];
            });
    };

    beforeEach(function () {
        jasmine.addCustomEqualityTester(isArraysEqual);

    });

    it("to simplify complex equality assertions", function () {
        expect([1, 2, 3]).toEqual([1, 2, 3]);
    });

    it("they can also be negated with the not function", function () {
        expect([1, 2, 3]).not.toEqual([3, 2, 1]);
    });

    describe("asymmetricMatch can be used to write a custom matcher", function() {
        var isUpperCase = {
            asymmetricMatch: function(actual) {
                return actual === actual.toUpperCase();
            }
        };

        it("they are passed in to the toEqual method", function() {
            expect("FOO").toEqual(isUpperCase);
        });

        it("they can be negated ", function() {
            expect("Foo").not.toEqual(isUpperCase);
        });
    });
});
