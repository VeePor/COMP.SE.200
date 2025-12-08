import upperFirst from "../src/upperFirst";

describe("upperFirst", () => {
    test("TC1: upperFirst('hello') => 'Hello'", () => {
        expect(upperFirst("hello")).toBe("Hello");
    });
    test("TC2: upperFirst('Hello') => 'Hello'", () => {
        expect(upperFirst("Hello")).toBe("Hello");
    });
    test("TC3: upperFirst('') => ''", () => {
        expect(upperFirst("")).toBe("");
    });
    test("TC4: upperFirst('1abc') => '1abc'", () => {
        expect(upperFirst("1abc")).toBe("1abc");
    });
    test("TC5: upperFirst('ää') => 'Ää'", () => {
        expect(upperFirst("ää")).toBe("Ää");
    });
});