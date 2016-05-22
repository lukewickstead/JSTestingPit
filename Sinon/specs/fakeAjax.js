/* global $, describe, it, expect, afterEach, jasmine, toBeCustom, sinon, callXTimes, assert */

function getFoo(fooId, callback) {
    "use strict";
    
    $.ajax({
        url: "/foo/" + fooId,
        success: function (data) {
            callback(null, data);
        }
    });
}

describe("Sinon can be used to fake ajax by implementing a stub upon ajax method of jquery", function () {
    "use strict";

    afterEach(function () {
        $.ajax.restore();
    });

    it("can stub ajax", function () {

        sinon.stub($, "ajax");

        getFoo(2, sinon.spy());

        expect($.ajax.calledWithMatch({url: "/foo/2"})).toBeTruthy();
    });
});