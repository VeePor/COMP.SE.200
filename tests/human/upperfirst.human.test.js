
import upperFirst from '../../src/upperFirst.js';

describe('upperFirst()', () => {
  test('should capitalize the first ASCII letter', () => {
    expect(upperFirst('hello')).toBe('Hello');
  });

  test('should keep already-capitalized first letter unchanged', () => {
    expect(upperFirst('Hello')).toBe('Hello');
  });

  test('should return empty string for empty input', () => {
    expect(upperFirst('')).toBe('');
  });

  test('should leave a leading digit unchanged', () => {
    expect(upperFirst('1abc')).toBe('1abc');
  });

  test('should leave a leading symbol unchanged', () => {
    expect(upperFirst('#tag')).toBe('#tag');
  });

  test('should capitalize first non-space letter and preserve the rest', () => {
    expect(upperFirst('   spaced')).toBe('   Spaced');
  });

  test('should only affect the first word, not subsequent words', () => {
    expect(upperFirst('hello world')).toBe('Hello world');
  });

  test('should not affect already capitalized', () => {
    expect(upperFirst('Hello world')).toBe('Hello world');
  });

  test('should capitalize a leading special letter', () => {
    expect(upperFirst('ää')).toBe('Ää');
  });

  test('should uppercase a single lowercase letter', () => {
    expect(upperFirst('x')).toBe('X');
  });

  test('should keep a single uppercase letter unchanged', () => {
    expect(upperFirst('X')).toBe('X');
  });
});
