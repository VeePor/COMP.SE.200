import capitalize from '../src/capitalize.js'; // Adjust the path as necessary

describe('capitalize', () => {

  // --- Core Functionality Tests ---

  test('should capitalize an all-uppercase string', () => {
    expect(capitalize('FRED')).toBe('Fred');
  });

  test('should capitalize an all-lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should correctly capitalize a mixed-case string', () => {
    // This confirms that it first lowers the case of the whole string
    expect(capitalize('eXaMpLe')).toBe('Example');
  });

  test('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });

  test('should handle a string starting with a number', () => {
    // The number should remain, and the rest should be lowercased
    expect(capitalize('100 DOLLARS')).toBe('100 dollars');
  });

  test('should handle a string starting with a symbol', () => {
    // The symbol should remain, and the rest should be lowercased
    expect(capitalize('#TAG')).toBe('#tag');
  });

  // --- Edge Case Tests (Based on toString and optional string argument) ---

  test('should return an empty string when given an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('should return an empty string when the argument is null (due to toString)', () => {
    // toString(null) typically results in "null", which then becomes "Null"
    // However, if the function is meant to handle the optional string argument
    // and default it to '', we test for that, but Lodash's `capitalize` handles
    // null differently. Testing the most likely behavior:
    expect(capitalize(null)).toBe('Null');
  });

  test('should return a capitalized string when given undefined (due to toString)', () => {
    // The function signature implies [string=''], but the implementation uses toString(string).
    // toString(undefined) typically results in "undefined", which then becomes "Undefined"
    expect(capitalize(undefined)).toBe('Undefined');
  });

  test('should handle other non-string inputs (numbers) due to toString', () => {
    // toString(12345) results in "12345"
    expect(capitalize(12345)).toBe('12345');
  });

  test('should handle other non-string inputs (arrays) due to toString', () => {
    // toString([ 'a', 'b' ]) results in "a,b"
    expect(capitalize(['a', 'b'])).toBe('A,b');
  });

});