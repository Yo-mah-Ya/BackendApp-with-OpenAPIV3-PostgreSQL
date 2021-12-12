import { getCountryModel } from "./model";

describe("getCountryModel", () => {
    test("true", () => {
        expect(
            getCountryModel({
                code: "code",
                name: "name",
                continent: "Africa",
                region: "region",
                surface_area: 7863,
                independent_year: 2021,
                population: 15151,
                life_expectancy: 86.05,
                gnp: 456.05,
                gnp_old: 47864.05,
                local_name: "localName",
                government_form: "governmentForm",
                head_of_state: "headOfState",
                capital: 100,
                code2: "code2",
            })
        ).toStrictEqual({
            code: "code",
            name: "name",
            continent: "Africa",
            region: "region",
            surfaceArea: 7863,
            independentYear: 2021,
            population: 15151,
            lifeExpectancy: 86.05,
            gnp: 456.05,
            gnpOld: 47864.05,
            localName: "localName",
            governmentForm: "governmentForm",
            headOfState: "headOfState",
            capital: 100,
            code2: "code2",
        });
    });
    test("null", () => {
        expect(
            getCountryModel({
                code: "code",
                name: "name",
                continent: "Africa",
                region: "region",
                surface_area: 7863,
                independent_year: undefined,
                population: 15151,
                life_expectancy: undefined,
                gnp: undefined,
                gnp_old: undefined,
                local_name: "localName",
                government_form: "governmentForm",
                head_of_state: undefined,
                capital: undefined,
                code2: "code2",
            })
        ).toStrictEqual({
            code: "code",
            name: "name",
            continent: "Africa",
            region: "region",
            surfaceArea: 7863,
            independentYear: undefined,
            population: 15151,
            lifeExpectancy: undefined,
            gnp: undefined,
            gnpOld: undefined,
            localName: "localName",
            governmentForm: "governmentForm",
            headOfState: undefined,
            capital: undefined,
            code2: "code2",
        });
    });
});
