import { operations as openapiSchemaOperations } from "../types";
import { getCountryModel } from "./model";
import { findAll, findOneByCountryCode } from "./repository";
import {
    offsetPageInfo,
    normalizeOffsetPagination,
} from "../pagination/pagination";
import { ServiceContext } from "../service";

export async function getCountryService(
    code: string,
    context: ServiceContext
): Promise<
    | openapiSchemaOperations["getCountry"]["responses"]["200"]["content"]["application/json"]
    | undefined
> {
    const country = await context.postgreSqlClient.autoTransaction((client) =>
        findOneByCountryCode(client, code)
    );
    return country ? getCountryModel(country) : undefined;
}

export async function getCountriesService(
    context: ServiceContext,
    param: openapiSchemaOperations["getCountries"]["parameters"]["query"]
): Promise<
    openapiSchemaOperations["getCountries"]["responses"]["200"]["content"]["application/json"]
> {
    const paramPagination = normalizeOffsetPagination({
        limit: param.limit,
        offset: param.offset,
    });
    const countries = await context.postgreSqlClient.autoTransaction((client) =>
        findAll(client, paramPagination)
    );
    return {
        pageInfo: offsetPageInfo(countries.length, paramPagination),
        totalCount: countries.length,
        items: countries.map((country) => getCountryModel(country)),
    };
}
