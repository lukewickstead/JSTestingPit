/* global describe, it, expect, beforeEach */

describe("Asynchronous specs", function () {
    "use strict";
    var counter = 0;

    beforeEach(function (done) {
        setTimeout(function () {
            counter += 1;
            done();
            counter += 1;
        }, 1);
    });

    it("can be used to ensure asynch code is executed before a test spec is run", function (done) {
        expect(counter).toBe(1);
        done();
    });

    it("done is called to mark that all code being required to be executed has been run", function (done) {
        expect(counter).toBe(3);
        done();
    });
});

