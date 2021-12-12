import { operations as openapiSchemaOperations } from "../types";
import { getCityModel } from "./model";
import {
    findAllWithFirstTimeCursorPaginationQuery,
    findAllWithSearchNextPageCursorPaginationQuery,
    findAllWithSearchPreviousPageCursorPaginationQuery,
} from "./repository";
import * as Pagination from "../pagination/pagination";
import { ServiceContext } from "../service";

export async function getCitiesService(
    context: ServiceContext,
    param: openapiSchemaOperations["getCities"]["parameters"]["query"]
): Promise<
    openapiSchemaOperations["getCities"]["responses"]["200"]["content"]["application/json"]
> {
    if (Pagination.isParamFirstTimeCursorPagination(param)) {
        const paramPagination = Pagination.getCursorPaginationQuery(param);
        const cities = await context.postgreSqlClient.autoTransaction(
            (client) =>
                findAllWithFirstTimeCursorPaginationQuery(client, {
                    limit: paramPagination.first,
                })
        );
        return {
            pageInfo: Pagination.cursorPageInfo(cities, "id", param),
            totalCount: cities.length,
            items: cities.map((city) => getCityModel(city)),
        };
    } else if (Pagination.isParamSearchingNextPageCursorPagination(param)) {
        const paramPagination = Pagination.getCursorPaginationQuery(param);
        const cities = await context.postgreSqlClient.autoTransaction(
            (client) =>
                findAllWithSearchNextPageCursorPaginationQuery(client, {
                    limit: paramPagination.first,
                    cursor: paramPagination.after,
                })
        );
        return {
            pageInfo: Pagination.cursorPageInfo(cities, "id", param),
            totalCount: cities.length,
            items: cities.map((city) => getCityModel(city)),
        };
    } else if (Pagination.isParamSearchingPreviousPageCursorPagination(param)) {
        const paramPagination = Pagination.getCursorPaginationQuery(param);
        const cities = await context.postgreSqlClient.autoTransaction(
            (client) =>
                findAllWithSearchPreviousPageCursorPaginationQuery(client, {
                    limit: paramPagination.last,
                    cursor: paramPagination.before,
                })
        );
        return {
            pageInfo: Pagination.cursorPageInfo(cities, "id", param),
            totalCount: cities.length,
            items: cities.reverse().map((city) => getCityModel(city)),
        };
    } else {
        throw new Error(
            `bad cursor pagination query : ${JSON.stringify(param)}`
        );
    }
}
