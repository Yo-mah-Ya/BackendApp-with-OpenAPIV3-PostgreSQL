import { Router, Response, NextFunction } from "express";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { operations as openapiSchemaOperations } from "../types";
import { ServiceContext } from "../service";
import { getCountryService, getCountriesService } from "./service";
import { httpStatusCodes } from "@backend/common";

export const paths: OpenAPIV3.PathsObject = {
    "/countries": {
        get: {
            operationId: "getCountries",
            parameters: [
                {
                    in: "query",
                    name: "limit",
                    schema: {
                        type: "integer",
                        default: 100,
                    },
                    required: false,
                },
                {
                    in: "query",
                    name: "offset",
                    schema: {
                        type: "integer",
                        default: 0,
                    },
                    required: false,
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
                                        $ref: "#/components/schemas/OffsetPageInfo",
                                    },
                                    totalCount: { type: "integer" },
                                    items: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Country",
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
    "/countries/{code}": {
        get: {
            operationId: "getCountry",
            parameters: [
                {
                    in: "path",
                    name: "code",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            responses: {
                "200": {
                    description: "found country",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Country",
                            },
                        },
                    },
                },
                "401": { $ref: "#/components/responses/Unauthorized" },
                "404": {
                    description: "Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const components: OpenAPIV3.ComponentsObject = {
    schemas: {
        Country: {
            type: "object",
            required: [
                "code",
                "name",
                "continent",
                "region",
                "surfaceArea",
                "population",
                "localName",
                "governmentForm",
                "code2",
            ],
            properties: {
                code: { type: "string" },
                name: { type: "string" },
                continent: {
                    type: "string",
                    enum: [
                        "Asia",
                        "Europe",
                        "North America",
                        "Africa",
                        "Oceania",
                        "Antarctica",
                        "South America",
                    ],
                },
                region: { type: "string" },
                surfaceArea: { type: "number" },
                independentYear: { type: "number" },
                population: { type: "number" },
                lifeExpectancy: { type: "number" },
                gnp: { type: "number" },
                gnpOld: { type: "number" },
                localName: { type: "string" },
                governmentForm: { type: "string" },
                headOfState: { type: "string" },
                capital: { type: "number" },
                code2: { type: "string" },
            },
        },
    },
};

export const setRouter = (router: Router, context: ServiceContext): void => {
    router.get<
        never,
        openapiSchemaOperations["getCountries"]["responses"]["200"]["content"]["application/json"],
        never,
        openapiSchemaOperations["getCountries"]["parameters"]["query"]
    >("/countries", (req, res: Response, next: NextFunction): void => {
        (async function () {
            const response = await getCountriesService(context, req.query);
            res.status(200).json(response);
        })().catch(next);
    });
    router.get<
        openapiSchemaOperations["getCountry"]["parameters"]["path"],
        openapiSchemaOperations["getCountry"]["responses"]["200"]["content"]["application/json"]
    >("/countries/:code", (req, res: Response, next: NextFunction): void => {
        (async function () {
            const response = await getCountryService(req.params.code, context);
            response
                ? res.status(200).json(response)
                : res.status(404).json({ message: httpStatusCodes[404] });
        })().catch(next);
    });
};
