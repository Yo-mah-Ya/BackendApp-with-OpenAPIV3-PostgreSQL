import { getCountryLanguageModel } from "./model";

describe("getCountryLanguageModel", () => {
    test("true", () => {
        expect(
            getCountryLanguageModel({
                country_code: "countryCode",
                language: "language",
                is_official: 1,
                percentage: 10.0,
            })
        ).toStrictEqual({
            countryCode: "countryCode",
            language: "language",
            isOfficial: true,
            percentage: 10.0,
        });
    });
    test("false", () => {
        expect(
            getCountryLanguageModel({
                country_code: "countryCode",
                language: "language",
                is_official: 0,
                percentage: 10.0,
            })
        ).toStrictEqual({
            countryCode: "countryCode",
            language: "language",
            isOfficial: false,
            percentage: 10.0,
        });
    });
});
