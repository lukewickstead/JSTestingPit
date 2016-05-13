/* global describe, xdescribe, it, xit, expect, beforeEach, jasmine, toBeCustom */

xdescribe("A disabled spec", function () {
    "use strict";

    it("does not run", function () {
        expect(1).toEqual(2);
    });
});

describe("Pending specs", function () {
    "use strict";

    xit("can be declared with 'xit'", function () {
        expect(true).toBe(false);
    });

    it("can be declared with out implementing the function");

    it("can be declared by calling pending", function () {
        pending('pending test'); // jshint ignore:line
        expect(true).toBe(false);
    });
});
