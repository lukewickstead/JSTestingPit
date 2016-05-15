/*jshint expr: true*/
/* global describe, it, chai, assert, assert.isOk(), isOk(), assert.isNotOk, assert.equal, assert.notEqual, assert.strictEqual, assert.notStrictEqual  */

describe("Chai assertions", function () {
    "use strict";

    var assert = chai.assert;

    var OkMethod = function () {
    };

    var BadMethod = function () {
        throw Error("FooBar");
    };

    it("assert checks for true", function () {
        assert(true, 'is true');
    });

    it("assert.isOk tests for a truthy value", function () {
        assert.isOk(1, '1 is truthy');
        assert.isOk(true, 'true is truthy');
        assert.isOk("Yes", '"Yes" is truthy');
    });

    it("assert.isNotOk tests for a falsy value", function () {
        assert.isNotOk(0, '0 is falsy');
        assert.isNotOk(false, 'false is falsy');
        assert.isNotOk(null, 'null is falsy');
        assert.isNotOk(undefined, 'null is falsy');
        assert.isNotOk("", '"" is falsy');
    });

    it("assert.equal checks for equality", function () {
        assert.equal(true, true, 'true is equal to true');
        assert.equal(1, "1", '1 is equal to "1"');
    });

    it("assert.notEqual checks for equality", function () {
        assert.notEqual(false, true, 'false is not equal to true');
        assert.notEqual(1, "2", '1 is equal to "2"');
    });

    it("assert.checks for strict equality (===)", function () {
        assert.equal(true, true, 'true is equal to true');
    });

    it("assert.notStrictEqual checks for strict inequality (===)", function () {
        assert.notStrictEqual(1, "1", '1 is not equal to "1"');
    });

    it("assert.strictEqual checks for strict equality (===)", function () {
        assert.equal(true, true, 'true is equal to true');
    });

    it("assert.deepEqual checks for key value pairs being equal", function () {
        assert.deepEqual({Name: 'Luke', Age: 37}, {Name: 'Luke', Age: 37});
    });

    it("assert.isAbove", function () {
        assert.isAbove(2, 1, '2 is greater than 1');
    });

    it("assert.isAtLeast", function () {
        assert.isAtLeast(2, 2, '2 is at least 2');
    });

    it("assert.isBelow", function () {
        assert.isBelow(2, 3, '2 is below 3');
    });

    it("assert.isAtMost", function () {
        assert.isAtMost(2, 3, '2 is at most 3');
    });

    it("assert.isBelow", function () {
        assert.isBelow(2, 3, '2 is below 3');
    });

    it("assert.isTru", function () {
        assert.isTrue(true, 'is true');
    });

    it("assert.isNotTrue", function () {
        assert.isNotTrue(false, 'false is not true');
        assert.isNotTrue(1, '1 is not true');
    });

    it("assert.isFalse", function () {
        assert.isFalse(false, 'is false');
    });

    it("assert.isNotFalse", function () {
        assert.isNotFalse(true, 'is not false');
    });

    it("assert.isNull", function () {
        assert.isNull(null, 'is null');
    });

    it("assert.isNotNull", function () {
        assert.isNotNull(undefined, 'is not null');
    });

    it("assert.isUndefined", function () {
        assert.isUndefined(undefined, 'is undefined');
    });

    it("assert.isDefined", function () {
        assert.isDefined(true, 'is is defined');
    });

    it("assert.isFunction", function () {
        assert.isFunction(function () {
        }, 'is a function');
    });

    it("assert.isNotFunction", function () {
        assert.isNotFunction(true, 'is not a function');
    });

    it("assert.isObject", function () {
        assert.isObject({}, 'is a object');
    });

    it("assert.isNotObject", function () {
        assert.isNotObject(true, 'is not a object');
    });

    it("assert.isArray", function () {
        assert.isArray([], 'is an array');
    });

    it("assert.isNotArray", function () {
        assert.isNotArray(true, 'is not an array');
    });

    it("assert.isString", function () {
        assert.isString("", 'is a string');
    });

    it("assert.isNotString", function () {
        assert.isNotString(true, 'is not a string');
    });

    it("assert.isNumber", function () {
        assert.isNumber(1, 'is a number');
    });

    it("assert.isNotNumber", function () {
        assert.isNotNumber(true, 'is not a number');
    });

    it("assert.isBoolean", function () {
        assert.isBoolean(true, 'is a boolean');
    });

    it("assert.isNotBoolean", function () {
        assert.isNotBoolean(1, 'is not a boolean');
    });

    it("assert.typeOf", function () {
        assert.typeOf({Name: 'Luke'}, 'object', 'is an object');
        assert.typeOf([1, 2], 'array', 'is an array');
        assert.typeOf('Luke', 'string', 'is a string');
    });

    it("assert.notTypeOf", function () {
        assert.notTypeOf({Name: 'Luke'}, 'array', 'is not an array');
        assert.notTypeOf([1, 2], 'object', 'is not an object');
        assert.notTypeOf('Luke', 'number', 'is not a number');
    });

    it("assert.isInstanceOf", function () {

        var Person = function (name) {
            this.name = name;
        };
        var Dave = new Person('Dave');

        assert.instanceOf(Dave, Person, 'Dave is a person');
    });

    it("assert.notInstanceOf", function () {

        var Person = function (name) {
            this.name = name;
        };
        var Animal = function (name) {
            this.name = name;
        };

        var Dave = new Person('Dave');

        assert.notInstanceOf(Dave, Animal, 'Dave is not an animal');
    });

    it("assert.include", function () {
        assert.include("Luke", "uk", 'includes uk');
        assert.include([1, 2, 3], 2, 'includes 2');
    });

    it("assert.notInclude", function () {
        assert.notInclude("Luke", "foo", 'does not include uk');
        assert.notInclude([1, 2, 3], 321, 'does not include 321');
    });

    it("assert.match", function () {
        assert.match('A very naughty boy', /^A very/, 'starts with A very');
        assert.match('A very naughty boy', /boy$/, 'ends with boy');
    });

    it("assert.notMatch", function () {
        assert.notMatch('A very naughty boy', /^very/, 'does not start with very');
        assert.notMatch('A very naughty boy', /boy /, 'does not end with "boy "');
    });

    it("assert.property", function () {
        //noinspection JSCheckFunctionSignatures
        assert.property({Name: {ForeName: 'Luke'}}, 'Name', "name property exists");
    });

    it("assert.notProperty", function () {
        assert.notProperty({Name: {ForeName: 'Luke'}}, 'Age', "age property does not exists");
    });

    it("assert.propertyVal", function () {
        assert.propertyVal({Name: "Luke"}, 'Name', 'Luke', "name property equals Luke");
    });

    it("assert.propertyNotVal", function () {
        assert.propertyNotVal({Name: "Luke"}, 'Name', 'James', "name property does not equal James");
    });

    it("assert.deepProperty", function () {
        assert.deepProperty({
            Name: {
                Forename: 'James',
                Surname: "Brown"
            }
        }, 'Name.Forename', "Name.Forename property exists");
    });

    it("assert.notDeepProperty", function () {
        assert.notDeepProperty({
            Name: {
                Forename: 'James',
                Surname: "Brown"
            }
        }, 'Name.MiddleName', "Name.MiddleName property does not exist");
    });

    it("assert.deepPropertyVal", function () {
        assert.deepPropertyVal({
            Name: {
                Forename: 'James',
                Surname: "Brown"
            }
        }, 'Name.Forename', 'James', "Name.Forename property equals James");
    });

    it("assert.deepPropertyNotVal", function () {
        assert.deepPropertyNotVal({
            Name: {
                Forename: 'James',
                Surname: "Brown"
            }
        }, 'Name.Forename', 'Jimmy', "Name.Forename property does not equal Jimmy");
    });

    it("assert.lengthOf", function () {
        assert.lengthOf([1, 2, 3], 3, 'array has 3 elements');
        assert.lengthOf('foo', 3, 'string has three characters');
    });

    it("assert.throws", function () {
        assert.throws(BadMethod, 'FooBar');
        assert.throws(BadMethod, /ooB/);
        assert.throws(BadMethod, Error);
        assert.throws(BadMethod, Error, 'FooBar');
        assert.throws(BadMethod, Error, /ooB/);
    });

    it("assert.throws", function () {
        assert.doesNotThrow(OkMethod, 'Another message');
        assert.doesNotThrow(BadMethod, String);
    });

    it("assert.operator", function () {
        assert.operator(1, '<=', 1, '1 is less than or equal to 1');
        assert.operator(2, '>', 1, '2 is greater than 2');
    });

    it("assert.closeTo", function () {
        assert.closeTo(1, 1.2, 0.3, "1 is close to 1.2 with an accuracy of 0.3");
    });

    it("assert.approximately", function () {
        assert.approximately(1, 1.2, 0.3, "1 is approximately 1.2 with an accuracy of 0.3");
    });

    it("assert.sameMembers", function () {
        assert.sameMembers([1, 2, 3], [2, 1, 3], '[1,2,3] has the same elements as [3,2,1]');
    });

    it("assert.sameDeepMembers", function () {
        assert.sameDeepMembers([{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}], [{Name: "Jom"}, {Name: "Jam"}, {Name: "Jim"}], 'Jim, Jam, Jom has the same object elements as Jom, Jim Jam');
    });

    it("assert.includeMembers", function () {
        assert.includeMembers([1, 2, 3], [2, 1], '[1,2,3] includes [2,1]');
    });

    it("assert.includeDeepMembers", function () {
        assert.includeDeepMembers([{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}], [{Name: "Jom"}, {Name: "Jam"}], 'Jim, Jam, Jom has the same object elements as Jom, Jim Jam');
    });

    it("assert.oneOf", function () {
        assert.oneOf(1, [2, 1], '1 is included in [2,1]');
    });

    it("assert.changes", function () {
        var foo = {isHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };
        assert.changes(setIsHit, foo, 'isHit');
    });

    it("assert.doesNotChange", function () {
        var foo = {isHit: false, isNotHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };
        assert.doesNotChange(setIsHit, foo, 'isNotHit');
    });

    it("assert.increases", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };
        assert.changes(incrementCount, foo, 'count');
    });

    it("assert.doesNotIncrease", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };
        assert.doesNotIncrease(decrementCount, foo, 'count');
    });

    it("assert.decreases", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };
        assert.decreases(decrementCount, foo, 'count');
    });

    it("assert.doesNotDecrease", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };
        assert.doesNotDecrease(incrementCount, foo, 'count');
    });

    it("assert.isExtensible", function () {
        assert.isExtensible({});
    });

    it("assert.isNotExtensible", function () {

        var nonExtensibleObject = Object.preventExtensions({});
        var sealedObject = Object.seal({});

        assert.isNotExtensible(nonExtensibleObject);
        assert.isNotExtensible(sealedObject);
    });

    it("assert.isSealed", function () {

        var sealedObject = Object.seal({});
        assert.isSealed(sealedObject);
    });

    it("assert.isNotSealed", function () {
        assert.isNotSealed({});
    });
});