/* 
Positive tests:
(NICOLAS) -> Nicolas
Veeti -> Veeti
veeti -> Veeti
veetI -> Veeti
vEETI -> Veeti
NICOLASSSS -> Nicolassss
"123456" -> "123456"
"1Nicolas" -> 1nicolas

Negative tests:
123456 -> Error not string
undefined -> error
_nicolas -> Nicolas
" nicolas" -> "Nicolas"
xxxxxxx-> Xxxxxxx
*/

import capitalize from "../src/capitalize.js";


describe("capitalize() — Positive Cases", () => {
    test.each([
        ["NICOLAS", "Nicolas"],
        ["Veeti", "Veeti"],
        ["veeti", "Veeti"],
        ["veetI", "Veeti"],
        ["vEETI", "Veeti"],
        ["NICOLASSSS", "Nicolassss"],
        ["123456", "123456"],
        ["1Nicolas", "1nicolas"],
        ["_nicolas", "Nicolas"],
        [" nicolas", "Nicolas"],
        ["xxxxxxx", "Xxxxxxx"]
    ])("capitalize('%s') -> '%s'", (input, expected) => {
        expect(capitalize(input)).toBe(expected);
    });
});


describe("capitalize() — Negative Cases (Should Throw)", () => {
    test.each([
        [123456],
        [undefined]
    ])("capitalize(%p) should throw an error", (input) => {
        expect(() => capitalize(input)).toThrow();
    });
});


