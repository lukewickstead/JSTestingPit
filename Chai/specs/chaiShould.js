/*jshint expr: true*/
/* global describe, it, chai, assert, assert.isOk(), isOk(), assert.isNotOk, assert.equal, assert.notEqual, assert.strictEqual, assert.notStrictEqual  */

describe("Chai should", function () {
    "use strict";

    var should = chai.should();

    var one = 1;

    var OkMethod = function () {
    };

    var BadMethod = function () {
        throw Error("FooBar");
    };

    it("should.be.ok tests for a truthy value", function () {
        true.should.be.ok;
        "Yes".should.be.ok;
    });

    it("not negates any test", function () {
        false.should.not.be.ok;
        "0".should.be.ok;
    });

    it("should.be.true checks for a value being true", function () {
        true.should.be.true;
        false.should.not.be.true;
    });

    it("should.be.false", function () {
        false.should.be.false;
        true.should.not.be.false;
    });

    it("should.be.equal checks for equality", function () {
        true.should.equal(true);
        true.should.not.equal(false);
    });

    it("should.be.eql checks for equality by deeply inspecting properties", function () {
        var foo = {foo: 'bar'};
        var oneTwoThree = [1, 2, 3];

        foo.should.eql({foo: 'bar'});
        oneTwoThree.should.eql([1, 2, 3]);
    });

    it("should.be.a", function () {
        "Foo".should.be.a("string");
        one.should.be.a("number");
    });

    it("should.be.include", function () {
        [1, 2, 3].should.include(1);
    });

    it("should.be.contain", function () {
        "foomcdoo".should.contain("mc");
    });

    it("should.be.empty", function () {
        [].should.be.empty;
        ''.should.be.empty;
    });

    it("should.be.arguments", function () {
        arguments.should.be.arguments;
    });

    it("should.be.above", function () {
        one.should.be.above(0);
        "Hello".should.have.length.above(2);
    });

    it("should.be.at.least", function () {
        one.should.be.at.least(1);
        "Hello".should.have.length.at.least(5);
    });

    it("should.be.below", function () {
        one.should.be.below(2);
    });

    it("should.be.at.most", function () {
        one.should.be.at.most(1);
    });

    it("should.be.below", function () {
        one.should.be.below(2);
    });

    it("should.exist", function () {
        should.exist({});
    });

    it("should.not.exist", function () {
        should.not.exist(null);
    });


    it("should.not.exist", function () {
        "foo".should.be.NaN;
    });

    it("Dave.should.be.an.instanceof", function () {

        var Person = function (name) {
            this.name = name;
        };

        var Dave = new Person('Dave');
        Dave.should.be.an.instanceof(Person);
    });

    it("should.match", function () {
        'A very naughty boy'.should.match(/^A very/);
        'A very naughty boy'.should.match(/boy$/);
    });

    it("should.have.string", function () {
        'A very naughty boy'.should.have.string("very");
    });

    it("should.have.Property", function () {

        var obj = {foo: 'bar'};
        obj.should.have.property('foo');
        obj.should.have.property('foo', 'bar');

        // nested properties with deep
        var deepObj = {Name: {First: 'Luke', Last: "FooName"}};

        deepObj.should.have.deep.property('Name.First', 'Luke');
    });

    it("should.have.ownProperty", function () {
        'foo'.should.have.ownProperty('length');
    });

    it("should.have.ownPropertyDescriptor", function () {
        'foo'.should.have.ownPropertyDescriptor('length');
        'foo'.should.have.ownPropertyDescriptor('length', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 3
        });
        'foo'.should.not.have.ownPropertyDescriptor('length', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 2
        });
    });

    it("should.have.length.of", function () {
        [1, 2, 3].should.have.length.of(3);
    });

    it("should.throw", function () {
        should.throw(BadMethod);
        should.throw(BadMethod, "FooBar");
        should.throw(BadMethod, /ooB/);
        should.throw(BadMethod, Error);
        should.throw(BadMethod, Error, "FooBar");
        should.throw(BadMethod, Error, /ooB/);
    });

    it("should.not.throw", function () {
        should.not.throw(OkMethod, 'Another message');
        should.not.throw(BadMethod, String);
    });

    it("should.be.within", function () {
        one.should.be.within(0.3, 1.2);
        "hello".should.have.length.within(2, 5);
    });

    it("should.have.members", function () {
        [1, 2, 3].should.have.members([2, 1, 3]);
        [{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}].should.have.deep.members([{Name: "Jom"}, {Name: "Jam"}, {Name: "Jim"}]);
    });

    it("assert.includeMembers", function () {
        [1, 2, 3].should.include.members([2, 1]);
        [{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}].should.include.deep.members([{Name: "Jom"}, {Name: "Jam"}]);
    });

    it("should.be.oneOf", function () {
        one.should.be.oneOf([2, 1]);
    });

    it("should.[have/contains].[all/any.keys]", function () {

        var myObject = {Name: "Luke", Age: 37};

        myObject.should.have.any.keys('Name', 'baz');
        myObject.should.have.any.keys('Name');
        myObject.should.contain.any.keys('Name', 'Size');
        myObject.should.contain.any.keys(['Name']);
        myObject.should.contain.any.keys({'Name': "Jim"});
        myObject.should.have.all.keys(['Name', 'Age']);
        myObject.should.have.all.keys({'Name': true, 'Age': false});
        myObject.should.contain.all.keys(['Name', 'Age']);
        myObject.should.contain.all.keys({'Name': 6});
    });

    it("should.change", function () {
        var foo = {isHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };
        setIsHit.should.change(foo, 'isHit');
    });

    it("should.not.change", function () {
        var foo = {isHit: false, isNotHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };
        setIsHit.should.not.change(foo, 'isNotHit');
    });

    it("should.change", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };
        incrementCount.should.change(foo, 'count');
    });

    it("should.not.increases", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };
        decrementCount.should.not.increases(foo, 'count');
    });

    it("should.decreases", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };

        decrementCount.should.decrease(foo, 'count');
    });

    it("should.not.decreases", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };

        incrementCount.should.not.decreases(foo, 'count');
    });

    it("should.be.extensible", function () {
        var myobject = {};
        myobject.should.be.extensible;
    });

    it("should.not.be.extensible", function () {
        var sealedObject = Object.seal({});
        var nonExtensibleObject = Object.preventExtensions({});

        sealedObject.should.not.be.extensible;
        nonExtensibleObject.should.not.be.extensible;
    });

    it("should.be.sealed", function () {
        var sealedObject = Object.seal({});
        sealedObject.should.be.sealed;
    });

    it("should.not.be.sealed", function () {
        var myobject = {};
        myobject.should.not.be.sealed;
    });

    it("should.satisfy", function () {
        one.should.satisfy(function (x) {
            return x === 1;
        });
    });

    it("should.respondTo", function () {

        function Foo() {
        }

        Foo.bar = function () {
        };

        Foo.prototype.moo = function () {
        };

        Foo.should.not.respondTo('bar');
        Foo.should.respondTo('moo');
    });

    it("should.itself.respondTo", function () {

        function Foo() {
        }

        Foo.bar = function () {
        };

        Foo.prototype.moo = function () {
        };

        Foo.should.itself.to.respondTo('bar');
        Foo.should.itself.not.to.respondTo('moo');
    });
});