import ceil from '../src/ceil.js';

describe('ceil()', () => {

  // --- BASIC FUNCTIONALITY ---------------------------------------------------

  test('rounds up to the nearest integer by default', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(4.0)).toBe(4);
    expect(ceil(4.999)).toBe(5);
  });

  test('handles negative numbers', () => {
    expect(ceil(-4.1)).toBe(-4);
    expect(ceil(-4.0001)).toBe(-4);
    expect(ceil(-4.0)).toBe(-4);
  });

  // --- PRECISION (POSITIVE) --------------------------------------------------

  test('rounds up with positive precision', () => {
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(3.14159, 3)).toBe(3.142);
    expect(ceil(1.0001, 4)).toBe(1.0001);
  });

  test('does not produce floating-point artifacts (critical)', () => {
    expect(ceil(1.005, 2)).toBe(1.01);
    expect(ceil(10.235, 2)).toBe(10.24);
  });

  // --- PRECISION (NEGATIVE) --------------------------------------------------

  test('rounds up with negative precision (to tens, hundreds, ...)', () => {
    expect(ceil(6040, -2)).toBe(6100);
    expect(ceil(149, -1)).toBe(150);
    expect(ceil(150, -1)).toBe(150);
    expect(ceil(151, -1)).toBe(160);
  });

  // --- EDGE CASES ------------------------------------------------------------

  test('returns NaN for non-numeric input', () => {
    expect(ceil("abc")).toBeNaN();
    expect(ceil(undefined)).toBeNaN();
    expect(ceil(NaN)).toBeNaN();
  });

  test('handles precision values that are not numbers', () => {
    // Should fall back to default precision = 0
    expect(ceil(4.2, 'not a number')).toBe(5);
  });

  test('precision of 0 is equivalent to default behavior', () => {
    expect(ceil(4.006, 0)).toBe(5);
  });

  test('handles extremely large numbers', () => {
    expect(ceil(1e308 + 0.1)).toBe(1e308 + 1); // safe integer boundary
  });

  test('handles extremely small numbers', () => {
    expect(ceil(0.0000000000001, 15)).toBe(0.0000000000001);
  });

  // --- BOUNDARY VALUES -------------------------------------------------------

  test('correctly handles exact boundaries', () => {
    expect(ceil(5.0)).toBe(5);
    expect(ceil(100, -2)).toBe(100);
    expect(ceil(9.99, 1)).toBe(10.0);
  });

  // --- INTEGRATION-LEVEL BEHAVIOR (createRound correctness) ------------------

  test('behaves consistently with Math.ceil for precision 0', () => {
    const values = [-10, -1.2, -0.1, 0, 0.1, 1.2, 5.9, 10];
    for (const v of values) {
      expect(ceil(v)).toBe(Math.ceil(v));
    }
  });

  // --- PROPERTY-BASED CHECK (optional advanced test) -------------------------

  test('property: result is always >= the input number', () => {
    for (let i = 0; i < 1000; i++) {
      const n = Math.random() * 2000 - 1000; // -1000 to 1000
      expect(ceil(n)).toBeGreaterThanOrEqual(n);
    }
  });

})