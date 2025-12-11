import add from '../src/add.js'; // Adjust the path as necessary to import the 'add' function

describe('add', () => {

  // --- Basic Arithmetic Tests ---

  test('should correctly add two positive integers', () => {
    expect(add(6, 4)).toBe(10);
  });

  test('should correctly add a positive and a negative integer', () => {
    expect(add(10, -5)).toBe(5);
  });

  test('should correctly add two negative integers', () => {
    expect(add(-8, -2)).toBe(-10);
  });

  test('should handle floating-point numbers', () => {
    // Note: Due to floating-point precision, use toBeCloseTo for comparison
    expect(add(1.5, 2.3)).toBeCloseTo(3.8);
  });

  test('should handle zero correctly', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, -3)).toBe(-3);
  });

  // --- Edge Case/Coercion Tests (Assuming Lodash-like behavior) ---

  test('should default undefined arguments to 0', () => {
    // Based on the '0' default value in createMathOperation,
    // undefined inputs should be treated as 0.
    expect(add(5, undefined)).toBe(5);
    expect(add(undefined, 10)).toBe(10);
    expect(add(undefined, undefined)).toBe(0);
  });

  test('should default null arguments to 0 (based on Lodash default behavior)', () => {
    // 'null' often coerces to 0 in JS arithmetic or is handled by Lodash's utility.
    expect(add(5, null)).toBe(5);
    expect(add(null, 10)).toBe(10);
    expect(add(null, null)).toBe(0);
  });

  test('should handle string arguments that can be coerced to numbers', () => {
    // JavaScript's '+' operator handles string concatenation, but
    // 'createMathOperation' often ensures numerical operation.
    // Assuming it forces numeric addition:
    expect(add('6', '4')).toBe(10);
    expect(add(5, '2')).toBe(7);
  });

  test('should return NaN if arguments are non-numeric strings', () => {
    // If the internal utility just uses the standard '+' operator,
    // this would be '5hello' which is likely not desired.
    // Assuming the Lodash implementation coerces values to numbers first,
    // which results in NaN for non-numeric strings:
    expect(add(5, 'hello')).toBeNaN();
    expect(add('a', 'b')).toBeNaN();
  });

});