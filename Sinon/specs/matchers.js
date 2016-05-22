/* global describe, it, expect, beforeEach, jasmine, toBeCustom, sinon, callXTimes, assert, alwaysCalledWith, neverCalledWith */
/* jshint proto: true */

describe("Sinon matchers allow us to asserts calls are made with the right argument values, using fuzzy comparison.", function () {
    "use strict";

    it("we can match parameters with literal values", function () {

        var stub = sinon.stub();

        stub.withArgs(1).returns(10);
        stub.withArgs(2).returns(20);

        expect(stub(1)).toBe(10);
        expect(stub(2)).toBe(20);
    });

    it("sinon.match can be used to match a literal value", function () {

        var stub = sinon.stub();

        var Person = function () {
        };

        var personOne = new Person();

        stub.withArgs(sinon.match(1)).returns(10);
        stub.withArgs(sinon.match("2")).returns(20);
        stub.withArgs(sinon.match(personOne)).returns(30);

        expect(stub(1)).toBe(10);
        expect(stub("2")).toBe(20);
        expect(stub(personOne)).toBe(30);
    });

    it("sinon.match can be used with regular expressions", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match(/^foo/)).returns(10);
        stub.withArgs(sinon.match(/moo/)).returns(20);

        expect(stub("foo loo doo")).toBe(10);
        expect(stub("loo moo")).toBe(20);
    });

    it("sinon.match can be used with functions, these are called custom matchers", function () {

        var stub = sinon.stub();

        var isTrueOrFalse = function (param) {
            return param === true || param === false;
        };

        stub.withArgs(sinon.match(isTrueOrFalse, "True or false")).returns(true);
        stub.withArgs().returns(false);

        expect(stub(true)).toBe(true);
        expect(stub(false)).toBe(true);
        expect(stub(null)).toBe(false);
    });

    it("sinon.match.any can be used to match any variable type and value", function () {

        var stub = sinon.stub();

        // The order matters as the withArgs are stacked in a list
        stub.withArgs(1, 1).returns(1);
        stub.withArgs(1, sinon.match.any).returns(2);
        stub.withArgs(sinon.match.any, 1).returns(3);
        stub.withArgs(sinon.match.any, sinon.match.any).returns(4);

        expect(stub(1, 1)).toBe(1);
        expect(stub(1, undefined)).toBe(2);
        expect(stub(null, 1)).toBe(3);
        expect(stub(null, undefined)).toBe(4);
    });

    it("sinon.match.defined can be used to match any variable which is not undefined", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.defined).returns(true);

        expect(stub(undefined)).toBe(undefined);
        expect(stub(1)).toBe(true);
    });

    it("sinon.match.truthy can be used to match any variable which is considered truthy", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.truthy).returns(true);

        expect(stub(true)).toBe(true);
        expect(stub(1)).toBe(true);
    });

    it("sinon.match.falsy can be used to match any variable which is considered falsy", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.falsy).returns(true);

        expect(stub(false)).toBe(true);
        expect(stub(0)).toBe(true);
    });

    it("sinon.match.bool can be used to match any variable which is of type of boolean", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.bool).returns(true);

        expect(stub(false)).toBe(true);
        expect(stub(true)).toBe(true);
    });

    it("sinon.match.number can be used to match any variable which is of type of number", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.number).returns(true);

        expect(stub(1)).toBe(true);
        expect(stub(0)).toBe(true);
    });

    it("sinon.match.string can be used to match any variable which is of type of string", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.string).returns(true);

        expect(stub("Hello")).toBe(true);
        expect(stub("")).toBe(true);
    });

    it("sinon.match.object can be used to match any variable which is of type of object", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.object).returns(true);

        expect(stub({})).toBe(true);
    });

    it("sinon.match.func can be used to match any variable which is of type of func", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.func).returns(true);

        var foo = function () {
        };

        expect(stub(foo)).toBe(true);
    });

    it("sinon.match.array can be used to match any variable which is of type of array", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.array).returns(true);

        expect(stub([])).toBe(true);
    });

    it("sinon.match.regexp can be used to match any variable which is of type of regexp", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.regexp).returns(true);

        expect(stub(/^foo$/)).toBe(true);
    });

    it("sinon.match.date can be used to match any variable which is of type of date", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.date).returns(true);

        expect(stub(new Date())).toBe(true);
    });

    it("sinon.match.same(ref) can be used to match any variable which is the same object", function () {

        var stub = sinon.stub();

        var myObj = {};

        stub.withArgs(sinon.match.same(myObj)).returns(true);

        expect(stub(myObj)).toBe(true);
    });

    it("sinon.match.typeOf(type) can be used to match any variable which is of the same type", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.typeOf(typeof 1)).returns("Type was a number");
        stub.withArgs(sinon.match.typeOf(typeof "")).returns("Type was a string");
        stub.withArgs(sinon.match.typeOf(typeof true)).returns("Type was a bool");

        expect(stub(1)).toBe("Type was a number");
        expect(stub("Hello")).toBe("Type was a string");
        expect(stub(false)).toBe("Type was a bool");
    });


    it("sinon.match.instanceOf(type) can be used to match any variable which is an instance of a type", function () {

        var stub = sinon.stub();

        var Person = function () {
        };

        stub.withArgs(sinon.match.instanceOf(Person)).returns(true);

        expect(stub(new Person())).toBe(true);
    });

    it("sinon.match.has(PropertyName, PropertyValue) can be used to match any object which has a property/value upon itself or on any member in the prototype chain", function () {

        var stub = sinon.stub();

        var Numbers = function () {
            this.One = 1;
        };

        var SomethingElse = function () {};

        var something = new SomethingElse();
        something.__proto__ = new Numbers();

        stub.withArgs(sinon.match.has("One", 1)).returns(true);
        expect(stub(something)).toBe(true);
    });

    it("sinon.match.hasOwn(PropertyName, PropertyValue) can be used to match any object which has a property/value upon itself. Any member in the prototype chain will be ignored", function () {

        var stub = sinon.stub();

        var number = {"One": 1, "Two": 2};

        stub.withArgs(sinon.match.hasOwn("One", 1)).returns(true);

        expect(stub(number)).toBe(true);
    });

    it("or can be used to combine matcher conditional with the or operand", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.truthy.or(sinon.match.falsy)).returns(true);

        expect(stub(true)).toBe(true);
        expect(stub(false)).toBe(true);
    });

    it("and can be used to combine matcher conditional with the and operand", function () {

        var stub = sinon.stub();

        stub.withArgs(sinon.match.truthy.and(sinon.match.number)).returns(true);
        stub.withArgs(sinon.match.truthy.and(sinon.match.bool)).returns(false);

        expect(stub(1)).toBe(true);
        expect(stub(true)).toBe(false);
    });
});