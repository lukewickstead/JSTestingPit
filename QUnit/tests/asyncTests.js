/* global QUnit, assert, ok, test, assert */

QUnit.module('assert.async() allows testing asynchronous calls', {});

QUnit.test('assert.async() will cause QUnit to not fail the test until the returned async object is called', function (assert) {
    "use strict";

    var done = assert.async();

    setTimeout(function() {
        assert.ok( true, "The callback from setTimeout has started" );
        done();
    }, 500 );
});

QUnit.test('You can have as many assert.async() as you like, you simply need to ensure all of them are called', function (assert) {
    "use strict";

    var done = assert.async();
    var anotherDone = assert.async();

    setTimeout(function() {
        assert.ok( true, "The callback from setTimeout has started" );
        done();
    }, 500 );

    setTimeout(function() {
        assert.ok( true, "The second callback from setTimeout has started" );
        anotherDone();
    }, 1000 );
});

QUnit.test('assert.async(n) is similar to multiple async() calls but requires n number of calls to that async object', function (assert) {
    "use strict";

    var done = assert.async(3);

    setTimeout(function() {
        assert.ok( true, "Strike one!" );
        done();
    }, 500 );


    setTimeout(function() {
        assert.ok( true, "Strike two!" );
        done();
    }, 500 );

    setTimeout(function() {
        assert.ok( true, "Strike three!" );
        done();
    }, 1000 );
});