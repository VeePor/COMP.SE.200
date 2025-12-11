import ceil from '../../src/ceil.js';

// Tests designed in part 1
describe('[DESIGNED IN PART 1] ceil()', () => {
  test('TC1: ceil(4.006) => 5', () => {
    expect(ceil(4.006)).toBe(5);
  });

  test('TC2: ceil(6.004, 2) => 6.01', () => {
    expect(ceil(6.004, 2)).toBe(6.01);
  });

  test('TC3: ceil(6040, -2) => 6100', () => {
    expect(ceil(6040, -2)).toBe(6100);
  });

  test('TC4: ceil(-4.006) => -4', () => {
    expect(ceil(-4.006)).toBe(-4);
  });

  test('TC5: ceil(null, 2) => NaN', () => {
    expect(ceil(null, 2)).toBeNaN();;
  });

  test('TC6: ceil("asdf", 2) => NaN', () => {
    expect(ceil("asdf", 2)).toBeNaN();;
  });

  test('TC7: ceil(100.12345, 3) => 100.124', () => {
    expect(ceil(100.12345, 3)).toBe(100.124);
  });

  test('TC8: ceil(0.0001, 4) => 0.0001', () => {
    expect(ceil(0.0001, 4)).toBe(0.0001);
  });

  test('TC9: ceil(9999999.999, 0) => 10000000', () => {
    expect(ceil(9999999.999)).toBe(10000000);
  });

  test('TC10: ceil(19.99, 0) => 20', () => {
    expect(ceil(19.99)).toBe(20);
  });
});