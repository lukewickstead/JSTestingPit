/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn, north, east, south, west */

describe("spyOn can be used to create a spy which replaces a function and allows determination if it was called as intended", function () {
    "use strict";

    var foo;

    beforeAll(function () {
        foo = {
            FunctionToSpyOn: function (valueOne, valueTwo) {
            },
            FunctionToSpyOnButNotCalled: function () {
            },
            StubbedFunction: function () {
            },
            CalledWithAFake: function () {
            },
            CalledAsThrough: function () {
                return true;
            },
            CalledWithThrow: function () {
            }
        };
    });

    beforeEach(function () {
        spyOn(foo, 'FunctionToSpyOn');
        spyOn(foo, 'FunctionToSpyOnButNotCalled');
        spyOn(foo, 'CalledAsThrough').and.callThrough();
        spyOn(foo, 'StubbedFunction').and.returnValue(true);
        spyOn(foo, 'CalledWithThrow').and.throwError("Error");
        spyOn(foo, 'CalledWithAFake').and.callFake(function () {
            return true;
        });
    });

    it("toHaveBeenCalled validates that a function was called", function () {
        foo.FunctionToSpyOn(1);

        expect(foo.FunctionToSpyOn).toHaveBeenCalled();

        // Negation
        expect(foo.FunctionToSpyOnButNotCalled).not.toHaveBeenCalled();
    });

    it("toHaveBeenCalledTimes validates that a function was called x times", function () {
        foo.FunctionToSpyOn(1);
        foo.FunctionToSpyOn(2, 3);

        expect(foo.FunctionToSpyOn).toHaveBeenCalledTimes(2);

        // Negation
        expect(foo.FunctionToSpyOn).not.toHaveBeenCalledTimes(1);
        expect(foo.FunctionToSpyOn).not.toHaveBeenCalledTimes(3);
    });

    it("toHaveBeenCalledWith validates that a function was called with certain parameters", function () {
        foo.FunctionToSpyOn(1);
        foo.FunctionToSpyOn(2, 3);

        expect(foo.FunctionToSpyOn).toHaveBeenCalledWith(1);
        expect(foo.FunctionToSpyOn).toHaveBeenCalledWith(2, 3);

        // Negation
        expect(foo.FunctionToSpyOn).not.toHaveBeenCalledWith(2);

    });

    it('and.returnValue can be used to stub return data', function () {
        expect(foo.StubbedFunction()).toEqual(true);
        expect(foo.StubbedFunction()).not.toEqual(false);
    });

    it('and.CallFake can be used to call an additional function at the same time', function () {
        expect(foo.CalledWithAFake()).toEqual(true);
    });

    it('and.callThrough can be used to spy on a function and delegate the call to that function', function () {
        expect(foo.CalledAsThrough()).toEqual(true);
    });

    it('and.throwError can be used to mock an exception being thrown', function () {

        try {
            foo.CalledWithThrow();
        } catch (ex) {
            expect(ex.message).toEqual("Error");
        }
    });

    describe("calls can be used to assert if and how the spy was called", function () {

        it("calls.Count which returns the number of times called", function () {

            foo.FunctionToSpyOn(1);
            foo.FunctionToSpyOn(2, 3);

            expect(foo.FunctionToSpyOn.calls.count()).toEqual(2);
        });

        it("calls.any can be used to determine if the function was called any number of times", function () {

            foo.FunctionToSpyOn(1);
            expect(foo.FunctionToSpyOn.calls.any()).toEqual(true);
        });

        it("calls.reset can be used to clear the calls", function () {

            foo.FunctionToSpyOn(1);
            expect(foo.FunctionToSpyOn.calls.any()).toEqual(true);

            foo.FunctionToSpyOn.calls.reset();
            expect(foo.FunctionToSpyOn.calls.any()).toEqual(false);
        });


        it("calls.argsFor can be used assert upon the arguments of each call", function () {

            foo.FunctionToSpyOn(1);
            foo.FunctionToSpyOn(2, 3);

            expect(foo.FunctionToSpyOn.calls.argsFor(0)).toEqual([1]);
            expect(foo.FunctionToSpyOn.calls.argsFor(1)).toEqual([2, 3]);
        });

        it("calls.allArgs can be used assert upon the arguments of each call", function () {

            foo.FunctionToSpyOn(1);
            foo.FunctionToSpyOn(2, 3);

            expect(foo.FunctionToSpyOn.calls.allArgs()).toEqual([[1], [2, 3]]);
        });

        it("calls.first can be used to return the context for the first call", function () {

            foo.FunctionToSpyOn(1);
            foo.FunctionToSpyOn(2, 3);

            expect(foo.FunctionToSpyOn.calls.first()).toEqual({object: foo, args: [1], returnValue: undefined});
        });

        it("calls.mostRecent can be used to return the context for the last call", function () {

            foo.FunctionToSpyOn(1);
            foo.FunctionToSpyOn(2, 3);

            expect(foo.FunctionToSpyOn.calls.mostRecent().object).toBe(foo);
            expect(foo.FunctionToSpyOn.calls.mostRecent().args).toEqual([2, 3]);
            expect(foo.FunctionToSpyOn.calls.mostRecent()).toEqual({object: foo, args: [2, 3], returnValue: undefined});
        });
    });
});