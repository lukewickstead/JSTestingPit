/* global describe, it, expect, beforeEach, jasmine, toBeCustom */

describe("custom equality", function() {
    "use strict";

    var isArraysEqual = function(array1, array2) {

        return Array.isArray(array1) &&
            Array.isArray(array2) && array1.length === array2.length &&
            array1.every(function(element, index) {
                return element === array2[index];
            });
    };

    beforeEach(function() {
        jasmine.addCustomEqualityTester(isArraysEqual);

    });

    it("should be custom equal", function() {
        expect([1,2,3]).not.toEqual([3,2,1]);
    });

    it("should be custom not equal", function() {
        expect([1,2,3]).toEqual([1,2,3]);
    });
});
