import express, {
    Express,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from "express";
import compression from "compression";
import helmet from "helmet";
import { PoolConfig } from "pg";
import swaggerUi from "swagger-ui-express";
import { Logger, Util, httpStatusCodes, PostgreSql } from "@backend/common";
import { createRouter } from "./router";
import { openApiValidator, schema } from "./openapi";
import { components } from "./types";

const errorHandler: ErrorRequestHandler<
    unknown,
    components["schemas"]["Error"]
> = (error, req, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(error);

    if (
        typeof error.status === "number" &&
        error.errors &&
        typeof error.message === "string"
    ) {
        const status = error.status as keyof typeof httpStatusCodes;
        if (404 !== status) {
            Logger.warn({
                message: Util.errorMessageOf(error),
                callSite: {
                    file: __filename,
                    function: errorHandler.name,
                },
                path: req.path,
            });
        }
        res.status(status).json({
            message: httpStatusCodes[status in httpStatusCodes ? status : 400],
        });
        return;
    }
    Logger.warn({
        message: Util.errorMessageOf(error),
        callSite: {
            file: __filename,
            function: errorHandler.name,
        },
        path: req.path,
    });
    res.status(500).json({ message: httpStatusCodes[500] });
    throw error;
};

export const getExpressApp = (serviceContext: ServiceContext): Express => {
    const app = express();
    app.use(compression());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(schema));
    app.use(openApiValidator);
    app.use(createRouter(serviceContext));
    app.use(errorHandler);

    return app;
};

export type ServiceContext = {
    postgreSqlClient: PostgreSql.Client;
};
export const createServiceContext = (): ServiceContext => {
    const config: PoolConfig = {
        host: Util.assertGetEnvValueFrom("POSTGRESQL_HOST"),
        port: Util.toNumber(Util.assertGetEnvValueFrom("POSTGRES_PORT")),
        database: Util.assertGetEnvValueFrom("POSTGRES_DB"),
        user: Util.assertGetEnvValueFrom("POSTGRESQL_USER"),
        password: Util.assertGetEnvValueFrom("POSTGRESQL_PASSWORD"),
    };
    const postgreSqlClient = PostgreSql.client(config);
    return {
        postgreSqlClient,
    };
};

export const startService = (): void => {
    const app = getExpressApp(createServiceContext());
    const port = Util.toNumber(Util.assertGetEnvValueFrom("EXPRESS_PORT"));
    const server = app.listen(port, () => {
        Logger.info({
            message: `Express Server Start. Listening to port ${port}`,
        });
    });
    server.keepAliveTimeout = 0;
};
