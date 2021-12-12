import { getCountryLanguageService } from "./service";
import { withTestData } from "../test/util";
import { testData } from "../test/test-data";
import { createServiceContext } from "../service";

describe("getCountryService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterAll(async () => {
        await context.postgreSqlClient.pool.end();
    });
    const context = createServiceContext();
    test("found is_official false", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "country_language"],
            async () => {
                expect(
                    await getCountryLanguageService("USA", "English", context)
                ).toStrictEqual({
                    countryCode: "USA",
                    language: "English",
                    isOfficial: true,
                    percentage: 86.2,
                });
            }
        );
    });
    test("found is_official true", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "country_language"],
            async () => {
                console.dir("inside func starts");
                expect(
                    await getCountryLanguageService("USA", "Spanish", context)
                ).toStrictEqual({
                    countryCode: "USA",
                    language: "Spanish",
                    isOfficial: false,
                    percentage: 7.5,
                });
            }
        );
    });
    test("not found data", async () => {
        await withTestData(
            context.postgreSqlClient,
            testData(),
            ["country", "country_language"],
            async () => {
                expect(
                    await getCountryLanguageService("123", "English", context)
                ).toBeUndefined();
            }
        );
    });
});
