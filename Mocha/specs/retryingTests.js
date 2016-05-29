/* global chai, describe, it, specify, before, after, beforeEach, afterEach, setTimeout, run, expect, this */

describe('Retrying test suites', function() {
    "use strict";

    this.retries(4);

    var fixtureCount= 0;
    var testCount= 0;

    before(function () {
        testCount= 0;
    });

    beforeEach(function () {
        fixtureCount += 1;
    });

    it('this.retries(x) can be set on fixtures', function () {
        expect(fixtureCount).to.equal(4);
    });

    it('this.retries(4) can be set on tests', function () {
        this.retries(3);

        testCount +=1;

        expect(testCount).to.equal(3);
    });
});