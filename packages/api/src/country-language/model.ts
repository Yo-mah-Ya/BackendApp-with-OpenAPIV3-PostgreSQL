import { PostgreSql } from "@backend/common";
import { operations as openapiSchemaOperations } from "../types";

export const getCountryLanguageModel = (
    data: PostgreSql.Entity.TableSchema<"country_language">
): openapiSchemaOperations["getCountryLanguage"]["responses"]["200"]["content"]["application/json"] => ({
    countryCode: data.country_code,
    language: data.language,
    isOfficial: !!data.is_official,
    percentage: data.percentage,
});
