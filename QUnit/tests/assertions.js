/* global QUnit, assert, ok, test, assert */

QUnit.module('QUnit provides a number of built in assertion methods', {});

QUnit.test('assert.ok asserts that a variable or expression is true', function (assert) {
    "use strict";
    assert.ok(true);
    assert.ok(true === true);
});

QUnit.test('assert.notOk asserts that a variable or expression is false', function (assert) {
    "use strict";
    assert.notOk(false);
    assert.notOk(false === true);
});

QUnit.test("assert.equal asserts two variables are equal using == and not === notation", function (assert) {
    "use strict";

    assert.equal(1, 1, "1 is equal to 1");
    assert.equal(1, "1", "1 is equal to '1'");
});

QUnit.test("assert.notEqual asserts two variables are not equal using == and not === notation", function (assert) {
    "use strict";

    assert.notEqual(1, 2, "1 is not equal to 2");
    assert.notEqual(1, "2", "1 is not equal to '2'");
});

QUnit.test("assert.strictEqual asserts two variables are equal using === and not == notation", function (assert) {
    "use strict";

    assert.strictEqual(1, 1, "1 is equal to 1");
});

QUnit.test("assert.notStrictEqual asserts two variables are not equal using === and not == notation", function (assert) {
    "use strict";

    assert.notStrictEqual(1, "1", "1 is not equal to '1'");
});

QUnit.test("assert.deepEqual traverses properties of the objects to ensure they are all equal", function (assert) {
    "use strict";

    var obj = {foo: "moo"};

    assert.deepEqual(obj, {foo: "moo"}, "Two objects are equal to each other");
});

QUnit.test("assert.notDepEqual traverses properties of the objects to ensure they are not all equal", function (assert) {
    "use strict";

    var obj = {foo: "moo"};

    assert.notDeepEqual(obj, {foo: "do"}, "The two objects are not equal to each other");
});

QUnit.test("assert.propEqual asserts two objects are equal, but they can have a different constructor", function (assert) {
    "use strict";

    assert.propEqual({foo: "moo"}, {foo: "moo"}, "The two objects are equal to each other.");
});

QUnit.test("assert.notPropEqual asserts two objects are equal, but they can have a different constructor", function (assert) {
    "use strict";

    assert.notPropEqual({foo: "moo"}, {foo: "do"}, "The two objects are not equal to each other.");
});

QUnit.test("assert.throws can be used to assert the an error was thrown", function (assert) {
    "use strict";

    function MyError(message) {
        this.message = message;
    }

    MyError.prototype.toString = function () {
        return this.message;
    };

    assert.throws(
        function () {
            throw "error";
        },
        "An error was thrown and caught as expected"
    );

    assert.throws(
        function () {
            throw new MyError("ohh noo!!!!");
        },
        /no/,
        "An error was caught whose error message contains 'no'"
    );

    assert.throws(
        function () {
            throw new MyError();
        },
        MyError,
        "A MyError error was raised and caught"
    );

    assert.throws(
        function () {
            throw new MyError("Ohh no!!!!");
        },
        new MyError("Ohh no!!!!"),
        "A MyError was raised and caught with a specific error message of 'Ohh no!!!!'"
    );

    assert.throws(
        function () {
            throw new MyError("Ohh no!!!!");
        },
        function (err) {
            return err.toString() === "Ohh no!!!!";
        },
        "A MyError was raised and caught with a specific error message of 'Ohh no!!!!' determined by a function which ensured the error was as expected"
    );
});
