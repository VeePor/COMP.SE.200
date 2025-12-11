// words.test.js
import words from "../../src/words.js";

describe('words()', () => {

  // ---------------------------------------------------------------------------
  // BASIC ASCII FUNCTIONALITY
  // ---------------------------------------------------------------------------

  test('splits simple ASCII words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  test('extracts ASCII alphanumeric sequences', () => {
    expect(words('hello world123 test')).toEqual(['hello', 'world123', 'test']);
  });

  test('removes punctuation automatically', () => {
    expect(words('...hello!!!')).toEqual(['hello']);
    expect(words('$$$hi$$$there')).toEqual(['hi', 'there']);
  });

  // ---------------------------------------------------------------------------
  // CUSTOM PATTERN
  // ---------------------------------------------------------------------------

  test('supports custom regex pattern', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g))
      .toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  test('custom pattern overrides default behavior completely', () => {
    expect(words('a,b,c', /[a-z]/g)).toEqual(['a', 'b', 'c']);
  });

  // ---------------------------------------------------------------------------
  // UNICODE BEHAVIOR (public behavior only)
  // ---------------------------------------------------------------------------

  test('splits words with Unicode letters', () => {
    expect(words('café mañana')).toEqual(['café', 'mañana']);
  });

  test('splits emoji as separate words', () => {
    expect(words('😀 🚀')).toEqual(['😀', '🚀']);
  });

  test('handles CJK characters', () => {
    expect(words('你好 世界')).toEqual(['你好', '世界']);
  });

  test('handles mixed ASCII and Unicode', () => {
    expect(words('hello 世界 test')).toEqual(['hello', '世界', 'test']);
  });

  // ---------------------------------------------------------------------------
  // EDGE CASES
  // ---------------------------------------------------------------------------

  test('returns empty array for empty string', () => {
    expect(words('')).toEqual([]);
  });

  test('returns empty array for strings with no word characters', () => {
    expect(words('!!!...   $$$')).toEqual([]);
  });

  test('returns empty array for whitespace-only string', () => {
    expect(words('   \n \t')).toEqual([]);
  });

  // ---------------------------------------------------------------------------
  // NON-STRING INPUTS — actual behavior: should THROW
  // ---------------------------------------------------------------------------

  test('throws TypeError for non-string primitive inputs', () => {
    expect(() => words(12345)).toThrow();
    expect(() => words(true)).toThrow();
    expect(() => words(false)).toThrow();
  });

  test('throws TypeError for null or undefined', () => {
    expect(() => words(null)).toThrow();
    expect(() => words(undefined)).toThrow();
  });

  // ---------------------------------------------------------------------------
  // ASCII SPLITTING RULES: ALPHANUMERIC MIXES
  // ---------------------------------------------------------------------------

  test('splits alphabetic and numeric boundaries separately', () => {
    expect(words('abc123 123abc a1b2')).toEqual([
      'abc', '123',
      '123', 'abc',
      'a', '1', 'b', '2'
    ]);
  });

  // ---------------------------------------------------------------------------
  // LONG STRING
  // ---------------------------------------------------------------------------

  test('handles long repeated ASCII strings', () => {
    const str = 'word '.repeat(3000);
    const result = words(str);
    expect(result.length).toBe(3000);
  });

});
