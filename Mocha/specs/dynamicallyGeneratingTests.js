/* global chai, describe, it */

var expect = chai.expect;

Number.prototype.square = function () {
    "use strict";

    return this * this;
};


describe('Dynamically generating tests', function () {
    "use strict";

    var tests = [
        {arg: 1, expected: 1},
        {arg: 2, expected: 4},
        {arg: 3, expected: 9}
    ];

    tests.forEach(function (test) {
        it('correctly squares ' + test.arg + ' to equal ' + test.expected, function () {

            expect(test.arg.square()).to.eq(test.expected);
        });
    });
});

