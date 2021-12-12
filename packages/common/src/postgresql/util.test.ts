import { nullishToNull, omitNullish } from "./util";

describe("postgresql util", () => {
    test("nullishToNull", () => {
        expect(nullishToNull({ a: "a", b: undefined, c: null })).toStrictEqual({
            a: "a",
            b: null,
            c: null,
        });
    });
    test("omitNullish", () => {
        expect(omitNullish({ a: "a", b: undefined, c: null })).toStrictEqual({
            a: "a",
        });
    });
});
