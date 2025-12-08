import words from "../src/words";

describe('words()', () => {
    test('TC1: words("fred, barney, & pebbles") => ["fred", "barney", "pebbles"]', () => {
        expect(words("fred, barney, & pebbles")).toEqual(["fred", "barney", "pebbles"]);
    });
    test('TC2: words("fred, barney, & pebbles", /[^, ]+/g) => ["fred", "barney", "&", "pebbles"]', () => {
        expect(words("fred, barney, & pebbles", /[^, ]+/g)).toEqual(["fred", "barney", "&", "pebbles"]);
    });
    test('TC3: words("hello world") => ["hello", "world"]', () => {
        expect(words("hello world")).toEqual(["hello", "world"]);
    });
    test('TC4: words("hello, world!", /[^, ]+/g) => ["hello", "world!"]', () => {
        expect(words("hello, world!", /[^, ]+/g)).toEqual(["hello", "world!"]);
    });
    test('TC5: words("123 abc 456") => ["123", "abc", "456"]', () => {
        expect(words("123 abc 456")).toEqual(["123", "abc", "456"]);
    });
    test('TC6: words("!@# $%^ &*()") => []', () => {
        expect(words("!@# $%^ &*()")).toEqual([]);
    });
    test('TC7: words("") => []', () => {
        expect(words("")).toEqual([]);
    });
});
