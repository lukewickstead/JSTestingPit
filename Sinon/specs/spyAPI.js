/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert, alwaysCalledOn, alwaysCalledWith, neverCalledWith, spy, neverCalledWithMatch, spy.alwaysCalledOn, alwaysReturned, alwaysThrew */

describe("The Spy API allows us to place complex assertions upon spies to ensure they were called exactly as expected", function () {
    "use strict";

    it("spy.called can be used to assert a spy was called at least once", function () {

        var mySpy = sinon.spy();

        mySpy(1);

        expect(mySpy.called).toBe(true);
    });

    it("spy.callCount can be used to assert a spy was called as many times as expected", function () {

        var mySpy = sinon.spy();

        mySpy(1);

        expect(mySpy.callCount).toBe(1);

        mySpy(2);
        expect(mySpy.callCount).toBe(2);
    });

    it("spy.withArgs can be used to assert a spy was called with the required parameters as expected", function () {

        var mySpy = sinon.spy();

        mySpy(1);

        expect(mySpy.callCount).toBe(1);
        expect(mySpy.withArgs(1).callCount).toBe(1);
        expect(mySpy.withArgs(2).callCount).toBe(0);

        mySpy(2);
        expect(mySpy.callCount).toBe(2);
        expect(mySpy.withArgs(1).callCount).toBe(1);
        expect(mySpy.withArgs(2).callCount).toBe(1);

    });

    it("spy.calledOnce can be used to assert a spy was called once and only once", function () {

        var mySpy = sinon.spy();

        mySpy(1);

        expect(mySpy.calledOnce).toBe(true);
    });

    it("spy.calledTwice can be used to assert a spy was called twice and only twice", function () {

        var mySpy = sinon.spy();

        mySpy(1);
        mySpy(2);

        expect(mySpy.calledTwice).toBe(true);
    });

    it("spy.calledThrice can be used to assert a spy was called three times and only three times", function () {

        var mySpy = sinon.spy();

        mySpy(1);
        mySpy(1);
        mySpy(1);

        expect(mySpy.calledThrice).toBe(true);
        expect(mySpy.withArgs(1).calledThrice).toBe(true);

    });

    it("spy.calledBefore(spy) can be used to assert a spy was called before another spy", function () {

        var spyOne = sinon.spy();
        var spyTwo = sinon.spy();

        spyOne();
        spyTwo();

        expect(spyOne.calledBefore(spyTwo)).toBe(true);
    });

    it("spy.calledAfter(spy) can be used to assert a spy was called before another spy", function () {

        var spyOne = sinon.spy();
        var spyTwo = sinon.spy();

        spyOne();
        spyTwo();

        expect(spyTwo.calledAfter(spyOne)).toBe(true);
    });

    it("spy.calledOn(ref) can be used to assert a spy was called upon a binding this", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p2, null);

        expect(spy.calledOn(p1)).toBe(true);
        expect(spy.calledOn(p2)).toBe(true);
    });

    it("spy.alwaysCalledOn(ref) can be used to assert a spy was called upon a binding this", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        expect(spy.alwaysCalledOn(p1)).toBe(true);

        spy.apply(p2, null);
        expect(spy.alwaysCalledOn(p1)).toBe(false);
    });

    it("spy.calledWith(arg1, arg2, ...) can be used to assert a spy was called with the required arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2, 1);

        expect(spy.calledWith(1)).toBe(true);
        expect(spy.calledWith(2)).toBe(true);
        expect(spy.calledWith(2, 1)).toBe(true);

        expect(spy.calledWith(3)).toBe(false);
    });

    it("spy.calledWith(arg1, arg2, ...) and others can be used in conjunction with sinon matchers such as a sinon.match.string", function () {

        var spy = sinon.spy();

        spy(1);
        expect(spy.calledWith(sinon.match.number)).toBe(true);
        expect(spy.calledWith(sinon.match.string)).toBe(false);

        spy("Hello");
        expect(spy.calledWith(sinon.match.string)).toBe(true);
    });

    it("spy.alwaysCalledWith(arg1, arg2, ...) can be used to assert a spy was always called with the required arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(1, 2);
        spy(1, 2, 3);

        expect(spy.alwaysCalledWith(1)).toBe(true);
        expect(spy.alwaysCalledWith(1, 2)).toBe(false);
    });

    it("spy.calledWith(arg1, arg2, ...) can be used to assert a spy was called with the required arguments", function () {

        var spy = sinon.spy();

        spy(1);
        spy(2);
        spy(1, 2);
        expect(spy.calledWithExactly(1)).toBe(true);
        expect(spy.calledWithExactly(sinon.match.number)).toBe(true);
        expect(spy.calledWithExactly(1, 2)).toBe(true);
    });

    it("spy.alwaysCalledWithExactly(arg1, arg2, ...) can be used to assert a spy was called with the required arguments", function () {

        var spy = sinon.spy();

        spy(1);
        expect(spy.alwaysCalledWithExactly(1)).toBe(true);

        spy(2);
        expect(spy.alwaysCalledWithExactly(sinon.match.number)).toBe(true);

        spy("a");
        expect(spy.alwaysCalledWithExactly(sinon.match.number)).toBe(false);
        expect(spy.alwaysCalledWithExactly(sinon.match.defined)).toBe(true);
    });

    it("spy.calledWithMatch(arg1, arg2, ...) can be used to assert a spy was called with the required arguments as matches", function () {

        // Not sure why we have specific function for sinon matches when the others seem to match certain entities ok

        var spy = sinon.spy();

        spy(2);
        expect(spy.calledWithMatch(sinon.match.number)).toBe(true);
        expect(spy.calledWithMatch(sinon.match.string)).toBe(false);

        spy("a");
        expect(spy.calledWithMatch(sinon.match.defined)).toBe(true);
    });

    it("spy.calledWithNew asserts that a spy was called with the new operator", function () {

        var spy = sinon.spy();

        spy(2);
        expect(spy.calledWithNew()).toBe(false);

        var newSpy = new spy();
        expect(spy.calledWithNew()).toBe(true);
    });

    it("spy.neverCalledWith asserts that a spy was never called with the arguments", function () {

        var spy = sinon.spy();

        spy(2);
        expect(spy.neverCalledWith(2)).toBe(false);
        expect(spy.neverCalledWith(2, 1)).toBe(true);
        expect(spy.neverCalledWith(3)).toBe(true);

        spy(2, 1);
        expect(spy.neverCalledWith(2)).toBe(false);
        expect(spy.neverCalledWith(2, 1)).toBe(false);
        expect(spy.neverCalledWith(2, 1, 0)).toBe(true);
    });

    it("spy.neverCalledWithMatch asserts that a spy was never called with the matching arguments", function () {

        var spy = sinon.spy();

        expect(spy.neverCalledWithMatch(sinon.match.number)).toBe(true);

        spy(2);
        expect(spy.neverCalledWithMatch(sinon.match.number)).toBe(false);
        expect(spy.neverCalledWithMatch(sinon.match._undefined)).toBe(true);
    });

    it("spy.threw asserts that a spy threw an error at least once", function () {

        var foo = function () {
            throw "Error";
        };

        var spy = sinon.spy(foo);

        try {
            spy();
        } catch (Error) {
        }

        expect(spy.threw()).toBe(true);
    });

    it("spy.threw(string) asserts that a spy threw an error at least once with the required string", function () {

        var foo = function () {
            throw "Error";
        };

        var spy = sinon.spy(foo);

        try {
            spy();
        } catch (Error) {
        }

        expect(spy.threw("Error")).toBe(true);
    });

    it("spy.threw(obj) asserts that a spy threw an object at least once", function () {

        var Error = function () {
        };
        var error = new Error();

        var foo = function () {
            throw error;
        };

        var spy = sinon.spy(foo);

        try {
            spy();
        } catch (err) {
        }

        expect(spy.threw(error)).toBe(true);
    });

    it("spy.threw asserts that a spy threw an error at least once", function () {

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

        expect(spy.alwaysThrew()).toBe(true);

        spy(false);
        expect(spy.alwaysThrew()).toBe(false);

    });

    it("spy.threw(string) asserts that a spy threw an error at least once with the required string", function () {

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

        expect(spy.alwaysThrew("Error")).toBe(true);

        spy(false);
        expect(spy.alwaysThrew("Error")).toBe(false);

    });

    it("spy.threw(obj) asserts that a spy threw an object at least once", function () {

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

        expect(spy.alwaysThrew(error)).toBe(true);

        spy(false);
        expect(spy.alwaysThrew(error)).toBe(false);
    });

    it("sinon.returned(obj) can be used to assert a function returned the required result", function () {

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

        expect(myClass.Foo.returned(10)).toBeTruthy();
        expect(myClass.Foo.returned(20)).toBeTruthy();
        expect(myClass.Foo.returned(30)).toBeTruthy();
        expect(myClass.Foo.returned(40)).toBeFalsy();
    });

    it("sinon.alwaysReturned(obj) can be used to assert a function returned the required result", function () {

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
        expect(myClass.Foo.alwaysReturned(10)).toBeTruthy();

        myClass.Foo(2);
        expect(myClass.Foo.alwaysReturned(10)).toBeFalsy();
    });

    it("spy.thisValues() can be used to assert against a list of objects the this keyword was bound upon", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p2, null);

        expect(spy.thisValues.length).toBe(2);
        expect(spy.thisValues).toEqual([p1, p2]);
        expect(spy.thisValues[0]).toEqual(p1);
        expect(spy.thisValues[1]).toEqual(p2);
    });

    it("spy.args is an array of the arguments used in each call", function () {

        var spy = sinon.spy();

        spy(1, 2, 3);
        expect(spy.args.length).toBe(1);
        expect(spy.args[0].length).toBe(3);
        expect(spy.args[0]).toEqual([1, 2, 3]);

        spy(3, 2, 1);
        expect(spy.args.length).toBe(2);
        expect(spy.args[1].length).toBe(3);
        expect(spy.args[1]).toEqual([3, 2, 1]);
    });

    it("spy.exceptions is a list of exceptions thrown", function () {

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

        try {
            spy(true);
        } catch (err) {
        }

        expect(spy.exceptions.length).toBe(3);
        expect(spy.exceptions).toEqual([error, undefined, error]);
    });

    it("sinon.returnValues is an array of return values", function () {

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

        expect(myClass.Foo.returnValues).toEqual([10, 20, 30]);
    });

    it("spy.reset can be used to reset the state of the spy to its original state", function () {

        var mySpy = sinon.spy();

        mySpy(1);
        expect(mySpy.called).toBe(true);
        expect(mySpy.callCount).toBe(1);

        mySpy.reset();
        expect(mySpy.called).toBe(false);
        expect(mySpy.callCount).toBe(0);

        mySpy(1);
        expect(mySpy.called).toBe(true);
        expect(mySpy.callCount).toBe(1);
    });
});
