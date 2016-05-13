/* global describe, xdescribe, it, xit, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll */

var foo = {
    a: 12,
    b: 34
};

var bar = {
    a: 12,
    b: 34
};

var fooAndBar = [foo, bar];

/**
 * @return {boolean}
 */
var OkMethod = function () {
    "use strict";
    return true;
};

var BadMethod = function () {
    "use strict";
    throw Error("FooBar");
};

describe("Matchers:", function () {
    "use strict";

    it("The 'toBe' matcher compares with ===", function () {

        expect(1).toBe(1);
        expect(1).not.toBe(null);

        // For objects and collections the object must be identical
        expect(foo).toBe(foo);
        expect(foo).not.toBe(bar);
    });

    it("The 'toEqual' compares with ==", function () {

        expect(12).toEqual(12);
        expect(12).not.toEqual(13);

        expect(foo).toEqual(bar);
        expect(foo).not.toEqual({});
    });

    it("The 'toMatch' matcher is for regular expressions", function () {
        var message = "foo bar baz";

        expect(message).toMatch("^foo");
        expect(message).not.toMatch("^bar");
    });

    it("The 'toBeDefined' matcher compares against `undefined`", function () {

        expect(foo.a).toBeDefined();
        //noinspection JSUnresolvedVariable
        expect(foo.c).not.toBeDefined();
    });

    it("The `toBeUndefined` matcher compares against `undefined`", function () {
        expect(foo.a).not.toBeUndefined();
        //noinspection JSUnresolvedVariable
        expect(foo.c).toBeUndefined();
    });

    it("The 'toBeNull' matcher compares against null", function () {
        expect(null).toBeNull();
        expect(foo).not.toBeNull();
    });

    it("The 'toBeTruthy' matcher is for boolean casting testing", function () {

        expect(true).toBeTruthy();
        expect(1).toBeTruthy();

        expect(false).not.toBeTruthy();
        expect(null).not.toBeTruthy();
        expect(undefined).not.toBeTruthy();
    });

    it("The 'toBeFalsy' matcher is for boolean casting testing", function () {

        expect(true).not.toBeFalsy();
        expect(1).not.toBeFalsy();

        expect(false).toBeFalsy();
        expect(null).toBeFalsy();
        expect(undefined).toBeFalsy();
    });

    it("The 'toContain' matcher is for finding an item in an Array", function () {
        expect(fooAndBar).toContain(bar);
        expect(fooAndBar).not.toContain(null);
    });

    it("The 'toBeLessThan' matcher is for mathematical comparisons", function () {
        expect(1).toBeLessThan(10);
        expect(10).not.toBeLessThan(1);
    });

    it("The 'toBeGreaterThan' matcher is for mathematical comparisons", function () {
        expect(10).toBeGreaterThan(1);
        expect(1).not.toBeGreaterThan(10);
    });

    it("The 'toBeCloseTo' matcher is for precision math comparison", function () {

        expect(1.2345).not.toBeCloseTo(2, 2);
        expect(1.2345).toBeCloseTo(1.231, 2);
    });

    it("The 'toThrow' matcher is for testing if a function throws an exception", function () {
        expect(OkMethod).not.toThrow();
        expect(BadMethod).toThrow();

        expect(BadMethod).toThrowError("FooBar");
        expect(BadMethod).toThrowError(Error);
        expect(BadMethod).toThrowError(Error, "FooBar");
    });

});

