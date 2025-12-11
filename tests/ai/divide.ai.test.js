import divide from '../../src/divide.js'; // Adjust the path as necessary to import the 'divide' function

// NOTE: This test suite assumes the implementation is corrected to:
// createMathOperation((dividend, divisor) => dividend / divisor, 1)

describe('divide', () => {

  // --- Basic Arithmetic Tests ---

  test('should correctly divide two positive integers', () => {
    expect(divide(6, 4)).toBe(1.5);
    expect(divide(10, 5)).toBe(2);
  });

  test('should handle negative numbers in the dividend', () => {
    expect(divide(-10, 5)).toBe(-2);
  });

  test('should handle negative numbers in the divisor', () => {
    expect(divide(10, -5)).toBe(-2);
  });

  test('should handle two negative numbers', () => {
    expect(divide(-10, -5)).toBe(2);
  });

  test('should handle floating-point numbers', () => {
    // Due to floating-point precision, use toBeCloseTo for comparison
    expect(divide(5, 2.5)).toBe(2);
    expect(divide(10, 3)).toBeCloseTo(3.3333333333333335);
  });

  // --- Edge Cases: Zero and Infinity ---

  test('should return 0 when the dividend is 0 and the divisor is non-zero', () => {
    expect(divide(0, 5)).toBe(0);
    expect(divide(0, -5)).toBe(0);
  });

  test('should return Infinity when dividing a positive number by 0', () => {
    expect(divide(5, 0)).toBe(Infinity);
  });

  test('should return -Infinity when dividing a negative number by 0', () => {
    expect(divide(-5, 0)).toBe(-Infinity);
  });

  test('should return NaN when dividing 0 by 0', () => {
    expect(divide(0, 0)).toBeNaN();
  });

  // --- Default/Coercion Tests (Assuming Lodash-like behavior) ---

  test('should default undefined arguments to 1 (based on the default value in createMathOperation)', () => {
    // createMathOperation((dividend, divisor) => dividend / divisor, 1)
    // The default value of 1 is used when an argument is missing.
    // However, Lodash-style math ops often apply the default to the *last*
    // argument if only one is provided, and use the identity value if both are missing.
    // Based purely on the signature:
    expect(divide(5, undefined)).toBe(5); // 5 / 1 (default identity)
    expect(divide(undefined, 5)).toBe(0.2); // 1 (default identity) / 5
    expect(divide(undefined, undefined)).toBe(1); // 1 / 1 (default identity)
  });

  test('should handle string arguments that can be coerced to numbers', () => {
    // Assuming 'createMathOperation' coerces string numbers to actual numbers
    expect(divide('10', '2')).toBe(5);
    expect(divide(20, '4')).toBe(5);
  });

  test('should return NaN for non-numeric string arguments', () => {
    // Assuming coercion results in NaN
    expect(divide(10, 'a')).toBeNaN();
    expect(divide('b', 5)).toBeNaN();
  });

});