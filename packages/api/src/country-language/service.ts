import { getCountryLanguageModel } from "./model";
import { findOneOfCountryLanguage } from "./repository";
import { ServiceContext } from "../service";
import { operations as openapiSchemaOperations } from "../types";

export const getCountryLanguageService = async (
    countryCode: string,
    language: string,
    context: ServiceContext
): Promise<
    | openapiSchemaOperations["getCountryLanguage"]["responses"]["200"]["content"]["application/json"]
    | undefined
> => {
    const response = await context.postgreSqlClient.autoTransaction((client) =>
        findOneOfCountryLanguage(client, countryCode, language)
    );
    return response ? getCountryLanguageModel(response) : undefined;
};
