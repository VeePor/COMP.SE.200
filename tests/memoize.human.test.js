import memoize from "../src/memoize";

describe("memoize", () => {
    const object = { 'a': 1, 'b': 2 };
    const other = { 'c': 3, 'd': 4 };

    test("returns memoized function results from cache", () => {
        const values = memoize(Object.values);
        expect(values(object)).toEqual([1, 2]);
        expect(values(other)).toEqual([3, 4]);
    });

    test("returns fresh results for new inputs", () => {
        const values = memoize(Object.values);
        expect(values(object)).toEqual([1, 2]);
        object.a = 2;
        expect(values(object)).toEqual([1, 2]);
    });

    test("allows modifying the cache directly", () => {
        const values = memoize(Object.values);
        expect(values(object)).toEqual([2, 2]);
        values.cache.set(object, ['a', 'b']);
        expect(values(object)).toEqual(['a', 'b']);
    });

    test("throws TypeError if first argument is not a function", () => {
        expect(() => memoize(123)).toThrow(TypeError);
        expect(() => memoize(null)).toThrow(TypeError);
        expect(() => memoize({})).toThrow(TypeError);
    });

    test("throws TypeError if resolver is provided and is not a function", () => {
        expect(() => memoize(Object.values, 123)).toThrow(TypeError);
        expect(() => memoize(Object.values, {})).toThrow(TypeError);
    });
});
