/* global chai, console, suite, test, suiteSetup, suiteTeardown, setup, teardown*/

// The TDD interface provides suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown():

var expect = chai.expect;

suite('Suite defines a TDD style test fixture', function() {
    "use strict";

    suiteSetup(function() {
        // runs before all tests in the fixture and all nested fixtures
        console.log("Inside before");
    });

    suiteTeardown(function() {
        // runs after all tests in the fixture and all nested fixtures
        console.log("Inside after");
    });

    setup(function() {
        // runs before each test in the fixture and all nested fixtures
        console.log("Inside beforeEach");
    });

    teardown(function() {
        // runs after each test in the fixture and all nested fixtures
        console.log("Inside afterEach");
    });

    test('test is used to define a BDD style test', function () {
        expect(1).to.equal(1);
        console.log("** Inside test **");

    });

    suite('Nested test fixture', function () {

        suiteSetup(function() {
            // runs before all tests in the fixture
            console.log("   Inside nested before");
        });

        suiteTeardown(function() {
            // runs after all tests in the fixture
            console.log("   Inside nested after");
        });

        setup(function() {
            // runs before each test in the fixture
            console.log("   Inside nested beforeEach");
        });

        teardown(function() {
            // runs after each test in the fixture
            console.log("   Inside nested afterEach");
        });

        test('Test in a nested fixture', function () {
            expect(1).to.equal(1);
            console.log("   ** Inside nested test **");
        });
    });
});