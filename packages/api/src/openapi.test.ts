import { getExpressApp, ServiceContext } from "./service";
import { schema } from "./openapi";
import supertest from "supertest";

const app = getExpressApp({} as ServiceContext);

describe("schema.json", () => {
    test("ok", async () => {
        return supertest(app).get("/schema.json").expect(200, schema);
    });
});
