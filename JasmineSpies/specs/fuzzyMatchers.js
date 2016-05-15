/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */

describe("Fuzzy matches can be used against spies", function () {
    "use strict";

    var foo;

    beforeEach(function () {
        foo = jasmine.createSpy('foo');

        foo(12, []);
        foo([1, 2, 3]);
        foo("Hello");
        foo("Hello there monkey");
        foo({moo: "bar", "doo": "car"});
    });

    it("jasmine.any asserts a parameter was called but of any type", function () {
        expect(foo).toHaveBeenCalledWith(12, jasmine.any(Object));
        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Object));
    });

    it("jasmine.anything asserts a call was made with a parameter but it can be anything", function () {
        expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
        expect(foo).toHaveBeenCalledWith(jasmine.anything(), jasmine.any(Object));
    });

    it("jasmine.objectContaining matches an object contains a subset of key/value pairs", function () {
        expect(foo).toHaveBeenCalledWith(jasmine.objectContaining({moo: "bar"}));
    });

    it("jasmine.arrayContaining matches an array as a subset of another", function () {
        expect(foo).toHaveBeenCalledWith(jasmine.arrayContaining([1, 3]));
    });

    it("jasmine.stringMatching allows regular expression of a key value pair where the value is a string", function () {
        expect(foo).toHaveBeenCalledWith(jasmine.stringMatching(/^Hello$/));
        expect(foo).toHaveBeenCalledWith(jasmine.stringMatching(' there '));
    });

    describe("asymmetricMatch testers can be used as well", function () {
        var isUpperCase = {
            asymmetricMatch: function (actual) {
                return actual === actual.toUpperCase();
            }
        };

        it("by passing them into to toHaveBeenCalledWith", function () {
            var foo = jasmine.createSpy('foo');

            foo('FOO');

            expect(foo).toHaveBeenCalledWith(isUpperCase);
        });
    });
});