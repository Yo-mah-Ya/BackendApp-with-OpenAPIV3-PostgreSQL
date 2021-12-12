import { getExpressApp, ServiceContext } from "./service";
import supertest from "supertest";

const app = getExpressApp({} as ServiceContext);

describe("health-check", () => {
    test("OK", async () => {
        return supertest(app).get("/health-check").expect(200, "OK");
    });
});
