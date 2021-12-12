import { getExpressApp, ServiceContext } from "../service";
import supertest from "supertest";
import * as countryLanguageService from "./service";
import { httpStatusCodes } from "@backend/common";

const app = getExpressApp({} as ServiceContext);

describe("getCountryLanguageService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("200", async () => {
        const data = {
            countryCode: "XXX",
            language: "English",
            isOfficial: true,
            percentage: 120,
        };
        jest.spyOn(
            countryLanguageService,
            "getCountryLanguageService"
        ).mockImplementation(() => Promise.resolve(data));
        return supertest(app)
            .get("/country-languages/XXX")
            .query({ language: "English" })
            .expect(200, data);
    });
    test("400", async () => {
        return supertest(app)
            .get("/country-languages/XXX")
            .expect(400, { message: httpStatusCodes[400] });
    });
    test("404", async () => {
        jest.spyOn(
            countryLanguageService,
            "getCountryLanguageService"
        ).mockImplementation(() => Promise.resolve(undefined));
        return supertest(app)
            .get("/country-languages/XXX")
            .query({ language: "English" })
            .expect(404, { message: "Not Found" });
    });
});
