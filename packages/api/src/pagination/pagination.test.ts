import {
    cursorPageInfo,
    FirstTimeCursorPaginationQuery,
    getCursorPaginationQuery,
    offsetPageInfo,
    normalizeOffsetPagination,
} from "./pagination";

describe("getCursorPaginationQuery", () => {
    test("isParamFirstTimeCursorPagination", () => {
        expect(
            getCursorPaginationQuery({
                first: 499,
            })
        ).toStrictEqual({ first: 499 });
        expect(
            getCursorPaginationQuery({
                first: 500,
            })
        ).toStrictEqual({ first: 500 });
        expect(
            getCursorPaginationQuery({
                first: 501,
            })
        ).toStrictEqual({ first: 500 });
    });
    test("isParamSearchingNextPageCursorPagination", () => {
        expect(
            getCursorPaginationQuery({
                first: 499,
                after: "MQ==",
            })
        ).toStrictEqual({ first: 499, after: 1 });
        expect(
            getCursorPaginationQuery({
                first: 500,
                after: "MQ==",
            })
        ).toStrictEqual({ first: 500, after: 1 });
        expect(
            getCursorPaginationQuery({
                first: 501,
                after: "MQ==",
            })
        ).toStrictEqual({ first: 500, after: 1 });
    });
    test("isParamSearchingPreviousPageCursorPagination", () => {
        expect(
            getCursorPaginationQuery({
                last: 499,
                before: "MQ==",
            })
        ).toStrictEqual({ last: 499, before: 1 });
        expect(
            getCursorPaginationQuery({
                last: 500,
                before: "MQ==",
            })
        ).toStrictEqual({ last: 500, before: 1 });
        expect(
            getCursorPaginationQuery({
                last: 501,
                before: "MQ==",
            })
        ).toStrictEqual({ last: 500, before: 1 });
    });
    test("bad parameters", () => {
        expect(() =>
            getCursorPaginationQuery({
                first: 3,
                after: "endCursor",
                last: 3,
                before: "startCursor",
            } as FirstTimeCursorPaginationQuery)
        ).toThrow(
            `bad cursor pagination query : ${JSON.stringify({
                first: 3,
                after: "endCursor",
                last: 3,
                before: "startCursor",
            })}`
        );
    });
});

describe("cursorPageInfo", () => {
    test("first time", () => {
        expect(
            cursorPageInfo(
                [
                    {
                        id: 1,
                        name: "Kabul",
                        countryCode: "AFG",
                        district: "Kabol",
                        population: 1780000,
                    },
                    {
                        id: 2,
                        name: "Qandahar",
                        countryCode: "AFG",
                        district: "Qandahar",
                        population: 237500,
                    },
                    {
                        id: 3,
                        name: "Herat",
                        countryCode: "AFG",
                        district: "Herat",
                        population: 186800,
                    },
                ],
                "id",
                { first: 3 }
            )
        ).toStrictEqual({
            endCursor: "Mw==",
            hasPreviousPage: false,
            hasNextPage: true,
            startCursor: "MQ==",
        });
    });
    test("search next page", () => {
        expect(
            cursorPageInfo(
                [
                    {
                        id: 101,
                        name: "Godoy Cruz",
                        countryCode: "ARG",
                        district: "Mendoza",
                        population: 206998,
                    },
                    {
                        id: 102,
                        name: "Posadas",
                        countryCode: "ARG",
                        district: "Misiones",
                        population: 201273,
                    },
                    {
                        id: 103,
                        name: "Guaymallén",
                        countryCode: "ARG",
                        district: "Mendoza",
                        population: 200595,
                    },
                ],
                "id",
                { first: 3, after: "MjAw" }
            )
        ).toStrictEqual({
            endCursor: "MTAz",
            hasPreviousPage: true,
            hasNextPage: true,
            startCursor: "MTAx",
        });
    });
    test("search previous page", () => {
        expect(
            cursorPageInfo(
                [
                    {
                        id: 51,
                        name: "Ech-Chleff (el-Asnam)",
                        countryCode: "DZA",
                        district: "Chlef",
                        population: 96794,
                    },
                    {
                        id: 52,
                        name: "Ghardaïa",
                        countryCode: "DZA",
                        district: "Ghardaïa",
                        population: 89415,
                    },
                    {
                        id: 53,
                        name: "Tafuna",
                        countryCode: "ASM",
                        district: "Tutuila",
                        population: 5200,
                    },
                ],
                "id",
                { last: 3, before: "MTAx" }
            )
        ).toStrictEqual({
            endCursor: "NTM=",
            hasPreviousPage: true,
            hasNextPage: true,
            startCursor: "NTE=",
        });
    });
    test("items length === 0", () => {
        expect(
            cursorPageInfo([], "a", { first: 3, after: "MjAw" })
        ).toStrictEqual({
            endCursor: undefined,
            hasPreviousPage: true,
            hasNextPage: false,
            startCursor: undefined,
        });
    });
    test("bad cursor pagination query", () => {
        expect(() =>
            cursorPageInfo([{ a: "a" }], "a", {
                first: 3,
                after: "endCursor",
                last: 3,
                before: "startCursor",
            } as FirstTimeCursorPaginationQuery)
        ).toThrow(
            `bad cursor pagination query : ${JSON.stringify({
                first: 3,
                after: "endCursor",
                last: 3,
                before: "startCursor",
            })}`
        );
    });
});

describe("normalizeOffsetPagination", () => {
    test("not passes the param", () => {
        expect(normalizeOffsetPagination({})).toStrictEqual({
            limit: 500,
            offset: 0,
        });
    });
    test("passes the limit", () => {
        expect(normalizeOffsetPagination({ limit: 499 })).toStrictEqual({
            limit: 499,
            offset: 0,
        });
        expect(normalizeOffsetPagination({ limit: 500 })).toStrictEqual({
            limit: 500,
            offset: 0,
        });
        expect(normalizeOffsetPagination({ limit: 501 })).toStrictEqual({
            limit: 500,
            offset: 0,
        });
    });
    test("passes the offset", () => {
        expect(normalizeOffsetPagination({ offset: 100 })).toStrictEqual({
            limit: 500,
            offset: 100,
        });
    });
});
describe("offsetPageInfo", () => {
    test("not found", () => {
        expect(offsetPageInfo(0, { limit: 500, offset: 0 })).toStrictEqual({
            hasNextPage: false,
            endOffset: undefined,
        });
    });
    test("it does not have next page", () => {
        expect(offsetPageInfo(50, { limit: 500, offset: 0 })).toStrictEqual({
            hasNextPage: false,
            endOffset: 49,
        });
    });
    test("it has next page", () => {
        expect(offsetPageInfo(500, { limit: 500, offset: 0 })).toStrictEqual({
            hasNextPage: true,
            endOffset: 499,
        });
    });
    test("it does not have next page", () => {
        expect(offsetPageInfo(499, { limit: 500, offset: 500 })).toStrictEqual({
            hasNextPage: false,
            endOffset: 998,
        });
    });
});
