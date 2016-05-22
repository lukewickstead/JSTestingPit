/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert */

describe("Mocks are like spies but can fail a test if all their expected calls were not made", function () {
    "use strict";

    it("Mocks can be created against an existing object", function () {

        var myAPI = {
            Foo: function () {
            }
        };

        var mock = sinon.mock(myAPI);
        mock.expects("Foo").once();

        myAPI.Foo();

        mock.verify();
    });

    it("Mocks can be created against as an anonymous object", function () {

        var mock = sinon.expectation.create().once();

        mock();

        mock.verify();
    });

    it("mock.atLeast can be used to ensure a mock was called at least x times", function () {

        var mock = sinon.expectation.create().atLeast(1);

        mock();

        mock.verify();
    });

    it("mock.atMost can be used to ensure a mock was called at most x times", function () {

        var mock = sinon.expectation.create().atMost(1);

        mock();

        mock.verify();
    });

    it("mock.never can be used to ensure a mock was never called ", function () {

        var mock = sinon.expectation.create().never();

        mock.verify();
    });

    it("mock.once can be used to ensure a mock was called only once", function () {

        var mock = sinon.expectation.create().once();

        mock();

        mock.verify();
    });

    it("mock.twice can be used to ensure a mock was called only twice", function () {

        var mock = sinon.expectation.create().twice();

        mock();
        mock();

        mock.verify();
    });

    it("mock.thrice can be used to ensure a mock was called only thrice", function () {

        var mock = sinon.expectation.create().thrice();

        mock();
        mock();
        mock();

        mock.verify();
    });

    it("mock.exactly can be used to ensure a mock was called exactly x times", function () {

        var mock = sinon.expectation.create().exactly(3);

        mock();
        mock();
        mock();

        mock.verify();
    });

    it("mock.withArgs can be used to ensure a mock was called with a partial argument list", function () {

        var mock = sinon.expectation.create().withArgs(1);

        mock(1, 2);

        mock.verify();
    });

    it("mock.withExactArgs can be used to ensure a mock was called with an exact argument list", function () {

        var mock = sinon.expectation.create().withExactArgs(1, 2);

        mock(1, 2);

        mock.verify();
    });

    it("mock.on can be used to ensure a mock was called with an object bound to the this", function () {

        var person = function () {
        };

        var p1 = new person();

        var mock = sinon.expectation.create().on(p1);

        mock.apply(p1);

        mock.verify();
    });

    it("expectations can be chained via a fluent interface", function () {

        var mock = sinon.expectation.create().atLeast(1).atMost(2);

        mock();

        mock.verify();
    });

    it("multiple expectations can be placed upon a mock", function () {

        var myAPI = {
            Foo: function () {
            }, Moo: function () {
            }
        };
        var mock = sinon.mock(myAPI);

        mock.expects("Foo").withArgs(1, 1);
        mock.expects("Foo").withArgs(2, 2);

        myAPI.Foo(1, 1);
        myAPI.Foo(2, 2);

        mock.verify();
    });


    it("multiple expectations can be placed upon a mock, each with multiple conditions", function () {

        var myAPI = {
            Foo: function () {
            }, Moo: function () {
            }
        };
        var mock = sinon.mock(myAPI);

        mock.expects("Foo").withArgs(0, 0).never();
        mock.expects("Foo").withArgs(1, 1).once();
        mock.expects("Foo").withArgs(2, 2).twice();

        myAPI.Foo(1, 1);
        myAPI.Foo(2, 2);
        myAPI.Foo(2, 2);

        mock.verify();
    });


    it("mocks can be stubbed to return data", function () {

        var myAPI = {
            Foo: function () {
            }
        };

        var mock = sinon.mock(myAPI);

        mock.expects("Foo").once().returns(true);
        mock.expects("Foo").once().returns(false);

        expect(myAPI.Foo()).toBeTruthy();
        expect(myAPI.Foo()).toBeFalsy();

        mock.verify();
    });


    it("mock.restore() is used to put the mocked entity back to how it was before mocking", function () {

        var myAPI = {
            /**
             * @return {boolean}
             */
            Foo: function () {
                return false;
            }
        };

        var mock = sinon.mock(myAPI);

        mock.expects("Foo").once().returns(true);
        var returns = myAPI.Foo();

        expect(returns).toBeTruthy();

        mock.verify();
        mock.restore();

        expect(myAPI.Foo()).toBeFalsy();
    });
});
