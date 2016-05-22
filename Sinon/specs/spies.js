/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert */

describe("Spies spy on function calls so we can assert that they were called as intended", function () {
    "use strict";

    it("sinon.spy() create an anonymous function which records calls upon it", function () {

        var callback = sinon.spy();
        var nonCallback = sinon.spy();

        callback();

        // We can use Spy API to assert it was called
        expect(callback.called).toBe(true);
        expect(nonCallback.called).toBe(false);

        // Or we can use sinon assertions
        sinon.assert.called(callback);
        sinon.assert.callCount(callback, 1);

        callback();
        sinon.assert.callCount(callback, 2);
    });

    it("sinon.spy() can be used to spy on an existing function. They wrap the function, allowing the functionality to be called, yet assertions to be made upon the spy", function () {

        var foo = function () {
            return true;
        };

        var spy = sinon.spy(foo);

        expect(spy(2)).toBeTruthy();
        expect(spy.called).toBe(true);
    });

    it("sinon.spy() can be used to spy on an existing methods upon objects. Here we preserve the original method but wrap a spy around it", function () {

        var myClass = {
            /**
             * @return {number}
             */
            Foo: function (value) {
                return value * 10;
            }
        };

        var aSpy = sinon.spy(myClass, "Foo");

        expect(myClass.Foo(1)).toBe(10);
        expect(myClass.Foo(2)).toBe(20);
        expect(myClass.Foo(3)).toBe(30);

        // The spy has wrapped the function
        sinon.assert.called(myClass.Foo);

        // The same spy was returned
        sinon.assert.called(aSpy);

        // We can place an assertions upon the spy
        sinon.assert.callCount(myClass.Foo, 3);
        expect(myClass.Foo.getCall(0).args[0]).toBe(1);

        // If we need to restore the original function we can call restore upon the spy
        myClass.Foo.restore();
    });
});
    