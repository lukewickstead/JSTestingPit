/* global describe, it, beforeEach, expect, afterEach, $*/

describe("Jasmine allows testing the DOM", function () {
    "use strict";

    var templateId = "#TestHtml-Template";
    var resultId = "#ResultDiv";

    beforeEach(function () {
        // Set up the DOM
        $("body").append($(templateId).html().replace('-Template', ''));
    });

    afterEach(function () {
        // Reset the DOM
        $(resultId).remove();
    });

    it("which includes using libraries such as jQuery", function () {
        $(resultId).html("jQuery");
        expect($(resultId).text()).toBe("jQuery");
    });
});
