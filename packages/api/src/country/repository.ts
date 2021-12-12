import { PoolClient } from "pg";
import { PostgreSql } from "@backend/common";
import { OffsetPagination } from "../pagination/pagination";

export const findAll = async (
    client: PoolClient,
    paramPagination: OffsetPagination
): Promise<PostgreSql.Entity.TableSchema<"country">[]> =>
    await PostgreSql.Query.selectAll<PostgreSql.Entity.TableSchema<"country">>(
        client,
        {
            sql: "SELECT * FROM country LIMIT $1 OFFSET $2;",
            values: [paramPagination.limit, paramPagination.offset],
        }
    );

export const findOneByCountryCode = async (
    client: PoolClient,
    code: string
): Promise<PostgreSql.Entity.TableSchema<"country"> | undefined> =>
    await PostgreSql.Query.selectOne<PostgreSql.Entity.TableSchema<"country">>(
        client,
        {
            sql: `SELECT * FROM country WHERE code = $1;`,
            values: [code],
        }
    );
