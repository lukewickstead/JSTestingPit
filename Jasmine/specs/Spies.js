/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */

describe("A spy", function () {
    "use strict";

    var foo;

    beforeEach(function () {
        foo = {
            FunctionToSpyOn: function (valueOne, valueTwo) {
            }
        };

        spyOn(foo, 'FunctionToSpyOn');

        foo.FunctionToSpyOn(1);
        foo.FunctionToSpyOn(2, 3);
    });

    it("toHaveBeenCalled validates that a function was called", function () {
        expect(foo.FunctionToSpyOn).toHaveBeenCalled();
    });

    it("toHaveBeenCalledTimes validates that a function was called x times", function () {
        expect(foo.FunctionToSpyOn).toHaveBeenCalledTimes(2);
    });

    it("toHaveBeenCalledWith validates that a function was called with certain parameters", function () {
        expect(foo.FunctionToSpyOn).toHaveBeenCalledWith(1);
        expect(foo.FunctionToSpyOn).toHaveBeenCalledWith(2, 3);
    });
});



