/*
positive tests:
1/1 -> 1
20/20 -> 1
600/600 -> 1
1000000/1000000-> 1
-20/-20 -> 1
0.5/0.5 -> 1

1/2 -> 1/2
1/10 -> 0.1
1/100 -> 0.01
10/-50 -> -0.20

-100/10 -> -10
100/-10 -> -10

20/200000 -> 0.00001
200000 / 20 -> 10000

1/10000000000000 -> 0
Negative tests:
10/0 -> Error
0/0-> Error
undefined/undefined = -> Error
string/10 -> Error
10/string -> Error
"100"/"100"-> Error
*/
import divide from "../../src/divide.js"

describe("divide() — Positive Cases", () => {
    test.each([
        // Exact 1 results
        [1, 1, 1],
        [20, 20, 1],
        [600, 600, 1],
        [1000000, 1000000, 1],
        [-20, -20, 1],
        [0.5, 0.5, 1],

        [2,1,2],
        [20,5,4],
        [100000,10,10000],
        // Fractions & decimals
        [1, 2, 0.5],
        [1, 10, 0.1],
        [1, 100, 0.01],
        [10, -50, -0.2],

        // Negatives dividing positives
        [-100, 10, -10],
        [100, -10, -10],

        // Very small decimal results
        [20, 200000, 0.0001],
        [200000, 20, 10000],

        // Extremely tiny result (1 / 10^13 → ~0)
        [1, 10000000000000, 0]
    ])("divide(%p, %p) = %p", (a, b, expected) => {
        expect(divide(a, b)).toBeCloseTo(expected);
    });
});


describe("divide() — Negative Cases (Errors)", () => {
    test.each([
        [10, 0],              // divide by zero
        [0, 0],               // undefined case
        [undefined, undefined], // missing inputs
        ["string", 10],       // bad type
        [10, "string"],       // bad type
        ["100", "100"],       // string numbers not allowed
    ])("divide(%p, %p) should throw", (a, b) => {
        expect(divide(a, b)).toBeNaN();
    });
});