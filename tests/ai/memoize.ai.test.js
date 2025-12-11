
import memoize from '../../src/memoize.js';
import { jest } from '@jest/globals';

describe('[AI-assisted] memoize — edge cases, caveats & bug detection', () => {
  // ---------------------------
  // A) Context (`this`) caveats
  // ---------------------------

  test('caches by first arg only by default — `this` changes are ignored (stale results)', () => {
    const func = function (x) { return this.factor * x; };
    const m = memoize(func); // default key: args[0] only

    const ctxA = { factor: 2 };
    const ctxB = { factor: 10 };

    // First call caches under key = 5
    expect(m.call(ctxA, 5)).toBe(10);
    // Second call reuses cache even though `this` differs — caveat spotlight
    expect(m.call(ctxB, 5)).toBe(10); // would be 50 if key included `this`
  });

  test('using a resolver that includes `this` avoids stale results for context-dependent functions', () => {
    const func = function (x) { return this.factor * x; };
    const resolver = function (x) { return `${this.factor}:${x}`; };
    const m = memoize(func, resolver);

    const ctxA = { factor: 2 };
    const ctxB = { factor: 10 };

    expect(m.call(ctxA, 5)).toBe(10);   // key "2:5"
    expect(m.call(ctxB, 5)).toBe(50);   // key "10:5"
  });

  // ----------------------------------
  // B) Resolver failures & error paths
  // ----------------------------------

  test('resolver errors propagate and prevent func invocation', () => {
    const func = jest.fn(x => x);
    const resolver = () => { throw new Error('resolver failed'); };
    const m = memoize(func, resolver);

    expect(() => m(1)).toThrow('resolver failed');
    expect(func).not.toHaveBeenCalled();
  });

  // --------------------------------------
  // C) Custom cache swapping (WeakMap caveats)
  // --------------------------------------

  test('custom cache: WeakMap works for object keys and throws for primitive keys', () => {
    const OriginalCache = memoize.Cache;

    try {
      memoize.Cache = WeakMap;
      const m = memoize(obj => Object.keys(obj));

      const obj1 = { a: 1 };
      const obj2 = { a: 2 };

      // Object keys — valid for WeakMap
      expect(m(obj1)).toEqual(['a']);
      expect(m(obj1)).toEqual(['a']); // cached
      expect(m(obj2)).toEqual(['a']);

      // Primitive key — WeakMap#set/has will throw a TypeError
      expect(() => m(42)).toThrow(TypeError);

      // Cache instance is actually a WeakMap
      expect(m.cache).toBeInstanceOf(WeakMap);
    } finally {
      memoize.Cache = OriginalCache;
    }
  });

  test('custom cache: absence of clear() in WeakMap does not break memoize', () => {
    const OriginalCache = memoize.Cache;
    try {
      memoize.Cache = WeakMap;
      const m = memoize(obj => obj.value);
      const obj = { value: 123 };

      expect(m(obj)).toBe(123);
      // WeakMap supports has/get/delete; ensure memoize never requires clear()
      expect(m.cache.has(obj)).toBe(true);
      expect(m.cache.get(obj)).toBe(123);
      expect(m.cache.delete(obj)).toBe(true);
      expect(m.cache.has(obj)).toBe(false);
    } finally {
      memoize.Cache = OriginalCache;
    }
  });

  // -----------------------------------------
  // D) Map semantics & cache instance behavior
  // -----------------------------------------

  test('NaN keys: Map treats NaN as equal — only computes once', () => {
    const fn = jest.fn(x => String(x));
    const m = memoize(fn);

    expect(m(NaN)).toBe('NaN');
    expect(m(NaN)).toBe('NaN');
    expect(fn).toHaveBeenCalledTimes(1); // cached despite NaN !== NaN in JS strict equality
  });

  test('distinct object identities are distinct keys (no structural memoization)', () => {
    const fn = jest.fn(obj => obj.val);
    const m = memoize(fn);
    const a = { val: 1 };
    const b = { val: 1 };

    expect(m(a)).toBe(1);
    expect(m(b)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2); // different object identity => different cache entries
  });

  test('cache instance remains stable after set operations', () => {
    const fn = x => x * 2;
    const m = memoize(fn);

    const before = m.cache;
    expect(m(3)).toBe(6);
    expect(m.cache).toBe(before); // memoized.cache = cache.set(...) || cache should retain instance
  });

  // ----------------------------------------
  // E) Caching with undefined / falsy values
  // ----------------------------------------

  test('caches undefined and null distinctly under different keys', () => {
    const fn = jest.fn((x) => (x > 0 ? undefined : null));
    const m = memoize(fn);

    expect(m(1)).toBeUndefined();
    expect(m(1)).toBeUndefined(); // cached
    expect(m(0)).toBeNull();
    expect(m(0)).toBeNull();      // cached

    expect(fn).toHaveBeenCalledTimes(2); // once per distinct key (1 and 0)
  });

  // --------------------------------
  // F) Mutability + manual cache ops
  // --------------------------------

  test('manual cache override is respected on subsequent calls', () => {
    const values = memoize(obj => Object.values(obj));
    const object = { a: 1, b: 2 };

    // Populate cache
    expect(values(object)).toEqual([1, 2]);

    // Manual override
    values.cache.set(object, ['A', 'B']);
    expect(values(object)).toEqual(['A', 'B']);
  });
});
