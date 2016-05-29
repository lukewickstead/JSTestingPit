/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */

describe("createSpy can be used to mock when a function does not exist", function () {
    "use strict";

    var moo;

    beforeEach(function() {
        moo = jasmine.createSpy('moo');

        moo(1,2,3,4,5);
    });

    it("identity can be used to determine the entity", function() {
        expect(moo.and.identity()).toEqual('moo');
    });

    it("responds to all the other methods mentioned previously such as toHaveBeenCalled and toHaveBeenCalledWith", function() {
        expect(moo).toHaveBeenCalled();
        expect(moo).toHaveBeenCalledWith(1,2,3,4,5);
    });
});