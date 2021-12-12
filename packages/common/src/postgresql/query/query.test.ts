import {
    createInsertQuery,
    createUpdateQuery,
    createBulkInsertQuery,
    createFetchUniqueRecordQuery,
} from "./query";

describe("query", () => {
    test("createInsertQuery", () => {
        expect(
            createInsertQuery("test_table", {
                a: "a1",
                b: undefined,
                c: 100,
                d: true,
                e: null,
                f: ["a", "b", "c"],
            })
        ).toStrictEqual({
            sql: "INSERT INTO test_table (a,b,c,d,e,f) VALUES ($1,$2,$3,$4,$5,$6);",
            values: ["a1", null, 100, true, null, ["a", "b", "c"]],
        });
    });
    test("createUpdateQuery", () => {
        expect(
            createUpdateQuery(
                "test_table",
                {
                    a: "a1",
                    b: undefined,
                    c: 100,
                    d: true,
                    e: ["a", "b", "c"],
                },
                {
                    b: undefined,
                    e: ["a", "b", "c"],
                }
            )
        ).toStrictEqual({
            sql: "UPDATE test_table SET a = $1, b = $2, c = $3, d = $4, e = $5 WHERE 1 = 1 AND b = $6 AND e = $7;",
            values: [
                "a1",
                null,
                100,
                true,
                ["a", "b", "c"],
                null,
                ["a", "b", "c"],
            ],
        });
    });
    test("createBulkInsertQuery", () => {
        expect(
            createBulkInsertQuery("test_table", [
                {
                    a: "a1",
                    b: undefined,
                    c: 100,
                    d: true,
                },
                {
                    a: "a2",
                    b: null,
                    c: { key: "value" },
                    d: false,
                },
                {
                    a: "a3",
                    b: "b3",
                    c: [1, 2, 3, 4, 5],
                    d: false,
                },
            ])
        ).toStrictEqual({
            sql: "INSERT INTO test_table (a,b,c,d) VALUES ($1,$2,$3,$4), ($5,$6,$7,$8), ($9,$10,$11,$12);",
            values: [
                "a1",
                null,
                100,
                true,
                "a2",
                null,
                { key: "value" },
                false,
                "a3",
                "b3",
                [1, 2, 3, 4, 5],
                false,
            ],
        });
    });
    test("createBulkInsertQuery records length === 0", () => {
        expect(() => createBulkInsertQuery("test_table", [])).toThrow(
            "records must be more than one"
        );
    });
    test("", () => {
        expect(
            createFetchUniqueRecordQuery(
                "test_table",
                {
                    a: "a1",
                    b: undefined,
                    c: 100,
                    d: true,
                    e: ["x", "y", "z"],
                    f: { a: "a", b: "b", c: "c" },
                },
                ["a", "b", "d"]
            )
        ).toStrictEqual({
            sql: `SELECT * FROM test_table WHERE 1 = 1 AND a = $1 AND b IS NULL AND d = $2;`,
            values: ["a1", true],
        });
    });
});
