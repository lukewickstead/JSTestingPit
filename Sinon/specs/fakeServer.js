/* global $, describe, it, expect, beforeEach, afterEach, sinon */

function getFoo(fooId, callback) {
    "use strict";

    $.ajax({
        url: "/foo/" + fooId,
        success: function (data) {
            callback(data);
        }
    });
}

describe("Fake servers, created by sinon.fakeServer.create, are like sinon.useFakeXMLHttpRequest but allow a simpler but less powerfully interface", function () {
    "use strict";

    var server;

    beforeEach(function() {
        this.server = sinon.fakeServer.create();
    });

    afterEach(function () {
        // Important to restore the fake server object once we are done with our test
        this.server.restore();
    });

    it("request.respond(status, headers, body) is used to stub the request once it has been caught by the fake server", function () {

        var callback = sinon.spy();

        getFoo(1, callback);

        this.server.requests[0].respond(200, { "Content-Type": "application/json" }, '{ "id": 1, "Name": "McFoo" }');


        expect(callback.calledOnce).toBe(true);
        expect(callback.calledWith({ "id": 1, "Name": "McFoo" })).toBe(true);
    });

    it("server.respondWith(string))is used to stub the next response body request caught by the fake server", function () {

        var callback = sinon.spy();

        this.server.respondWith('"<html></html>');

        getFoo(1, callback);

        this.server.respond(); // responds all queued requests

        expect(callback.calledOnce).toBe(true);
    });

    it("server.respondWith([status, header, response]))is used to stub the next response caught by the fake server", function () {

        var callback = sinon.spy();

        this.server.respondWith([200, { "Content-Type": "application/json" }, '{ "id": 1, "Name": "McFoo" }']);

        getFoo(1, callback);

        this.server.respond(); // responds all queued requests

        expect(callback.calledOnce).toBe(true);
        expect(callback.calledWith({ "id": 1, "Name": "McFoo" })).toBe(true);
    });

    it("server.respondWith(method, urlRegExp, response), where response is an array of (status, headers, body), is used to stub the next matching request caught by the fake server", function () {

        var callback = sinon.spy();

        this.server.respondWith("GET", "/foo/1", [200, { "Content-Type": "application/json" }, '{ "id": 1, "Name": "McFoo" }']);

        getFoo(1, callback);

        this.server.respond();

        expect(callback.calledOnce).toBe(true);
        expect(callback.calledWith({ "id": 1, "Name": "McFoo" })).toBe(true);
    });
});