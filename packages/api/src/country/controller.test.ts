import { getExpressApp, ServiceContext } from "../service";
import supertest from "supertest";
import * as countryService from "./service";

const app = getExpressApp({} as ServiceContext);

describe("getCountryService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("200", async () => {
        const data = {
            code: "code",
            name: "name",
            continent: "Asia" as
                | "Asia"
                | "Europe"
                | "North America"
                | "Africa"
                | "Oceania"
                | "Antarctica"
                | "South America",
            region: "region",
            surfaceArea: 0,
            independentYear: 0,
            population: 0,
            lifeExpectancy: 0,
            gnp: 0,
            gnp_old: 0,
            localName: "localName",
            governmentForm: "governmentForm",
            headOfState: "headOfState",
            capital: 0,
            code2: "code2",
        };
        jest.spyOn(countryService, "getCountryService").mockImplementation(() =>
            Promise.resolve(data)
        );
        return supertest(app).get("/countries/code").expect(200, data);
    });
    test("404", async () => {
        jest.spyOn(countryService, "getCountryService").mockImplementation(
            async () => undefined
        );
        return supertest(app)
            .get("/countries/code")
            .expect(404, { message: "Not Found" });
    });
});
describe("getCountries", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("getCountries", async () => {
        const data = {
            pageInfo: {
                hasNextPage: false,
                endOffset: 0,
            },
            totalCount: 1,
            items: [
                {
                    code: "code",
                    name: "name",
                    continent: "Asia" as
                        | "Asia"
                        | "Europe"
                        | "North America"
                        | "Africa"
                        | "Oceania"
                        | "Antarctica"
                        | "South America",
                    region: "region",
                    surfaceArea: 0,
                    independentYear: 0,
                    population: 0,
                    lifeExpectancy: 0,
                    gnp: 0,
                    gnp_old: 0,
                    localName: "localName",
                    governmentForm: "governmentForm",
                    headOfState: "headOfState",
                    capital: 0,
                    code2: "code2",
                },
            ],
        };
        jest.spyOn(countryService, "getCountriesService").mockImplementation(
            async () => data
        );
        return supertest(app).get("/countries").expect(200, data);
    });
});
