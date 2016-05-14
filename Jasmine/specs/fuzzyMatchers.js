/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */
describe("Fuzzy matchers allow partial matching", function () {

    it("jasmine.any can be used to assert upon any type", function () {
        expect(1).toEqual(jasmine.any(Number));
        expect([]).toEqual(jasmine.any(Object));
        expect(true).toEqual(jasmine.any(Boolean));
        expect("foo").toEqual(jasmine.any(String));
    });

    it("jasmine.anything matches anything", function () {
        expect(1).toEqual(jasmine.anything());
        expect(false).toEqual(jasmine.anything());
        expect(true).toEqual(jasmine.anything());

    });

    it("jasmine.objectContaining matches an object contains a subset of key/value pairs", function () {
        expect({moo: "bar", "doo": "car"}).toEqual(jasmine.objectContaining({
            moo: "bar"
        }));
    });

    it("jasmine.arrayContaining matches an array as a subset of another", function () {
        expect([1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(jasmine.arrayContaining([3, 1]));
        expect([1, 2, 3, 4, 5, 7, 8, 9, 10]).not.toEqual(jasmine.arrayContaining([6]));
    });

    it("jasmine.stringMatching allows regular expression of a key value pair where the value is a string", function () {
        expect({foo: 'Hello'}).toEqual({foo: jasmine.stringMatching(/^Hello$/)});
        expect({foo: 'Hello there monkey'}).toEqual({foo: jasmine.stringMatching(' there ')});
    });
});
