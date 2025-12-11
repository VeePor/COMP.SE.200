/*
positive:

([{ 'user': 'barney', 'active': true },{ 'user': 'fred',   'active': false }], ({active})) ->[{ 'user': 'barney', 'active': true }] 


negative:
[], ({active}) -> []

([{ 'user': 'barney', 'active': true },{ 'user': 'fred',   'active': false }], ({money})) ->[] 
*/
import filter from "../src/filter.js";

describe("filter() — Positive Cases", () => {
    test("filters users with active === true", () => {
        const input = [
            { user: "barney", active: true },
            { user: "fred", active: false }
        ];

        const result = filter(input, ({ active }) => active);

        expect(result).toEqual([
            { user: "barney", active: true }
        ]);
    });
});

describe("filter() — Negative Cases", () => {
    test("empty array returns empty array", () => {
        const result = filter([], ({ active }) => active);
        expect(result).toEqual([]);
    });

    test("predicate never matches → return empty array", () => {
        const input = [
            { user: "barney", active: true },
            { user: "fred", active: false }
        ];

        const result = filter(input, ({ money }) => money);
        expect(result).toEqual([]);
    });
});
