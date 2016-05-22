/* global QUnit, assert, ok, test, assert */

QUnit.module('QUnit.module is called to start a new test module', {
});

QUnit.test('all subsequent calls to QUnit.test are defined within the module', function(assert) {
    "use strict";
    assert.ok(true);
});

QUnit.test('all subsequent calls to QUnit.test are defined within the module', function(assert) {
    "use strict";
    assert.ok(true);
});


QUnit.module('QUnit.module can contain setup and teardown methods which are called before and after each test in a module', {
    setup: function() {
        "use strict";
        this.counter =1;
    },
    teardown: function() {
        "use strict";
        this.counter = 0;
    }
});

QUnit.test('', function(assert) {
    "use strict";

    assert.equal(1, this.counter);
    assert.ok(true);
});