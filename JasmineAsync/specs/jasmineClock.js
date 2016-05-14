/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */

describe("jasmine.clock can be used to test time dependant code", function () {
    afterEach(function () {
        jasmine.clock().uninstall();
    });

    beforeEach(function () {
        jasmine.clock().install();
    });

    it("jasmine.clock().tick can be used to forward time without having to wait in the real world", function () {

        var foo = jasmine.createSpy("foo");

        setTimeout(function () {
            foo();
        }, 100);

        expect(foo).not.toHaveBeenCalled();

        jasmine.clock().tick(101);

        expect(foo).toHaveBeenCalled();
    });

    it("jasmine.clock().tick can be used to forward time at any speed and any number of times", function () {

        var foo = jasmine.createSpy("foo");

        setInterval(function () {
            foo();
        }, 100);

        expect(foo).not.toHaveBeenCalled();

        jasmine.clock().tick(101);
        expect(foo).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(50);
        expect(foo).toHaveBeenCalledTimes(1);

        jasmine.clock().tick(50);
        expect(foo).toHaveBeenCalledTimes(2);

        jasmine.clock().tick(10000);
        expect(foo).toHaveBeenCalledTimes(102);
    });

    it("jasmine.clock().mockDate can be used to mock dates", function () {
        var startDate = new Date(1978, 10, 25);

        jasmine.clock().mockDate(startDate);
        expect(new Date().getMonth()).toEqual(10);

        jasmine.clock().tick(10000);
        expect(new Date().getTime()).toEqual(startDate.getTime() + 10000);
    });
});