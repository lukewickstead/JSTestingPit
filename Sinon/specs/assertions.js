/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert, alwaysCalledWith, neverCalledWith */

describe("Sinon assertions allow us to ensure our spies, stubs, mocks etc are all being called as required. They are an alternative to the Spy API", function () {
    "use strict";

    it("sinon.assert.notCalled assert a spy was not called", function () {

        var spy = sinon.spy();
        sinon.assert.notCalled(spy);
    });

    it("sinon.assert.called asserts that a spy was called at least once", function () {

        var spy = sinon.spy();
        spy();
        sinon.assert.called(spy);
    });

    it("sinon.assert.calledOnce asserts that a spy was called once and only once", function () {

        var spy = sinon.spy();

        spy();
        sinon.assert.calledOnce(spy);
    });

    it("sinon.assert.calledTwice asserts that a spy was called twice and only twice", function () {

        var spy = sinon.spy();

        spy();
        spy();

        sinon.assert.calledTwice(spy);
    });

    it("sinon.assert.calledThrice asserts that a spy was called three times and only three times", function () {

        var spy = sinon.spy();

        spy();
        spy();
        spy();

        sinon.assert.calledThrice(spy);
    });


    it("sinon.assert.callCount asserts that a spy was called x times and only x times", function () {

        var spy = sinon.spy();

        spy();
        spy();
        spy();

        sinon.assert.callCount(spy, 3);
    });

    it("sinon.assert.callOrder assert spies were all called and in the required order", function () {

        var spyOne = sinon.spy();
        var spyTwo = sinon.spy();
        var spyThree = sinon.spy();

        spyOne();
        spyTwo();
        spyThree();

        sinon.assert.callOrder(spyOne, spyTwo, spyThree);
    });

    it("sinon.assert.calledWith asserts that a spy was called with the required partial parameter list", function () {

        var spy = sinon.spy();

        spy(1, 2);

        sinon.assert.calledWith(spy, 1);
        sinon.assert.calledWith(spy, 1, 2);
    });

    it("sinon.assert.neverCalledWith asserts a spy was called with and only called with a required partial parameter list", function () {

        var spy = sinon.spy();

        spy(1, 2);
        // spy(1, 2); this would cause an error

        sinon.assert.alwaysCalledWith(spy, 1);
        sinon.assert.alwaysCalledWith(spy, 1, 2);
    });

    it("sinon.assert.neverCalledWith asserts that a spy was never called with a partial parameter list", function () {

        var spy = sinon.spy();

        spy(1, 2);
        // spy(1, 2); this would cause an error

        sinon.assert.neverCalledWith(spy, 3);
        sinon.assert.neverCalledWith(spy, 2, 2);
    });

    it("sinon.assert.calledWithExactly asserts that a spy was called with an exact parameter list", function () {

        var spy = sinon.spy();

        spy(1, 2);

        sinon.assert.calledWithExactly(spy, 1, 2);
    });

    it("sinon.assert.alwaysCalledWithExactly asserts that a spy was called and only called with an exact parameter list", function () {

        var spy = sinon.spy();

        spy(1, 2);

        sinon.assert.alwaysCalledWithExactly(spy, 1, 2);
    });

    it("sinon.assert.calledWithMatch asserts that a spy was called with a partial parameter list where any number of parameters have been fuzzy matched by sinon matchers", function () {

        var spy = sinon.spy();

        spy(1, 1);
        spy(2, 1);
        spy(2, 2);

        sinon.assert.calledWithMatch(spy, 1, sinon.match(sinon.match.number));
        sinon.assert.calledWithMatch(spy, sinon.match(sinon.match.number));
        sinon.assert.calledWithMatch(spy, sinon.match(sinon.match.number), 2);
        sinon.assert.calledWithMatch(spy, sinon.match(sinon.match.number), sinon.match(sinon.match.number));
    });

    it("sinon.assert.alwaysCalledWithMatch asserts that a spy was called and only called with a partial parameter list where any number of parameters have been fuzzy matched by sinon matchers", function () {

        var spy = sinon.spy();

        spy(1, 2);

        sinon.assert.alwaysCalledWithMatch(spy, 1, sinon.match(sinon.match.number));
        sinon.assert.alwaysCalledWithMatch(spy, sinon.match(sinon.match.number));
        sinon.assert.alwaysCalledWithMatch(spy, sinon.match(sinon.match.number), 2);
        sinon.assert.alwaysCalledWithMatch(spy, sinon.match(sinon.match.number), sinon.match(sinon.match.number));
    });

    it("sinon.assert.neverCalledWithMatch asserts that a spy was never called with a partial parameter list where any number of parameters have been fuzzy matched by sinon matchers", function () {

        var spy = sinon.spy();

        spy(1, 2);

        sinon.assert.neverCalledWithMatch(spy, 2, sinon.match(sinon.match.number));
        sinon.assert.neverCalledWithMatch(spy, sinon.match(sinon.match.string));
    });

    it("sinon.assert.threw asserts that a spy threw an error at least once", function () {

        var spy = sinon.stub();
        spy.withArgs(true).throws("Error");
        spy.withArgs(false).returns(true);

        try {
            spy(true);
            spy(false);
        } catch (ex) {

        }

        sinon.assert.threw(spy);
        sinon.assert.threw(spy, "Error");
    });

    it("sinon.assert.alwaysThrew asserts that a spy always threw an error", function () {

        var spy = sinon.stub();

        spy.withArgs(true).throws("Error");

        try {
            spy(true);
        } catch (ex) {
        }

        sinon.assert.alwaysThrew(spy);
        sinon.assert.alwaysThrew(spy, "Error");
    });

    it("sinon.assert.calledOn asserts that a spy was called with the required contextual binding of this", function () {

        var person = function () {
        };

        var p1 = new person();
        var p2 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p2, null);

        sinon.assert.calledOn(spy, p1);
        sinon.assert.calledOn(spy, p2);
    });

    it("sinon.assert.alwaysCalledOn asserts that a spy was called with and always called with the required contextual binding of this", function () {

        var person = function () {
        };

        var p1 = new person();

        var spy = sinon.spy();

        spy.apply(p1, null);
        spy.apply(p1, null);

        sinon.assert.alwaysCalledOn(spy, p1);
    });
});