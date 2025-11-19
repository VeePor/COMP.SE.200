import add from "./src/add.js"


test('100 + 200 = 300', () => {
    expect(add(100,200)).toBe(3);
});