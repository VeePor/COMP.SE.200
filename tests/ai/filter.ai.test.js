import filter from '../../src/filter.js'; // Adjust the path as necessary

describe('filter', () => {

  // --- Core Functionality Tests ---

  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ];

  test('should return objects where the predicate returns truthy', () => {
    const activeUsers = filter(users, ({ active }) => active);
    expect(activeUsers).toEqual([
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'pebbles', 'age': 1, 'active': true }
    ]);
  });

  test('should return an empty array if no elements match the predicate', () => {
    const inactiveUsers = filter(users, ({ active }) => !active && false);
    expect(inactiveUsers).toEqual([]);
  });

  test('should return all elements if the predicate always returns true', () => {
    const allUsers = filter(users, () => true);
    expect(allUsers).toEqual(users);
  });

  test('should filter a simple array of numbers', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const evens = filter(numbers, (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4, 6]);
  });

  // --- Predicate Arguments Tests ---

  test('should correctly use the index argument in the predicate', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    // Filter elements at even indices (0, 2, 4)
    const result = filter(data, (value, index) => index % 2 === 0);
    expect(result).toEqual(['a', 'c', 'e']);
  });

  test('should correctly use the array argument in the predicate', () => {
    const numbers = [1, 5, 10];
    // Filter numbers greater than the average of the array (average = 5.33...)
    const averageFilter = filter(numbers, (value, index, arr) => {
      const sum = arr.reduce((acc, n) => acc + n, 0);
      return value > (sum / arr.length);
    });
    expect(averageFilter).toEqual([10]);
  });

  // --- Edge Case Tests ---

  test('should handle a null array by returning an empty array', () => {
    // The implementation handles array == null by setting length to 0
    expect(filter(null, () => true)).toEqual([]);
  });

  test('should handle an undefined array by returning an empty array', () => {
    expect(filter(undefined, () => true)).toEqual([]);
  });

  test('should handle an empty array', () => {
    expect(filter([], () => true)).toEqual([]);
  });

  test('should not mutate the original array', () => {
    const original = [1, 2, 3];
    const filtered = filter(original, (n) => n > 1);
    expect(filtered).not.toBe(original);
    expect(original).toEqual([1, 2, 3]); // Ensure original is unchanged
  });
});