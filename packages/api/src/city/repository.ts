import { PoolClient } from "pg";
import { PostgreSql } from "@backend/common";

const findAllWith =
    (sql: string) =>
    async (
        client: PoolClient,
        param: { limit: number; cursor?: unknown }
    ): Promise<PostgreSql.Entity.TableSchema<"city">[]> =>
        await PostgreSql.Query.selectAll<PostgreSql.Entity.TableSchema<"city">>(
            client,
            {
                sql,
                values: param.cursor
                    ? [param.cursor, param.limit]
                    : [param.limit],
            }
        );

export const findAllWithFirstTimeCursorPaginationQuery = findAllWith(
    "SELECT * FROM city ORDER BY id ASC LIMIT $1;"
);
export const findAllWithSearchNextPageCursorPaginationQuery = findAllWith(
    "SELECT * FROM city WHERE id > $1 ORDER BY id ASC LIMIT $2;"
);
export const findAllWithSearchPreviousPageCursorPaginationQuery = findAllWith(
    "SELECT * FROM city WHERE id < $1 ORDER BY id DESC LIMIT $2;"
);
