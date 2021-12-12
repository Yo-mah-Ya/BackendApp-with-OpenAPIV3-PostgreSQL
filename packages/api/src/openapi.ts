import deepmerge from "deepmerge";
import * as OpenApiValidator from "express-openapi-validator";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import {
    components as cityComponents,
    paths as cityPaths,
} from "./city/controller";
import {
    components as countryComponents,
    paths as countryPaths,
} from "./country/controller";
import {
    components as countryLanguageComponents,
    paths as countryLanguagePaths,
} from "./country-language/controller";

const commonComponents: OpenAPIV3.ComponentsObject = {
    parameters: {
        FirstInCursorPaginationQuery: {
            name: "first",
            in: "query",
            schema: {
                type: "integer",
                minimum: 1,
            },
        },
        AfterInCursorPaginationQuery: {
            name: "after",
            in: "query",
            schema: {
                type: "string",
            },
        },
        LastInCursorPaginationQuery: {
            name: "last",
            in: "query",
            schema: {
                type: "integer",
                minimum: 1,
            },
        },
        BeforeInCursorPaginationQuery: {
            name: "before",
            in: "query",
            schema: {
                type: "string",
            },
        },
    },
    schemas: {
        Error: {
            description: "Error",
            type: "object",
            required: ["message"],
            properties: { message: { type: "string" } },
        },
        CursorPageInfo: {
            description: "CursorPageInfo",
            type: "object",
            required: ["hasPreviousPage", "hasNextPage"],
            properties: {
                endCursor: { type: "string" },
                hasNextPage: { type: "boolean" },
                hasPreviousPage: { type: "boolean" },
                startCursor: { type: "string" },
            },
        },
        OffsetPageInfo: {
            description: "OffsetPageInfo",
            type: "object",
            required: ["hasNextPage"],
            properties: {
                hasNextPage: { type: "boolean" },
                endOffset: { type: "number" },
            },
        },
    },
    responses: {
        Unauthorized: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Error",
                    },
                },
            },
        },
    },
};

const paths = deepmerge.all<OpenAPIV3.PathsObject>([
    cityPaths,
    countryPaths,
    countryLanguagePaths,
]);
const components = deepmerge.all<OpenAPIV3.ComponentsObject>([
    commonComponents,
    cityComponents,
    countryComponents,
    countryLanguageComponents,
]);
export const schema: OpenAPIV3.Document = {
    openapi: "3.0.3",
    info: {
        title: "backend api",
        version: "v1",
    },
    paths: paths,
    components: components,
};

export const schemaPath = "/schema.json";
export const healthCheckPath = "/health-check";

export const openApiValidator = OpenApiValidator.middleware({
    apiSpec: schema,
    ignorePaths: new RegExp(`^${schemaPath}$|^${healthCheckPath}$`),
    validateRequests: true,
    validateResponses: true,
});
