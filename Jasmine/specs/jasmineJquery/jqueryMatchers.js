/* global describe, it, beforeEach, expect, afterEach, $*/

describe("Jasmine-jQuery is a third party library which has many jquery style matchers", function () {
    "use strict";

    it("toBeChecked() asserts a checkbox input is checked", function () {
        expect($('<input id="myCheckbox" type="checkbox" checked="checked"/>')).toBeChecked();
        expect($('<input id="myCheckbox" type="checkbox"/>')).not.toBeChecked();
    });

    it("toBeDisabled() asserts am element is disabled", function () {
        expect($('<input id="myCheckbox" type="checkbox" checked="checked" disabled="disabled"/>')).toBeDisabled();
        expect($('<input id="myCheckbox" type="checkbox"/>')).not.toBeDisabled();
    });

    it("toBeEmpty() asserts am element has a value of '' or has no child elements", function () {
        expect($('<input id="name" type="text" />')).toBeEmpty();
        expect($('<div id="myDiv"></div>')).toBeEmpty();
        expect($('<div id="myDiv"><input id="name" type="text" /></div>')).not.toBeEmpty();
        expect($('<div id="myDiv">This is also not empty</div>')).not.toBeEmpty();
    });

    it("toBeFocused() asserts am element has focus", function () {
        expect($('<input id="myCheckbox" type="checkbox"/>')).not.toBeFocused();
    });

    it("toBeHidden() asserts an element is hidden", function () {

        var myDiv = $('#ResultDiv');
        expect(myDiv).not.toBeHidden();

        myDiv.hide();

        expect(myDiv).toBeHidden();

        myDiv.show();
    });

    it("toBeInDOM() asserts an element is within the DOM", function () {

        expect($('#ResultDiv')).toBeInDOM();
        expect($('<div></div>')).not.toBeInDOM();
    });

    it("toBeMatchedBy() asserts a CSS selector is matched ", function () {
        expect($('<span></span>')).not.toBeMatchedBy('.myClass');
        expect($('<span class="myClass"></span>')).toBeMatchedBy('.myClass');

        expect($('<span></span>')).toBeMatchedBy('span');
        expect($('<span class="myClass" id = "myLongId"></span>')).toBeMatchedBy('span.myClass[id^=myLong]');
    });

    it("toBeSelected() asserts an option is selected", function () {
        expect($('<option selected="selected">Option One</option>')).toBeSelected();
        expect($('<option>Option Two</option>')).not.toBeSelected();
    });

    it("toBeVisible() asserts an element is visible", function () {

        var myDiv = $('#ResultDiv');

        expect(myDiv).toBeVisible();

        myDiv.hide();
        expect(myDiv).not.toBeVisible();

        myDiv.show();
    });

    it("toContain() asserts a string is found within an element", function () {
        expect($('<div><span class="myClass"></span></div>')).toContain('div');
    });

    it("toContainElement() asserts an element is contained within another", function () {
        expect($('<div><span class="myClass"></span></div>')).toContainElement('span.myClass');
    });

    it("toContainHtml() asserts a html string is found within an element", function () {
        expect($('<div><span class="myClass"></span></div>')).toContainHtml('<span class="myClass"></span>');
    });

    it("toContainText() asserts a string is found within an element", function () {
        expect($('<div>How does god look to you now Bob!</div>')).toContainText('look');
    });

    it("toEqual() asserts a jquery selector can be used to pick up the item", function () {
        expect($('<div id="foo"></div>')).toEqual('div#foo');
        expect($('<div class="foo"></div>')).toEqual('div.foo');
    });

    it("toExist() asserts an element exists in or out of the DOM", function () {
        expect($('<div id="foo"></div>')).toExist();
    });

    it("toHandle() asserts if an element handles an event", function () {
        // expect($('form')).toHandle("submit");
    });

    it("toHandleWith() asserts if an element handles an event with a callback", function () {
        // expect($('form')).toHandle("submit", 'callBack');
    });

    it("toHaveAttr() asserts if an element has an attribute set or set to a specific value set", function () {
        expect("<span id='myId'></span>").toHaveAttr("id");
        expect("<span id='myId'></span>").toHaveAttr("id", "myId");
    });

    it("toHaveClass() asserts if an element has a class", function () {
        expect($('<div class="myClass"></div>')).toHaveClass("myClass");
    });

    it("toHaveCss() asserts if an element has css set upon it", function () {
        expect($('<span style="color: red; background-color: black;"></img>')).toHaveCss({
            color: "red",
            "background-color": "black"
        });
    });

    it("toHaveHtml() asserts an element contains a html string", function () {
        expect($('<div><span></span></div>')).toHaveHtml('<span></span>');
    });

    it("toHaveId() asserts an element has an id as specified", function () {
        expect($('<div id="myId"></div>')).toHaveId("myId");
    });

    it("toHaveLength() asserts an element has a length as specified", function () {
        expect($('<option><option></option><option></option></select>')).toHaveLength(3);
    });

    it("toHaveText() asserts an element has an id as specified", function () {
        expect($('<div>Hello</div>')).toHaveText('Hello');
    });

    it("toHaveValue() asserts an element has a value as specified", function () {
        expect($('<input type="text" value="Hello"/>')).toHaveValue('Hello');
    });

    it("toHaveData() asserts an element has data attribute specified", function () {
        expect($('<div data-foo="moo"></div>')).toHaveData('foo');
        expect($('<div data-foo="moo"></div>')).toHaveData('foo', 'moo');
    });

    it("toHaveProp() asserts an element has data specified", function () {
        expect($('<div id="myId"></div>')).toHaveProp('id');
        expect($('<div id="myId"></div>')).toHaveProp('id', 'myId');
    });
});