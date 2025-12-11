import words from '../../src/words.js';

describe('words()', () => {
  test('should split a comma-separated list into alphabetic words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  test('should split a simple sentence into words', () => {
    expect(words('hello world')).toEqual(['hello', 'world']);
  });

  test('should split mixed alphanumeric tokens', () => {
    expect(words('ABCd12 and 34aB')).toEqual(['ABCd12', 'and', '34aB']);
  });

  test('should ignore punctuation-only strings and return empty array', () => {
    expect(words('!@# $%^ &*()')).toEqual([]);
  });

  test('should return empty array for empty string', () => {
    expect(words('')).toEqual([]);
  });

  test('should handle multiple spaces, tabs and newlines', () => {
    expect(words('  hello\tworld \n next '))
      .toEqual(['hello', 'world', 'next']);
  });

  test('should honor a custom pattern that includes non-alphanumeric tokens', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g))
      .toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  test('should honor a custom pattern to capture only comma-separated items', () => {
    expect(words('hello, world!', /[^, ]+/g)).toEqual(['hello', 'world!']);
  });

  test('should split basic unicode words with accents', () => {
    expect(words('mañana Überstraße'))
      .toEqual(['mañana', 'Überstraße']);
  });
});
