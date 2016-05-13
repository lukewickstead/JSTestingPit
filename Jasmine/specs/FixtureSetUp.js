/* global describe, xdescribe, it, xit, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll */

describe("Fixture setup and tear down with beforeEach and afterEach", function () {
    "use strict";

    beforeEach(function () {
        window.console.log("inside beforeEach");
    });

    afterEach(function () {
        window.console.log("inside afterEach");
        expect(true).toBe(true);

    });

    beforeAll(function () {
        window.console.log("inside beforeAll");
        expect(true).toBe(true);
    });

    afterAll(function () {
        window.console.log("inside afterAll");
        expect(true).toBe(true);
    });

    it("which are called before and after a test", function () {
        window.console.log("inside the test");
        expect(true).toBe(true);
    });
});
