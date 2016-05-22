/* global QUnit, $*/

QUnit.module('Testing the DOM is simple as manipulating the DOM we are running within', {
    setup: function() {
        "use strict";

        $("body").append("<div id='MyDiv'>Hello</div>");
    },
    teardown: function() {
        "use strict";

        $("#MyDiv").remove();
    }
});

QUnit.test('and then asserting the DOM smells like it should', function(assert) {
    "use strict";

    assert.equal($("#MyDiv").length, 1, "Found the correct number of DIVs");
});