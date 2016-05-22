/* global QUnit, assert, ok, test, assert */

QUnit.module('QUnit allows creating your own custom assertion methods', {});

QUnit.assert.greaterThanOrEqualTo = function( actualValue, comparisonValue, message ) {
    "use strict";

    this.pushResult( {
        result: actualValue >= comparisonValue,
        actual: actualValue,
        expected: comparisonValue,
        message: message
    } );
};

QUnit.test('QUnit.assert.greaterThanOrEqualTo is a custom matcher', function () {
    "use strict";

    QUnit.assert.greaterThanOrEqualTo(2, 1, "2 is greater than or equal to 1");
    QUnit.assert.greaterThanOrEqualTo(10, 10, "10 is greater than or equal to 10");
});
