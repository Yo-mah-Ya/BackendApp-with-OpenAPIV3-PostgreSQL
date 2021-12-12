import { getCitiesService } from "./service";
import { withTestData } from "../test/util";
import { createServiceContext } from "../service";
import { testData } from "../test/test-data";

jest.setTimeout(300000);

describe("getCountriesService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterAll(async () => {
        await context.postgreSqlClient.pool.end();
    });
    const context = createServiceContext();
    const expectedCities = [
        {
            id: 101,
            name: "New York",
            countryCode: "USA",
            district: "New York",
            population: 8008278,
        },
        {
            id: 102,
            name: "Los Angeles",
            countryCode: "USA",
            district: "California",
            population: 3694820,
        },
        {
            id: 103,
            name: "Chicago",
            countryCode: "USA",
            district: "Illinois",
            population: 2896016,
        },
    ];

    test("searchFirstPage", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "city"],
            async () => {
                expect(
                    await getCitiesService(context, {
                        first: 3,
                    })
                ).toStrictEqual({
                    pageInfo: {
                        endCursor: "MTAz",
                        hasPreviousPage: false,
                        hasNextPage: true,
                        startCursor: "MTAx",
                    },
                    totalCount: 3,
                    items: expectedCities,
                });
            }
        );
    });
    test("searchNextPage", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "city"],
            async () => {
                expect(
                    await getCitiesService(context, {
                        first: 3,
                        after: "MTAw",
                    })
                ).toStrictEqual({
                    pageInfo: {
                        endCursor: "MTAz",
                        hasPreviousPage: true,
                        hasNextPage: true,
                        startCursor: "MTAx",
                    },
                    totalCount: 3,
                    items: expectedCities,
                });
            }
        );
    });
    test("searchPreviousPage", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "city"],
            async () => {
                expect(
                    await getCitiesService(context, {
                        last: 3,
                        before: "MTA0",
                    })
                ).toStrictEqual({
                    pageInfo: {
                        endCursor: "MTAx",
                        hasPreviousPage: true,
                        hasNextPage: true,
                        startCursor: "MTAz",
                    },
                    totalCount: 3,
                    items: expectedCities,
                });
            }
        );
    });
    test("bad cursor pagination query", async () => {
        await expect(
            async () =>
                await getCitiesService(context, {
                    after: "MTAw",
                })
        ).rejects.toThrow(
            `bad cursor pagination query : ${JSON.stringify({ after: "MTAw" })}`
        );
    });
});
