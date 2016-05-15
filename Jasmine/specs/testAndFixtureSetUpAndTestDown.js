/* global describe, xdescribe, it, xit, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll */

describe("Fixtures can be setup and teared down with the beforeAll and afterAll, beforeEach and afterEach functions", function () {
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
        window.console.log("inside the first test");
        expect(true).toBe(true);
    });

    it("or called before and after all tests", function () {
        window.console.log("inside the second test");
        expect(true).toBe(true);
    });
});
