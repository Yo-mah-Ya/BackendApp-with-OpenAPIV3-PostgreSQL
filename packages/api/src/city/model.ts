import { PostgreSql } from "@backend/common";
import { components as openapiSchemaComponents } from "../types";

export const getCityModel = (
    data: PostgreSql.Entity.TableSchema<"city">
): openapiSchemaComponents["schemas"]["City"] => ({
    id: data.id,
    name: data.name,
    countryCode: data.country_code,
    district: data.district,
    population: data.population,
});
