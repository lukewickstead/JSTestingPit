/* global chai, describe, it, specify, before, after, beforeEach, afterEach, setTimeout, run, expect */

describe('Async tests', function () {
    "use strict";

    function callFunction(done) {
        done();
    }

    beforeEach("beforeEach, afterEach, after and before can all be async", function(done) {
        setTimeout(callFunction, 300, done);
    });

    it("call the passed in 'done' callback when finished", function (done) {
        setTimeout(callFunction, 300, done);
    });

    it("this.slow(x) can be used to redefine the criteria for marking a poor performing tests", function (done) {
        this.slow(1000);
        setTimeout(callFunction, 300, done);
    });

    describe('Calling this.timeout(x) can be used to trigger a max permitted time to run', function() {
        this.timeout(300);

        it('Allowing slow tests to be permitted to run or fail', function(done){
            callFunction(done, 300);
        });

        it('Tests can set their own timeout', function(done){
            this.timeout(350);

            callFunction(done, 350);
        });
    });

});

setTimeout(function() {
    "use strict";

    describe('Async tests fixture', function() {
        it("test inside an async fixture", function () {
            expect(true).to.be.ok;
        });
    });

    // special mocha function
    run();
}, 200);

