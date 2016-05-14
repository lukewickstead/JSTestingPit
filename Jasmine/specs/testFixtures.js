/* global describe, it, expect */

describe("A test fixture is a group of test functions", function () {
    "use strict";

    it("all contained tests are considered in scope of the function", function () {
        expect(true).toBeTruthy();
    });

    it("any number of test functions can be contained within a test fixture", function () {
        expect(true).toBeTruthy();
    });

    describe("A test fixture can be nested", function () {

        it("which includes their tests", function () {
            expect(true).toBeTruthy();
        });
    });

    describe("There is no limit to how many levels of nesting can occur", function () {

        it("which also includes their tests", function () {
            expect(true).toBeTruthy();
        });
    });
});


