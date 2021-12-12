import { Router, Response, NextFunction } from "express";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { operations as openapiSchemaOperations } from "../types";
import { ServiceContext } from "../service";
import { getCitiesService } from "./service";

export const paths: OpenAPIV3.PathsObject = {
    "/cities": {
        get: {
            operationId: "getCities",
            parameters: [
                {
                    $ref: "#/components/parameters/FirstInCursorPaginationQuery",
                },
                {
                    $ref: "#/components/parameters/AfterInCursorPaginationQuery",
                },
                {
                    $ref: "#/components/parameters/LastInCursorPaginationQuery",
                },
                {
                    $ref: "#/components/parameters/BeforeInCursorPaginationQuery",
                },
            ],
            responses: {
                "200": {
                    description: "found countries",
                    content: {
                        "application/json": {
                            schema: {
                                description: "countries",
                                type: "object",
                                required: ["pageInfo", "totalCount", "items"],
                                properties: {
                                    pageInfo: {
                                        $ref: "#/components/schemas/CursorPageInfo",
                                    },
                                    totalCount: { type: "integer" },
                                    items: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/City",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                "401": { $ref: "#/components/responses/Unauthorized" },
            },
        },
    },
};

export const components: OpenAPIV3.ComponentsObject = {
    schemas: {
        City: {
            type: "object",
            required: ["id", "name", "countryCode", "district", "population"],
            properties: {
                id: { type: "number" },
                name: { type: "string" },
                countryCode: { type: "string" },
                district: { type: "string" },
                population: { type: "integer" },
            },
        },
    },
};

export const setRouter = (router: Router, context: ServiceContext): void => {
    router.get<
        never,
        openapiSchemaOperations["getCities"]["responses"]["200"]["content"]["application/json"],
        never,
        openapiSchemaOperations["getCities"]["parameters"]["query"]
    >("/cities", (req, res: Response, next: NextFunction): void => {
        (async function () {
            const response = await getCitiesService(context, req.query);
            res.status(200).json(response);
        })().catch(next);
    });
};
