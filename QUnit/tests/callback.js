/* global QUnit, console, begin, done, moduleStart, moduleDone */

QUnit.begin(function( details ) {
    "use strict";

    console.log("QUnit.begin is called when QUnit starts running.");
    console.log( "Test amount:", details.totalTests );
});

QUnit.done(function( details ) {
    "use strict";

    console.log("QUnit.done is called when QUnit finishes running.");
    console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
});

QUnit.moduleStart(function( details ) {
    "use strict";

    console.log("QUnit.moduleStart is called when QUnit starts testing a test module.");
    console.log( "Now running: ", details.name );
});

QUnit.moduleDone(function( details ) {
    "use strict";

    console.log("QUnit.moduleDone is called when QUnit finishes testing a test module.");
    console.log( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
});

QUnit.testStart(function( details ) {
    "use strict";

    console.log("QUnit.testStart is called when QUnit starts a test");
    console.log( "Now running: ", details.module, details.name );
});

QUnit.testDone(function( details ) {
    "use strict";

    console.log("QUnit.testDone is called when QUnit finishes a test");
    console.log( "Finished running: ", details.module, details.name, "Failed/total: ", details.failed, details.total, details.duration );
});

QUnit.log(function( details ) {
    "use strict";

    console.log("QUnit.log is called when an assert is called");
    console.log( "Log: ", details.result, details.message );
});