/* global describe, it, expect, jasmine, expect, spyOnEvent, $*/

describe("Testing jQuery events with Jasmine-jQuery", function () {
    "use strict";

    it("spyOnEvent(element, event) allows spying on jQuery events", function () {

        jasmine.getFixtures().set("<a id='submitButton'>Submit</a>");

        var spyEvent = spyOnEvent('#submitButton', 'click');

        $('#submitButton').click();

        expect('click').toHaveBeenTriggeredOn('#submitButton');
        expect(spyEvent).toHaveBeenTriggered();
    });
});