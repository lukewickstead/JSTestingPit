/*jshint expr: true*/
/* global describe, it, chai, assert, assert.isOk(), isOk(), assert.isNotOk, assert.equal, assert.notEqual, assert.strictEqual, assert.notStrictEqual  */

describe("Chai expect", function () {
    "use strict";

    var expect = chai.expect;

    var one = 1;

    var BadMethod = function () {
        throw Error("FooBar");
    };

    it("expect.to.be.ok tests for a truthy value", function () {
        expect(true).to.be.ok;
        expect("Yes").to.be.ok;
    });

    it("expect.to.not.be.ok", function () {
        expect(false).to.not.be.ok;
        expect("0").to.be.ok;
    });

    it("expect.to.be.be.true", function () {
        expect(true).to.be.true;
        expect(false).not.to.be.true;
    });

    it("expect.to.be.false", function () {
        expect(false).to.be.false;
        expect(true).not.be.false;
    });

    it("expect.to.be.equal checks for equality", function () {
        expect(true).to.equal(true);
        expect(true).to.not.equal(false);
    });

    it("expect.to.be.eql checks for equality by deeply inspecting properties", function () {
        var foo = {foo: 'bar'};
        var oneTwoThree = [1, 2, 3];

        expect(foo).to.eql({foo: 'bar'});
        expect(oneTwoThree).to.eql([1, 2, 3]);
    });

    it("expect.to.be.a", function () {
        expect("Foo").to.be.a("string");
        expect(one).to.be.a("number");
    });

    it("expect.to.include", function () {
        expect([1, 2, 3]).to.include(1);
    });

    it("expect.to.contain", function () {
        expect("foomcdoo").to.contain("mc");
    });

    it("expect.to.be.empty", function () {
        expect([]).to.be.empty;
        expect('').to.be.empty;
    });

    it("expect.to.be.arguments", function () {
        expect(arguments).to.be.arguments;
    });

    it("expect.to.be.above", function () {
        expect(one).to.be.above(0);
        expect("Hello").to.have.length.above(2);
    });

    it("expect.to.be.at.least", function () {
        expect(one).to.be.at.least(1);
        expect("Hello").to.have.length.at.least(5);
    });

    it("expect.to.be.below", function () {
        expect(one).to.be.below(2);
    });

    it("expect.to.be.at.most", function () {
        expect(one).to.be.at.most(1);
    });

    it("expect.to.be.below", function () {
        expect(one).to.be.below(2);
    });

    it("expect.to.exist", function () {
        expect({}).to.exist;
    });

    it("expect.not.to.exist", function () {
        expect(null).not.to.exist;
    });

    it("expect.to.be.NaN", function () {
        expect("foo").to.be.NaN;
    });

    it("expect.to.be.an.instanceof", function () {

        var Person = function (name) {
            this.name = name;
        };

        var Dave = new Person('Dave');
        expect(Dave).to.be.an.instanceof(Person);
    });

    it("expect.to.match", function () {
        expect('A very naughty boy').to.match(/^A very/);
        expect('A very naughty boy').to.match(/boy$/);
    });

    it("expect.to.have.string", function () {
        expect('A very naughty boy').to.have.string("very");
    });

    it("expect.to.have.Property", function () {

        var obj = {foo: 'bar'};
        expect(obj).to.have.property('foo');
        expect(obj).to.have.property('foo', 'bar');

        // nested properties with deep
        var deepObj = {Name: {First: 'Luke', Last: "FooName"}};

        expect(deepObj).to.have.deep.property('Name.First', 'Luke');
    });

    it("expect.to.have.ownProperty", function () {
        expect('foo').to.have.ownProperty('length');
    });

    it("expect.to.have.ownPropertyDescriptor", function () {
        expect('foo').to.have.ownPropertyDescriptor('length');

        expect('foo').to.have.ownPropertyDescriptor('length', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 3
        });

        expect('foo').to.not.have.ownPropertyDescriptor('length', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 2
        });
    });

    it("expect.to.have.length.of", function () {
        expect([1, 2, 3]).to.have.length.of(3);
    });

    it("expect.to.throw", function () {
        expect(BadMethod).to.throw();
        expect(BadMethod).to.throw("FooBar");
        expect(BadMethod).to.throw(/ooB/);
        expect(BadMethod).to.throw(Error);
        expect(BadMethod).to.throw(Error, "FooBar");
        expect(BadMethod).to.throw(Error, /ooB/);
    });

    it("expect.to.not.throw", function () {
        expect(BadMethod).to.not.throw('Another message');
        expect(BadMethod).to.not.throw(String);
    });

    it("expect.to.be.within", function () {
        expect(one).to.be.within(0.3, 1.2);
        expect("hello").to.have.length.within(2, 5);
    });

    it("expect.to.have.members", function () {
        expect([1, 2, 3]).to.have.members([2, 1, 3]);
        expect([{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}]).to.have.deep.members([{Name: "Jom"}, {Name: "Jam"}, {Name: "Jim"}]);
    });

    it("expect.to.includeMembers", function () {
        expect([1, 2, 3]).to.include.members([2, 1]);
        expect([{Name: "Jim"}, {Name: "Jam"}, {Name: "Jom"}]).to.include.deep.members([{Name: "Jom"}, {Name: "Jam"}]);
    });

    it("expect.to.be.oneOf", function () {
        expect(one).to.be.oneOf([2, 1]);
    });

    it("expect.to.[have/contains].[all/any.keys]", function () {

        var myObject = {Name: "Luke", Age: 37};

        expect(myObject).to.have.any.keys('Name', 'baz');
        expect(myObject).to.have.any.keys('Name');
        expect(myObject).to.contain.any.keys('Name', 'Size');
        expect(myObject).to.contain.any.keys(['Name']);
        expect(myObject).to.contain.any.keys({'Name': "Jim"});
        expect(myObject).to.have.all.keys(['Name', 'Age']);
        expect(myObject).to.have.all.keys({'Name': true, 'Age': false});
        expect(myObject).to.contain.all.keys(['Name', 'Age']);
        expect(myObject).to.contain.all.keys({'Name': 6});
    });

    it("expect.to.change", function () {
        var foo = {isHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };

        expect(setIsHit).to.change(foo, 'isHit');
    });

    it("expect.to.not.change", function () {
        var foo = {isHit: false, isNotHit: false};
        var setIsHit = function () {
            foo.isHit = true;
        };
        expect(setIsHit).to.not.change(foo, 'isNotHit');
    });

    it("expect.to.change", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };
        expect(incrementCount).to.change(foo, 'count');
    });

    it("expect.to.not.increases", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };
        expect(decrementCount).to.not.increases(foo, 'count');
    });

    it("expect.to.decreases", function () {
        var foo = {count: 1};
        var decrementCount = function () {
            foo.count -= 1;
        };

        expect(decrementCount).to.decrease(foo, 'count');
    });

    it("expect.to.not.decreases", function () {
        var foo = {count: 1};
        var incrementCount = function () {
            foo.count += 1;
        };

        expect(incrementCount).to.not.decreases(foo, 'count');
    });

    it("expect.to.be.extensible", function () {
        var myobject = {};
        expect(myobject).to.be.extensible;
    });

    it("expect.to.not.be.extensible", function () {
        var sealedObject = Object.seal({});
        var nonExtensibleObject = Object.preventExtensions({});

        expect(sealedObject).to.not.be.extensible;
        expect(nonExtensibleObject).to.not.be.extensible;
    });

    it("expect.to.be.sealed", function () {
        var sealedObject = Object.seal({});
        expect(sealedObject).to.be.sealed;
    });

    it("expect.to.not.be.sealed", function () {
        var myobject = {};
        expect(myobject).to.not.be.sealed;
    });

    it("expect.to.satisfy", function () {
        expect(one).to.satisfy(function (x) {
            return x === 1;
        });
    });

    it("expect.to.respondTo", function () {

        function Foo() {
        }

        Foo.bar = function () {
        };

        Foo.prototype.moo = function () {
        };

        expect(Foo).to.not.respondTo('bar');
        expect(Foo).to.respondTo('moo');
    });

    it("expect.to.itself.respondTo", function () {

        function Foo() {
        }

        Foo.bar = function () {
        };

        Foo.prototype.moo = function () {
        };

        expect(Foo).to.itself.to.respondTo('bar');
        expect(Foo).to.itself.not.to.respondTo('moo');
    });
});