import toNumber from '../src/toNumber.js'

describe('toNumber()', () => {

  // ----------------------------------------
  // Primitive Numbers
  // ----------------------------------------
  test('returns the number itself when value is a number', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(-5)).toBe(-5);
  });

  test('returns Infinity when given Infinity', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
  });

  // ----------------------------------------
  // String Numbers
  // ----------------------------------------
  test('converts numeric strings to numbers', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber('-10')).toBe(-10);
    expect(toNumber('0')).toBe(0);
  });

  test('trims whitespace from string before converting', () => {
    expect(toNumber('   42  ')).toBe(42);
  });

  // ----------------------------------------
  // Binary / Octal / Hex
  // ----------------------------------------
  test('parses binary string values ("0b...")', () => {
    expect(toNumber('0b101')).toBe(5);
    expect(toNumber('0b0001')).toBe(1);
  });

  test('parses octal string values ("0o...")', () => {
    expect(toNumber('0o10')).toBe(8);
  });

  test('returns NaN for bad signed hex values', () => {
    expect(toNumber('-0x1')).toBeNaN();
    expect(toNumber('+0xF')).toBeNaN();
  });

  test('parses valid hex using unary +', () => {
    expect(toNumber('0xF')).toBe(15);
    expect(toNumber('0xff')).toBe(255);
  });

  // ----------------------------------------
  // Symbols
  // ----------------------------------------
  test('returns NaN for symbols', () => {
    expect(toNumber(Symbol('x'))).toBeNaN();
  });

  // ----------------------------------------
  // Objects With valueOf()
  // ----------------------------------------
  test('uses valueOf() on objects that implement it', () => {
    const obj = {
      valueOf: () => 5,
    };
    expect(toNumber(obj)).toBe(5);
  });

  test('stringifies object if valueOf returns another object', () => {
    const obj = {
      valueOf: () => ({ a: 1 }),
    };
    // value becomes "[object Object]" → +"[object Object]" → NaN
    expect(toNumber(obj)).toBeNaN();
  });

  // ----------------------------------------
  // Other Objects
  // ----------------------------------------
  test('numeric conversion of regular objects without valueOf', () => {
    // becomes + "[object Object]" → NaN
    expect(toNumber({})).toBeNaN();
  });

  // ----------------------------------------
  // Null / Undefined
  // ----------------------------------------
  test('converts null to 0', () => {
    expect(toNumber(null)).toBe(0);
  });

  test('converts undefined to NaN', () => {
    expect(toNumber(undefined)).toBeNaN();
  });

  // ----------------------------------------
  // Boolean
  // ----------------------------------------
  test('converts true to 1 and false to 0', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  // ----------------------------------------
  // Misc edge cases
  // ----------------------------------------
  test('converts empty string to 0', () => {
    expect(toNumber('')).toBe(0);
  });

  test('converts "   " to 0 after trimming', () => {
    expect(toNumber('   ')).toBe(0);
  });

});
