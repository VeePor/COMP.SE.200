/*
positive:
([4,8], square) -> [16,64]
([0,0], square) -> [0,0]
(["nic","olas","kiv","elä"], add) -> ["nicolaskivelä"]
negative:
([], square) -> []
(["a","b","c"], square)-> NaN
([1,2,3,4,5], plus(nonexisted func)) -> NaN
*/
import map from "../src/map.js";

describe("map() — Positive Cases", () => {

    test("maps numbers using square function", () => {
        const input = [4, 8];
        const square = (n) => n * n;

        const result = map(input, square);

        expect(result).toEqual([16, 64]);
    });

    test("maps zeros using square function", () => {
        const input = [0, 0];
        const square = (n) => n * n;

        const result = map(input, square);

        expect(result).toEqual([0, 0]);
    });
    test("maps string parts to capitalized form", () => {
        const input = ["nic", "olas", "kiv", "elä"];
        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

        const result = map(input, capitalize);

        expect(result).toEqual(["Nic", "Olas", "Kiv", "Elä"]);
    });

});


describe("map() — Negative Cases", () => {

    test("returns empty array when input array is empty", () => {
        const input = [];
        const square = (n) => n * n;

        const result = map(input, square);

        expect(result).toEqual([]);
    });

    test('mapping non-numeric function "square" to string array produces NaN values', () => {
        const input = ["a", "b", "c"];
        const square = (n) => n * n; // returns NaN for strings

        const result = map(input, square);

        // Expect each element to be NaN
        result.forEach(value => expect(value).toBeNaN());
    });

    test("using non-existing function should return NaN for each element", () => {
        const input = [1, 2, 3, 4, 5];

        const nonExistent = undefined; // simulates missing function

        const result = map(input, nonExistent);

        result.forEach(value => expect(value).toBeNaN());
    });

});
