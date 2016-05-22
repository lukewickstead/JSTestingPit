/* global $, describe, it, expect, beforeEach, afterEach, sinon, requestStatus */

function getFoo(fooId, callback) {
    "use strict";

    $.ajax({
        url: "/foo/" + fooId,
        success: function (data) {
            callback(data);
        }
    });
}

describe("sinon.useFakeXMLHttpRequest can be used to stub and manipulate server requests", function () {
    "use strict";


    beforeEach(function() {

        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];

        this.xhr.onCreate = function (xhr) {
            // We are basically just catching and saving the request. We respond to them below with the respond method
            requests.push(xhr);
        };
    });

    afterEach(function () {

        // Important to restore XmlHttpRequest object within the browser once we are done with our test
        this.xhr.restore();
    });

    it("request.respond(status, headers, body); is used to stub the request once it has been caught by the fake server", function () {

        var callback = sinon.spy();

        getFoo(1, callback);

        expect(this.requests.length).toBe(1);

        this.requests[0].respond(200, { "Content-Type": "application/json" }, '{ "id": 1, "Name": "McFoo" }');

        expect(callback.calledOnce).toBe(true);
        expect(callback.calledWith({ "id": 1, "Name": "McFoo" })).toBe(true);
    });

    it("FakeXMLHttpRequest has a number of properties we can use to test against", function () {

        var callback = sinon.spy();

        getFoo(1, callback);

        expect(this.requests.length).toBe(1);

        expect(this.requests[0].url).toBe("/foo/1");
        expect(this.requests[0].method).toBe("GET");
        expect(this.requests[0].requestHeaders).toEqual({ Accept: '*/*', "X-Requested-With": 'XMLHttpRequest' });
        expect(this.requests[0].requestBody).toBe(null);
        expect(this.requests[0].requestStatus).toBe(undefined);
        expect(this.requests[0].statusText).toBe('');
        expect(this.requests[0].getAllResponseHeaders()).toBe('');

        this.requests[0].respond(200, { "Content-Type": "application/json" }, '{ "id": 1, "Name": "McFoo" }');

        expect(this.requests[0].requestStatus).toBe(undefined);
        expect(this.requests[0].statusText).toBe("OK");

        expect(this.requests[0].getResponseHeader("Content-Type")).toBe("application/json");
        // expect(this.requests[0].getAllResponseHeaders().replace("\n", "")).toEqual("Content-Type: application/json");
    });
});