import { Router, Response, NextFunction } from "express";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { ServiceContext } from "../service";
import { operations as openapiSchemaOperations } from "../types";
import { getCountryLanguageService } from "./service";
import { httpStatusCodes } from "@backend/common";

export const paths: OpenAPIV3.PathsObject = {
    "/country-languages/{code}": {
        get: {
            operationId: "getCountryLanguage",
            parameters: [
                {
                    in: "path",
                    name: "code",
                    schema: { type: "string" },
                    required: true,
                },
                {
                    in: "query",
                    name: "language",
                    schema: { type: "string" },
                    required: true,
                },
            ],
            responses: {
                "200": {
                    description: "found CountryLanguage",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CountryLanguage",
                            },
                        },
                    },
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized",
                },
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
        CountryLanguage: {
            description: "CountryLanguage",
            type: "object",
            required: ["countryCode", "language", "isOfficial", "percentage"],
            properties: {
                countryCode: { type: "string" },
                language: { type: "string" },
                isOfficial: { type: "boolean" },
                percentage: { type: "number" },
            },
        },
    },
};

export const setRouter = (router: Router, context: ServiceContext): void => {
    router.get<
        openapiSchemaOperations["getCountryLanguage"]["parameters"]["path"],
        openapiSchemaOperations["getCountryLanguage"]["responses"]["200"]["content"]["application/json"],
        never,
        openapiSchemaOperations["getCountryLanguage"]["parameters"]["query"]
    >(
        "/country-languages/:code",
        (req, res: Response, next: NextFunction): void => {
            (async function () {
                const response = await getCountryLanguageService(
                    req.params.code,
                    req.query.language,
                    context
                );
                response
                    ? res.status(200).json(response)
                    : res.status(404).json({ message: httpStatusCodes[404] });
            })().catch(next);
        }
    );
};
