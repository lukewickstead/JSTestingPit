/* global chai, describe, it, specify, before, after, beforeEach, afterEach, setTimeout, run, expect, ok */

describe('Skipping tests', function () {
    "use strict";

    it.skip("can be made with it.skip", function () {
        expect(true).to.be.ok;
    });

    it("other tests are run as expected", function () {
        expect(true).to.be.ok;
    });

    it("it.only would exclusively run a test", function () {
        expect(true).to.be.ok;
    });

    it("pending tests are a test without a function callback. They will be written later, kind of like a todo note.");
});