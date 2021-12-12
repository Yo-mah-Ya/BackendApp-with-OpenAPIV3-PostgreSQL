import { Router, Request, Response } from "express";
import { ServiceContext } from "./service";
import { schema, schemaPath, healthCheckPath } from "./openapi";
import { setRouter as setCityRouter } from "./city/controller";
import { setRouter as setCountryRouter } from "./country/controller";
import { setRouter as setCountryLanguageRouter } from "./country-language/controller";

export const createRouter = (context: ServiceContext): Router => {
    const router: Router = Router();
    router.get(healthCheckPath, (_: Request, res: Response) => {
        res.status(200).send("OK");
    });
    router.get(schemaPath, (_: Request, res: Response): void => {
        res.status(200).json(schema);
    });
    setCityRouter(router, context);
    setCountryRouter(router, context);
    setCountryLanguageRouter(router, context);
    return router;
};
