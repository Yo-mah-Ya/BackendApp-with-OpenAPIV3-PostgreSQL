import { getExpressApp, ServiceContext } from "../service";
import supertest from "supertest";
import * as cityService from "./service";

const app = getExpressApp({} as ServiceContext);

describe("getCitiesService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("200", async () => {
        const data = {
            pageInfo: {
                endCursor: "MTAz",
                hasPreviousPage: true,
                hasNextPage: true,
                startCursor: "MTAx",
            },
            totalCount: 3,
            items: [
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
        };
        jest.spyOn(cityService, "getCitiesService").mockImplementation(() =>
            Promise.resolve(data)
        );
        return supertest(app)
            .get("/cities")
            .query({ first: 100, after: "after" })
            .expect(200, data);
    });
    test("500", async () => {
        jest.spyOn(cityService, "getCitiesService").mockImplementation(() =>
            Promise.reject(new Error())
        );
        return supertest(app)
            .get("/cities")
            .query({ first: 100, after: "after" })
            .expect(500);
    });
});
