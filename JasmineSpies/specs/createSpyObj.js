/* global describe, it, expect, beforeEach, afterEach, jasmine, toBeCustom, afterAll, beforeAll, spyOn */

describe("createSpyObj can be used to create a mock with multiople spies", function() {

    var move;

    beforeEach(function() {
        move = jasmine.createSpyObj('move', ['north', 'east', 'south', 'west']);

        move.north();
        move.east();
        move.south(10);
    });

    it("where each spy can asserted upon as before", function() {
        expect(move.north).toBeDefined();
        expect(move.east).toBeDefined();
        expect(move.south).toBeDefined();
        expect(move.west).toBeDefined();

        expect(move.north).toHaveBeenCalled();
        expect(move.east).toHaveBeenCalled();
        expect(move.south).toHaveBeenCalledWith(10);
        expect(move.west).not.toHaveBeenCalled();
    });
});