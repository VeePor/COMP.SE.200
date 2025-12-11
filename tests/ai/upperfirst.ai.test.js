// upperFirst.test.js
import upperFirst from '../../src/upperFirst.js';

describe('upperFirst()', () => {

  // ---------------------------------------------------------------------------
  // BASIC FUNCTIONALITY
  // ---------------------------------------------------------------------------

  test('converts the first character to upper case', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('abc')).toBe('Abc');
  });

  test('leaves first character unchanged if it is already uppercase', () => {
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  // ---------------------------------------------------------------------------
  // EMPTY AND SIMPLE STRINGS
  // ---------------------------------------------------------------------------

  test('returns empty string for empty input', () => {
    expect(upperFirst('')).toBe('');
  });

  test('handles one-character strings', () => {
    expect(upperFirst('a')).toBe('A');
    expect(upperFirst('A')).toBe('A');
  });

  // ---------------------------------------------------------------------------
  // NON-ALPHABETIC FIRST CHARACTERS
  // ---------------------------------------------------------------------------

  test('leaves non-alphabetic first characters unchanged', () => {
    expect(upperFirst('1abc')).toBe('1abc');
    expect(upperFirst('-test')).toBe('-test');
    expect(upperFirst('_hello')).toBe('_hello');
  });

  // ---------------------------------------------------------------------------
  // UNICODE CHARACTERS
  // ---------------------------------------------------------------------------

  test('uppercases Unicode letters correctly', () => {
    expect(upperFirst('éclair')).toBe('Éclair');   // Latin-1
    expect(upperFirst('ñandú')).toBe('Ñandú');      // Spanish
  });

  test('does not break emoji or symbols', () => {
    expect(upperFirst('😀hello')).toBe('😀hello');
    expect(upperFirst('💡Idea')).toBe('💡Idea');
  });

  // ---------------------------------------------------------------------------
  // NON-STRING INPUTS → matches real createCaseFirst behavior from lodash
  // ---------------------------------------------------------------------------

  test('treats null or undefined as empty string', () => {
    expect(upperFirst(null)).toBe('');
    expect(upperFirst(undefined)).toBe('');
  });

  // ---------------------------------------------------------------------------
  // CONSTANT / IDENTITY BEHAVIOR
  // ---------------------------------------------------------------------------

  test('keeps the rest of the string unchanged', () => {
    expect(upperFirst('testCase')).toBe('TestCase');
    expect(upperFirst('helloWorld')).toBe('HelloWorld');
  });

  // ---------------------------------------------------------------------------
  // WHITESPACE EDGE CASES
  // ---------------------------------------------------------------------------

  test('uppercases first non-empty character when string starts with whitespace', () => {
    expect(upperFirst('   hello')).toBe('   Hello'); 
    // The first *character* is a space, not h
  });

});
