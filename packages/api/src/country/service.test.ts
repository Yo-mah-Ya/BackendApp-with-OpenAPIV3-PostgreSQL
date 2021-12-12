import { getCountryService, getCountriesService } from "./service";
import { withTestData } from "../test/util";
import { testData } from "../test/test-data";
import { createServiceContext } from "../service";

describe("countryService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterAll(async () => {
        await context.postgreSqlClient.pool.end();
    });
    const context = createServiceContext();
    test("getCountryService", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country"],
            async () => {
                expect(await getCountryService("USA", context)).toStrictEqual({
                    code: "USA",
                    name: "United States",
                    continent: "North America",
                    region: "North America",
                    surfaceArea: 9363520,
                    independentYear: 1776,
                    population: 278357000,
                    lifeExpectancy: 77.1,
                    gnp: 8510700,
                    gnpOld: 8110900,
                    localName: "United States",
                    governmentForm: "Federal Republic",
                    headOfState: "George W. Bush",
                    capital: 3813,
                    code2: "US",
                });
                expect(
                    await getCountryService("dummy", context)
                ).toBeUndefined();
            }
        );
    });

    test("getCountriesService", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country"],
            async () => {
                expect(
                    await getCountriesService(context, {
                        limit: 100,
                        offset: 0,
                    })
                ).toStrictEqual({
                    pageInfo: {
                        hasNextPage: false,
                        endOffset: 0,
                    },
                    totalCount: 1,
                    items: [
                        {
                            code: "USA",
                            name: "United States",
                            continent: "North America",
                            region: "North America",
                            surfaceArea: 9363520,
                            independentYear: 1776,
                            population: 278357000,
                            lifeExpectancy: 77.1,
                            gnp: 8510700,
                            gnpOld: 8110900,
                            localName: "United States",
                            governmentForm: "Federal Republic",
                            headOfState: "George W. Bush",
                            capital: 3813,
                            code2: "US",
                        },
                    ],
                });
            }
        );
    });
});
