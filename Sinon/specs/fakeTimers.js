/* global describe, it, afterEach, beforeEach, sinon, expect */

describe("Fake timers allow us to mock the passage of time", function() {
    "use strict";

    var clock;

    afterEach(function () {
        // restore the clock back to how it was.
        this.clock.restore();

    });

    beforeEach(function () {
        this.clock = sinon.useFakeTimers();

    });

    it("sinon.useFakeTimers can be used to create a fake clock which we can forward time by calling clock.tick(ms) without having to wait in the real world", function () {

        var foo = sinon.spy();

        setTimeout(function () {
            foo();
        }, 100);

        expect(foo.called).toBe(false);

        this.clock.tick(101);

        expect(foo.called).toBe(true);
    });

    it("clock.tick(ms) can be used to forward time at any speed and any number of times", function () {

        var foo = sinon.spy();

        setInterval(function () {
            foo();
        }, 100);

        expect(foo.called).toBe(false);

        this.clock.tick(101);
        expect(foo.callCount).toBe(1);

        this.clock.tick(101);
        expect(foo.callCount).toBe(2);

        this.clock.tick(10000);
        expect(foo.callCount).toBe(102);
    });
});