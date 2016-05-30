/* global describe, it, expect, jasmine, expect, setFixtures, sandbox, $, getJSONFixture, getJSONFixtures*/

describe("Testing JSON with Jasmine-jQuery", function () {
    "use strict";

    it("getJSONFixture('fixture.json') allows loading an external json ", function () {

        jasmine.getJSONFixtures().fixturesPath = '/JSTestingPit/Jasmine/specs/jasmineJquery/fixtures/';
        var data = getJSONFixture("sampleJsonFixture.json");

        expect(data.FirstName).toEqual("Sir");
    });
});