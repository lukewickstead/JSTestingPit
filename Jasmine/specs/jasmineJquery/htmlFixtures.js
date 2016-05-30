/* global describe, it, expect, jasmine, expect, setFixtures, sandbox, $*/

describe("Testing the DOM with Jasmine-jQuery", function () {
    "use strict";

    it("loadFixture('fixture.html') allows loading an external html snippet into the DOM", function () {

        jasmine.getFixtures().fixturesPath = '/JSTestingPit/Jasmine/specs/jasmineJquery/fixtures/';
        jasmine.getFixtures().load("sampleHtmlFixture.html");

        expect($('#MyIdInTestFixture')).toBeInDOM();
    });

    it("set('') allows loading a html segment into the DOM", function () {

        var fixture = jasmine.getFixtures().set("<div id='divSetWithSet'>This is some sample text.</div>");

        expect($('#divSetWithSet')).toBeInDOM();

        expect(fixture.find('#divSetWithSet')).toBeInDOM();
    });

    it("sandbox('') allows loading a html segment into the DOM without polluting your code with html strings", function () {

        var sandboxEntry = sandbox({
            id: 'sandboxEntry',
            class: 'foo'
        });

        setFixtures(sandboxEntry);

        var domElement = $('#sandboxEntry');

        expect(domElement ).toBeInDOM();
        expect(domElement ).toHaveClass('foo');
    });
});