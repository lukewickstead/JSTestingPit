/* global chai, describe, it, specify, before, after, beforeEach, afterEach, console */

before(function() {
    "use strict";
    // runs before all tests being called in the runner page
    console.log("**ROOT** Inside before");
});

after(function() {
    "use strict";
    // runs after all tests being called in the runner page
    console.log("**ROOT** Inside after");
});

beforeEach(function() {
    "use strict";
    // runs before each test being called in the runner page
    console.log("**ROOT** Inside beforeEach");
});

afterEach(function() {
    "use strict";
    // runs after each test being called in the runner page
    console.log("**ROOT** Inside afterEach");
});

