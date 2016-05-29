/* global chai, describe, it, specify, before, after, beforeEach, afterEach, console */

// The BDD interface provides describe(), context(), it(), specify(), before(), after(), beforeEach(), and afterEach().
// context is an alias for describe, specify is an alias for it and exist to aid in readability

var expect = chai.expect;

describe('describe() defines a BDD style test fixture', function() {
    "use strict";

    before(function() {
        // runs before all tests in the fixture and all nested fixtures
        console.log("Inside before");
    });

    after(function() {
        // runs after all tests in the fixture and all nested fixtures
        console.log("Inside after");
    });

    beforeEach(function() {
        // runs before each test in the fixture and all nested fixtures
        console.log("Inside beforeEach");
    });

    afterEach(function() {
        // runs after each test in the fixture and all nested fixtures
        console.log("Inside afterEach");
    });

    it('it() defines a BDD style test', function () {
        expect(1).to.equal(1);
        console.log("** Inside test **");

    });

    describe('Nested test fixture', function () {

        before(function() {
            // runs before all tests in the fixture
            console.log("   Inside nested before");
        });

        after(function() {
            // runs after all tests in the fixture
            console.log("   Inside nested after");
        });

        beforeEach(function() {
            // runs before each test in the fixture
            console.log("   Inside nested beforeEach");
        });

        afterEach(function() {
            // runs after each test in the fixture
            console.log("   Inside nested afterEach");
        });

        it('Test in a nested fixture', function () {
            expect(1).to.equal(1);
            console.log("   ** Inside nested test **");
        });
    });
});