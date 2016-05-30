/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn, north, east, south, west */

describe("spyOn can be used to create a spy which replaces a function and allows determination if it was called as intended", function () {
    "use strict";

    var foo;

    beforeAll(function () {
        foo = {
            functionToSpyOn: function (valueOne, valueTwo) {
            },
            functionToSpyOnButNotCalled: function () {
            },
            stubbedFunction: function () {
            },
            calledWithAFake: function () {
            },
            calledAsThrough: function () {
                return true;
            },
            calledWithThrow: function () {
            }
        };
    });

    beforeEach(function () {
        spyOn(foo, 'functionToSpyOn');
        spyOn(foo, 'functionToSpyOnButNotCalled');
        spyOn(foo, 'calledAsThrough').and.callThrough();
        spyOn(foo, 'stubbedFunction').and.returnValue(true);
        spyOn(foo, 'calledWithThrow').and.throwError("Error");
        spyOn(foo, 'calledWithAFake').and.callFake(function () {
            return true;
        });
    });

    it("toHaveBeenCalled validates that a function was called", function () {
        foo.functionToSpyOn(1);

        expect(foo.functionToSpyOn).toHaveBeenCalled();

        // Negation
        expect(foo.functionToSpyOnButNotCalled).not.toHaveBeenCalled();
    });

    it("toHaveBeenCalledTimes validates that a function was called x times", function () {
        foo.functionToSpyOn(1);
        foo.functionToSpyOn(2, 3);

        expect(foo.functionToSpyOn).toHaveBeenCalledTimes(2);

        // Negation
        expect(foo.functionToSpyOn).not.toHaveBeenCalledTimes(1);
        expect(foo.functionToSpyOn).not.toHaveBeenCalledTimes(3);
    });

    it("toHaveBeenCalledWith validates that a function was called with certain parameters", function () {
        foo.functionToSpyOn(1);
        foo.functionToSpyOn(2, 3);

        expect(foo.functionToSpyOn).toHaveBeenCalledWith(1);
        expect(foo.functionToSpyOn).toHaveBeenCalledWith(2, 3);

        // Negation
        expect(foo.functionToSpyOn).not.toHaveBeenCalledWith(2);

    });

    it('and.returnValue can be used to stub return data', function () {
        expect(foo.stubbedFunction()).toEqual(true);
        expect(foo.stubbedFunction()).not.toEqual(false);
    });

    it('and.CallFake can be used to call an additional function at the same time', function () {
        expect(foo.calledWithAFake()).toEqual(true);
    });

    it('and.callThrough can be used to spy on a function and delegate the call to that function', function () {
        expect(foo.calledAsThrough()).toEqual(true);
    });

    it('and.throwError can be used to mock an exception being thrown', function () {

        try {
            foo.calledWithThrow();
        } catch (ex) {
            expect(ex.message).toEqual("Error");
        }
    });

    describe("calls can be used to assert if and how the spy was called", function () {

        it("calls.Count which returns the number of times called", function () {

            foo.functionToSpyOn(1);
            foo.functionToSpyOn(2, 3);

            expect(foo.functionToSpyOn.calls.count()).toEqual(2);
        });

        it("calls.any can be used to determine if the function was called any number of times", function () {

            foo.functionToSpyOn(1);
            expect(foo.functionToSpyOn.calls.any()).toEqual(true);
        });

        it("calls.reset can be used to clear the calls", function () {

            foo.functionToSpyOn(1);
            expect(foo.functionToSpyOn.calls.any()).toEqual(true);

            foo.functionToSpyOn.calls.reset();
            expect(foo.functionToSpyOn.calls.any()).toEqual(false);
        });


        it("calls.argsFor can be used assert upon the arguments of each call", function () {

            foo.functionToSpyOn(1);
            foo.functionToSpyOn(2, 3);

            expect(foo.functionToSpyOn.calls.argsFor(0)).toEqual([1]);
            expect(foo.functionToSpyOn.calls.argsFor(1)).toEqual([2, 3]);
        });

        it("calls.allArgs can be used assert upon the arguments of each call", function () {

            foo.functionToSpyOn(1);
            foo.functionToSpyOn(2, 3);

            expect(foo.functionToSpyOn.calls.allArgs()).toEqual([[1], [2, 3]]);
        });

        it("calls.first can be used to return the context for the first call", function () {

            foo.functionToSpyOn(1);
            foo.functionToSpyOn(2, 3);

            expect(foo.functionToSpyOn.calls.first()).toEqual({object: foo, args: [1], returnValue: undefined});
        });

        it("calls.mostRecent can be used to return the context for the last call", function () {

            foo.functionToSpyOn(1);
            foo.functionToSpyOn(2, 3);

            expect(foo.functionToSpyOn.calls.mostRecent().object).toBe(foo);
            expect(foo.functionToSpyOn.calls.mostRecent().args).toEqual([2, 3]);
            expect(foo.functionToSpyOn.calls.mostRecent()).toEqual({object: foo, args: [2, 3], returnValue: undefined});
        });
    });
});