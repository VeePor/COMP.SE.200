import { jest, describe, test, expect } from '@jest/globals';
import map from '../../src/map.js'; // Adjust the path as necessary

describe('map', () => {

  // --- Core Functionality Tests ---

  test('should return a new array with values transformed by the iteratee', () => {
    const numbers = [4, 8];
    const square = (n) => n * n;
    expect(map(numbers, square)).toEqual([16, 64]);
  });

  test('should transform an array of strings', () => {
    const words = ['hello', 'world'];
    const uppercase = (s) => s.toUpperCase();
    expect(map(words, uppercase)).toEqual(['HELLO', 'WORLD']);
  });

  test('should transform an array of objects', () => {
    const users = [{ name: 'barney' }, { name: 'fred' }];
    const getNames = ({ name }) => name;
    expect(map(users, getNames)).toEqual(['barney', 'fred']);
  });

  test('should handle the iteratee returning null or undefined', () => {
    const data = [1, 2, 3];
    const result = map(data, (n) => n > 2 ? n : null);
    expect(result).toEqual([null, null, 3]);
  });

  // --- Iteratee Arguments Tests ---

  test('should invoke the iteratee with (value, index, array)', () => {
    const array = ['a', 'b', 'c'];
    const mockIteratee = jest.fn((value, index, arr) => ({ value, index, arrRef: arr }));

    const result = map(array, mockIteratee);

    // Check the values of the result
    expect(result.length).toBe(3);
    expect(result[0].value).toBe('a');
    expect(result[1].index).toBe(1);

    // Check if the iteratee was called correctly
    expect(mockIteratee).toHaveBeenCalledTimes(3);

    // Check arguments for the first call
    expect(mockIteratee).toHaveBeenNthCalledWith(1, 'a', 0, array);
    // Check arguments for the last call
    expect(mockIteratee).toHaveBeenNthCalledWith(3, 'c', 2, array);
  });

  // --- Edge Case Tests ---

  test('should return an empty array for an empty array input', () => {
    expect(map([], (n) => n * 2)).toEqual([]);
  });

  test('should return an empty array when the input is null', () => {
    // array == null? 0 : array.length handles this
    expect(map(null, (n) => n * 2)).toEqual([]);
  });

  test('should return an empty array when the input is undefined', () => {
    expect(map(undefined, (n) => n * 2)).toEqual([]);
  });

  test('should not mutate the original array', () => {
    const original = [1, 2, 3];
    const mapped = map(original, (n) => n + 1);

    expect(mapped).toEqual([2, 3, 4]);
    expect(mapped).not.toBe(original);
    expect(original).toEqual([1, 2, 3]); // Ensure original is unchanged
  });

});