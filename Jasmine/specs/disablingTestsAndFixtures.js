/* global describe, xdescribe, it, xit, expect, beforeEach, jasmine, toBeCustom */

xdescribe("xdescribe can be used to disabled a fixture", function () {
    "use strict";

    it("all tests within a disabled fixture are not run", function () {
        expect(1).toEqual(2);
    });
});

describe("Tests can be disable", function () {
    "use strict";

    xit("xit can be used to disable a test", function () {
        expect(true).toBe(false);
    });

    xit("xit can be used within a function body");

    it("it without a function body is also considered disabled");

    it("pending can be called to declare a function as disabled", function () {
        //noinspection JSUnresolvedFunction
        pending('pending test');
        expect(true).toBe(false);
    });
});