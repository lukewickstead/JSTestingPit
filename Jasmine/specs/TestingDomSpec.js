/* global describe, it, beforeEach, expect, afterEach, $*/

describe("DOM Testing", function () {
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

    it("can touch touch the DOM and test this", function () {
        $(resultId).html("jQuery");
        expect($(resultId).text()).toBe("jQuery");
    });
});
