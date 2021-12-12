import { formatDate, formatDateTime } from "./index";

// const toZeroPadding = (n: number, width: number): string =>
//     n.toString().padStart(width, "0");
describe("formatDate", () => {
    /**
     * |        |           |        timezone     |
     * |        |           | with      | without |
     * | offset | with      |   1       |    2    |
     * |        | without   |   3       |    4    |
     */
    test("with offset and without timezone", () => {
        expect(formatDate(new Date("1999-12-31T19:00:00.000Z"))).toBe(
            "1999-12-31"
        );
    });
});

describe("formatDateTime", () => {
    test("with offset and without timezone", () => {
        expect(formatDateTime(new Date("2000-01-01T12:30:30.555Z"))).toBe(
            "2000-01-01T12:30:30Z"
        );
    });
});
