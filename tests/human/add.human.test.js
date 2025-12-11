import add from "../../src/add.js";

describe("Valid additions", () => {
    test.each([
        [0, 0, 0],
        [10000000, 100000000, 110000000],
        [3, 4, 7],
        [4, 4, 8],
        [100, 200, 300],
        [1000, 1000, 2000],
        [4000, 3000, 7000],
        [27, 48, 75],
        [4.1, 4.1, 8.2],
        [1.12, 2.34, 3.46],
    ])("%p + %p = %p", (a, b, expected) => {
        expect(add(a, b)).toBeCloseTo(expected);
    });
});

describe("Invalid additions (should throw)", () => {
    test.each([
        [1, -1],
        ["3", "4"],
        [null, null],
        [-27, -48],
        [-4.1, -4.1],
        [undefined, undefined],  // empty input case
    ])("add(%p, %p) should throw an error", (a, b) => {
        expect(() => add(a, b)).toThrow();
    });
});