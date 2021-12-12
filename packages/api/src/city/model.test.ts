import { getCityModel } from "./model";

describe("getCountryModel", () => {
    test("transform", () => {
        expect(
            getCityModel({
                id: 1,
                name: "name",
                country_code: "countryCode",
                district: "district",
                population: 100,
            })
        ).toStrictEqual({
            id: 1,
            name: "name",
            countryCode: "countryCode",
            district: "district",
            population: 100,
        });
    });
});
