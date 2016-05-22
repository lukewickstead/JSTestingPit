/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert, match, sinon.match.undefined, sinon.match*/

describe("The Spy API allows assertion upon individual calls made upon a spy", function () {
    "use strict";

    it("spy.firstCall can be used to access the first call upon the spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(3);

        expect(spy.firstCall.args[0]).toBe(1);
    });

    it("spy.secondCall can be used to access the second call upon the spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(3);

        expect(spy.secondCall.args[0]).toBe(2);
    });

    it("spy.thirdCall can be used to access the third call upon the spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(3);

        expect(spy.thirdCall.args[0]).toBe(3);
    });

    it("spy.lastCall can be used to access the last call upon the spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(3);

        expect(spy.lastCall.args[0]).toBe(3);
    });

    it("spy.getCall(n) can be used to access the nth call upon the spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(3);

        expect(spy.getCall(2).args[0]).toBe(3);
    });

    it("spyCall.calledOn asserts the call instance of the spy was made upon the asserted contextual binding of this", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p2, null);

        expect(spy.firstCall.calledOn(p1)).toBeTruthy();
        expect(spy.lastCall.calledOn(p2)).toBeTruthy();
    });

    it("spyCall.calledWith can be used to assert a call upon the spy was made with the expected partial arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, 2);
        spy(1, 2, 3);

        expect(spy.firstCall.calledWith(1)).toBeTruthy();
        expect(spy.secondCall.calledWith(1, 2)).toBeTruthy();
        expect(spy.lastCall.calledWith(1)).toBeTruthy();
    });

    it("spyCall.calledWithExactly can be used to assert a call upon the spy was made with the exact expected arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, 2);
        spy(1, 2, 3);

        expect(spy.firstCall.calledWithExactly(1)).toBeTruthy();
        expect(spy.secondCall.calledWithExactly(1, 2)).toBeTruthy();
        expect(spy.lastCall.calledWithExactly(1, 2, 3)).toBeTruthy();
    });

    it("spyCall.calledWithMatch can be used to assert a call upon the spy was made with the expected arguments matched with sinon matches", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, true);

        expect(spy.firstCall.calledWithMatch(sinon.match.number)).toBeTruthy();
        expect(spy.secondCall.calledWithMatch(sinon.match.number, sinon.match.any)).toBeTruthy();
    });

    it("spyCall.notCalledWith can be used to assert a call upon the spy was not made with the expected partial arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, 2);
        spy(1, 2, 3);

        expect(spy.firstCall.notCalledWith(3)).toBeTruthy();
        expect(spy.secondCall.notCalledWith(1, 2.1)).toBeTruthy();
    });

    it("spyCall.notCalledWithMatch can be used to assert a call upon the spy was made with the exact expected arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, true);

        expect(spy.firstCall.notCalledWithMatch(sinon.match.string)).toBeTruthy();
        expect(spy.firstCall.notCalledWithMatch(sinon.match.undefined)).toBeTruthy();
    });

    it("spyCall.threw asserts that a call upon a spy threw an error", function () {

        var foo = function (value) {
            if (value) {
                throw "Error";
            }
        };

        var spy = sinon.spy(foo);

        try {
            spy(true);
        } catch (err) {
        }

        spy(false);

        expect(spy.firstCall.threw()).toBe(true);
        expect(spy.lastCall.threw()).toBe(false);

    });

    it("spyCall.threw(TypeError) asserts that a call upon a spy threw a specific error", function () {

        var foo = function (value) {
            if (value) {
                throw "Error";
            }
        };

        var spy = sinon.spy(foo);

        try {
            spy(true);
        } catch (err) {
        }

        spy(false);

        expect(spy.firstCall.threw("Error")).toBe(true);
        expect(spy.firstCall.threw("Smerf")).toBe(false);
        expect(spy.lastCall.threw()).toBe(false);
    });

    it("spyCall.threw(obj) asserts that a call upon a spy threw a specific object", function () {

        var Error = function () {
        };
        var error = new Error();

        var foo = function (value) {
            if (value) {
                throw error;
            }
        };

        var spy = sinon.spy(foo);

        try {
            spy(true);
        } catch (err) {
        }

        spy(false);

        expect(spy.firstCall.threw(error)).toBe(true);
        expect(spy.firstCall.threw(new Error())).toBe(false);
        expect(spy.lastCall.threw()).toBe(false);
    });

    it("spyCall.thisValue asserts the call instance of the spy was made upon the asserted contextual binding of this", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p2, null);

        expect(spy.firstCall.thisValue).toBe(p1);
        expect(spy.lastCall.thisValue).toBe(p2);
    });

    it("spyCall.args can be used to access the arguments used upon the call instance of a spy", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, 2);
        spy(1, 2, 3);

        expect(spy.firstCall.args).toEqual([1]);
        expect(spy.secondCall.args).toEqual([1, 2]);
        expect(spy.lastCall.args).toEqual([1, 2, 3]);

    });

    it("spyCall.exception can be used to assert an exception thrown during a call to a spy", function () {

        var Error = function () {
        };
        var error = new Error();

        var foo = function (value) {
            if (value) {
                throw error;
            }
        };

        var spy = sinon.spy(foo);

        try {
            spy(true);
        } catch (err) {
        }

        spy(false);

        expect(spy.firstCall.exception).toBe(error);
        expect(spy.lastCall.exception).toBe(undefined);
    });

    it("spyCall.returnValue can be ued to assert the return value of a spy call instance", function () {

        var myClass = {
            /**
             * @return {number}
             */
            Foo: function (value) {
                return value * 10;
            }
        };

        sinon.spy(myClass, "Foo");

        myClass.Foo(1);
        myClass.Foo(2);
        myClass.Foo(3);

        expect(myClass.Foo.firstCall.returnValue).toEqual(10);
        expect(myClass.Foo.secondCall.returnValue).toEqual(20);
        expect(myClass.Foo.lastCall.returnValue).toEqual(30);
    });
});