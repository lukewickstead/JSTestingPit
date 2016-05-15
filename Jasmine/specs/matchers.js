/* global describe, xdescribe, it, xit, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll */

describe("Matchers are helpers to assert if a test is to pass or fail", function () {
    "use strict";

    var foo = {a: 12, b: 34};
    var bar = {a: 12, b: 34};
    var fooAndBar = [foo, bar];

    var OkMethod = function () {
    };

    var BadMethod = function () {
        throw Error("FooBar");
    };

    it("toBe matcher compares with strict equality (===) and not lose equality (==)", function () {
        expect(1).toBe(1);
    });

    it("not negates the check and can be used before any matcher", function () {
        expect(1).not.toBe(null);
    });

    it("toBe for objects tests upon identity and not equality", function () {
        expect(foo).toBe(foo);
        expect(foo).not.toBe(bar);
    });

    it("toEqual compares with lose equality (==) and not strict equality (===)", function () {
        expect(12).toEqual(12);
        expect(12).not.toEqual(13);
    });

    it("toEqual for objects tests upon equality and not identity", function () {
        expect(foo).toEqual(bar);
        expect(foo).not.toEqual({});
    });

    it("toMatch tests with a regular expression", function () {
        var message = "foo bar baz";

        expect(message).toMatch("^foo");
        expect(message).not.toMatch("^bar");
    });

    it("toBeDefined matcher compares against the undefined keyword", function () {
        expect(foo.a).toBeDefined();
        //noinspection JSUnresolvedVariable
        expect(foo.c).not.toBeDefined();
    });

    it("toBeUndefined matcher compares against not being the undefined keyword", function () {
        expect(foo.a).not.toBeUndefined();
        //noinspection JSUnresolvedVariable
        expect(foo.c).toBeUndefined();
    });

    it("toBeNull matcher compares against the null keyword", function () {
        expect(null).toBeNull();
        expect(foo).not.toBeNull();
    });

    it("toBeTruthy matcher is for testing anything which is considered truthy; anything which is not false, 0, null, undefined, null and empty", function () {
        expect(1).toBeTruthy();
        expect([]).toBeTruthy();
        expect([1]).toBeTruthy();
        expect(true).toBeTruthy();

        expect(0).not.toBeTruthy();
        expect(false).not.toBeTruthy();
        expect(null).not.toBeTruthy();
        expect(undefined).not.toBeTruthy();
    });

    it("toBeFalsy matcher is for testing anything which is considered falsy; anything which is false, 0, null, undefined, null and empty", function () {
        expect(0).toBeFalsy();
        expect(false).toBeFalsy();
        expect(null).toBeFalsy();
        expect(undefined).toBeFalsy();

        expect(1).not.toBeFalsy();
        expect([1]).not.toBeFalsy();
        expect(true).not.toBeFalsy();
    });

    it("toContain matcher is testing the presence of an item in an Array", function () {
        expect(fooAndBar).toContain(bar);
        expect(fooAndBar).not.toContain(null);
    });

    it("toBeLessThan is for testing a number is less than another", function () {
        expect(1).toBeLessThan(10);
        expect(10).not.toBeLessThan(1);
    });

    it("The 'toBeGreaterThan' is for testing a number is greater than", function () {
        expect(10).toBeGreaterThan(1);
        expect(1).not.toBeGreaterThan(10);
    });

    it("toBeCloseTo is for testing equality within a required precision", function () {
        expect(1.2345).not.toBeCloseTo(2, 2);
        expect(1.2345).toBeCloseTo(1.231, 2);
    });

    it("toThrow is for testing that a function throws an exception", function () {
        expect(OkMethod).not.toThrow();
        expect(BadMethod).toThrow();

        expect(BadMethod).toThrowError("FooBar");
        expect(BadMethod).toThrowError(Error);
        expect(BadMethod).toThrowError(Error, "FooBar");
    });
});

