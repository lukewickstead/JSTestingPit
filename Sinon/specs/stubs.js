/* global $, describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert */

describe("Stubs are spies with pre-programmed behaviour. We can define or stub their functionality to help us test all the different parts of our application", function () {
    "use strict";

    it("sinon.stub() can be used to create an anonymous stub. Stubs can consume all the spy assertions, spy api and sinon assertions etc.", function () {
        var stub = sinon.stub();

        stub();

        expect(stub.called).toBeTruthy();
    });

    it("sinon.stub() can be used to replace a single method on an object. The method is stubbed allowing functionality to be set as well as assertions to be placed upon the method as if it was a spy", function () {

        var myClass = {
            /**
             * @return {number}
             */
            Foo: function (value) {
                return value * 10;
            }
        };

        var aSpy = sinon.stub(myClass, "Foo");

        aSpy.returns(100);

        expect(myClass.Foo(1)).toBe(100);
    });

    it("sinon.stub() can be used to replace a single method on an object with a function. The stubbed function allows assertions to be placed upon the method as if it was a spy", function () {

        var myClass = {
            /**
             * @return {number}
             */
            Foo: function (value) {
                return value * 10;
            }
        };

        var stubbedFunction = function (value) {
            return value * 1000;
        };

        var aSpy = sinon.stub(myClass, "Foo", stubbedFunction);

        expect(myClass.Foo(1)).toBe(1000);
        expect(aSpy.called).toBeTruthy();
    });

    it("sinon.stub() can be used to replace a all methods on an object. The stubbed function allows assertions to be placed upon the method as if it was a spy", function () {

        var myClass = {
            /**
             * @return {number}
             */
            Foo: function (value) {
                return value * 10;
            },
            /**
             * @return {number}
             */
            Moo: function (value) {
                return value * 100;
            }
        };

        var aSpy = sinon.stub(myClass);

        aSpy.Foo.returns(true);
        aSpy.Moo.returns(false);

        expect(myClass.Foo(1)).toBe(true);
        expect(myClass.Moo(1)).toBe(false);

        expect(aSpy.Foo).toBeTruthy();
        expect(aSpy.Moo).toBeTruthy();
    });

    it("stub.returns can be used to stub return data", function () {
        var stub = sinon.stub().returns(true);
        expect(stub()).toBe(true);
    });

    it("stub.withArgs can be used to stub a call based upon the arguments used", function () {
        var stub = sinon.stub();

        stub.withArgs(1).returns(true);
        stub.withArgs(2).returns(false);

        expect(stub(1)).toBe(true);
        expect(stub(2)).toBe(false);
    });

    it("stub.withArgs can be used with sinon matchers", function () {
        var stub = sinon.stub();

        // Mor specific need to be first
        stub.withArgs(sinon.match.string, sinon.match.number).returns(4);

        stub.withArgs(sinon.match.string).returns(1);
        stub.withArgs(sinon.match.number).returns(2);
        stub.withArgs(sinon.match.any).returns(3);

        expect(stub("Foo")).toBe(1);
        expect(stub(1)).toBe(2);
        expect(stub([])).toBe(3);
        expect(stub("Foo", 1)).toBe(4);
    });

    it("stub.returnsArg can be used to return an argument at a specified original index of the argument list", function () {
        var stub = sinon.stub().returnsArg(2);
        expect(stub(1, 2, 3, 4)).toBe(3);
    });

    it("stub.on[First,Second,Third]Call can be used to return specific data on specific ordinal calls to a stub", function () {

        var stub = sinon.stub();

        stub.onFirstCall().returns(1);
        stub.onSecondCall().returns(2);
        stub.onThirdCall().returns(3);
        stub.returns(true);

        expect(stub()).toBe(1);
        expect(stub()).toBe(2);
        expect(stub()).toBe(3);
        expect(stub()).toBe(true);
    });

    it("stub.onCall(n) can be used to return specific data on specific ordinal calls to a stub", function () {

        var stub = sinon.stub();

        stub.onCall(1).returns(true);
        stub.onCall(3).returns(true);
        stub.returns(false);

        expect(stub()).toBe(false);
        expect(stub()).toBe(true);
        expect(stub()).toBe(false);
        expect(stub()).toBe(true);
    });

    it("stub.returnsThis() can be used to return the object bound to this", function () {

        var person = function () {
        };

        var p1 = new person();

        var stub = sinon.stub().returnsThis();
        var p1This = stub.apply(p1, null);

        expect(p1This).toBe(p1);
    });

    it("stub.throws can be used to make a stub throw an exception", function () {

        var stub = sinon.stub().throws();

        try {
            stub();
        } catch (err) {
        }

        expect(stub.threw()).toBe(true);
    });

    it("stub.throws(string) can be used to make a stub throw an exception with a specified string", function () {

        var stub = sinon.stub().throws("Error");

        try {
            stub();
        } catch (err) {
        }

        expect(stub.threw("Error")).toBe(true);
    });

    it("stub.throws(obj) can be used to make a stub throw an exception with a specified object", function () {

        var Error = function () {
        };

        var error = new Error();

        var stub = sinon.stub().throws(error);

        try {
            stub();
        } catch (err) {
        }

        expect(stub.threw(error)).toBe(true);
    });

    it("stub.callsArg() can be used to call a function or callback passed in as an argument at a specified ordinal position within the argument list", function () {

        var stubOne = sinon.stub().callsArg(0);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.called).toBe(true);
    });

    it("stub.callsArgOn() can be used to call a function or callback passed in as an argument at a specified ordinal position within the argument list, and bound to ths this argument passed in", function () {

        var person = function () {
        };

        var p1 = new person();

        var stubOne = sinon.stub().callsArgOn(0, p1);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.called).toBe(true);
        expect(stubTwo.firstCall.thisValue).toBe(p1);
        expect(stubTwo.calledOn(p1)).toBe(true);
    });

    it("stub.callsArgWith() can be used to call a function or callback passed in as an argument at a specified ordinal position within the argument list, with a specified argument itself", function () {

        var stubOne = sinon.stub().callsArgWith(0, 1, 2);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.calledWith(1, 2)).toBe(true);
    });

    it("stub.callsArgOn() can be used to call a function or callback passed in as an argument at a specified ordinal position within the argument list, and bound to ths this argument passed in", function () {

        var person = function () {
        };

        var p1 = new person();

        var stubOne = sinon.stub().callsArgOnWith(0, p1, 1, 2);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.called).toBe(true);
        expect(stubTwo.firstCall.thisValue).toBe(p1);
        expect(stubTwo.firstCall.calledWith(1, 2)).toBe(true);
    });

    it("stub.yields() calls the passed in callback method with all arguments in the argument list", function () {

        var stubOne = sinon.stub().yields(1, 2);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.calledWith(1, 2)).toBe(true);
    });

    it("stub.yieldsOn() calls the passed in callback method with all arguments in the argument list", function () {

        var person = function () {
        };

        var p1 = new person();

        var stubOne = sinon.stub().yieldsOn(p1, 1, 2);
        var stubTwo = sinon.stub();

        stubOne(stubTwo);

        expect(stubTwo.firstCall.thisValue).toBe(p1);
        expect(stubTwo.firstCall.calledWith(1, 2)).toBe(true);
    });

    it("stub.yieldsTo() calls the property with the passed in arguments", function () {

        var stub = sinon.stub().yieldsTo("success", [1, 2, 3]);

        stub({
            success: function (data) {
                expect(data).toEqual([1, 2, 3]);
            }
        });
    });
});