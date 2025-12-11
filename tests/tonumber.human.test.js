import toNumber from "../src/toNumber";

describe("toNumber", () => {

    test("returns number when given number", () => {
        expect(toNumber(3.2)).toBe(3.2);
    });

    test("returns 5e-324 when given Number.MIN_VALUE", () => {
        expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });

    test("returns Infinity when given Infinity", () => {
        expect(toNumber(Infinity)).toBe(Infinity);
    });

    test("returns number when given number as string", () => {
        expect(toNumber("3.2")).toBe(3.2);
    });

    test("returns number when given hexadecimal string values", () => {
        expect(toNumber("0x1A")).toBe(26);
    });

    test("returns NaN for bad signed hexadecimal string values", () => {
        expect(toNumber("-0x1")).toBeNaN();
    });

    test("returns number when given binary string values", () => {
        expect(toNumber("0b101")).toBe(5);
    });

    test("returns number when given octal string values", () => {
        expect(toNumber("0o17")).toBe(15);
    });

    test("returns NaN when given a symbol", () => {
        expect(toNumber(Symbol())).toBeNaN();
    });

    test("returns number when given an object with valueOf method", () => {
        const obj = {
            valueOf: () => "42"
        };
        expect(toNumber(obj)).toBe(42);
    });

    test("returns NaN when given an object without valueOf method", () => {
        const obj = {};
        expect(toNumber(obj)).toBeNaN();
    });

    test("trims whitespace from string before converting", () => {
        expect(toNumber("   42   ")).toBe(42);
    });
});