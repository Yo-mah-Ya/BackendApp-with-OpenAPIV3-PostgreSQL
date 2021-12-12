import { Pool, PoolClient, QueryResult } from "pg";
import * as Logger from "../../logger";
import { errorMessageOf, omitNullish } from "../../util/util";
import { createBulkInsertQuery, createInsertQuery, Query } from "./query";
import * as Entity from "../entity";
import { nullishToNull } from "../util";
import { createUpdateQuery } from "./query";
import { createFetchUniqueRecordQuery, createRemoveQuery } from ".";

export type RunQueries<T> = (client: PoolClient) => Promise<T>;

export const autoTransaction = async <T>(
    pool: Pool,
    runQueries: RunQueries<T>
): Promise<T> => {
    const client = await pool.connect();

    try {
        return await runQueries(client);
    } finally {
        client.release();
    }
};

export const manualTransaction = async <T>(
    pool: Pool,
    runQueries: RunQueries<T>
): Promise<T> => {
    const client = await pool.connect();
    await client.query("BEGIN");

    try {
        const response = await runQueries(client);
        await client.query("COMMIT");
        return response;
    } catch (error) {
        Logger.warn({
            message: errorMessageOf(error),
            callSite: {
                file: __filename,
                function: manualTransaction.name,
            },
        });
        client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

const execute = async (
    client: PoolClient,
    query: Query
): Promise<QueryResult> => {
    try {
        return await client.query(query.sql, query.values);
    } catch (error) {
        const reason = errorMessageOf(error);
        Logger.warn({
            message: errorMessageOf(error),
            callSite: {
                file: __filename,
                function: execute.name,
            },
        });
        throw new Error(reason);
    }
};

export const selectAll = async <T = unknown>(
    client: PoolClient,
    query: Query
): Promise<T[]> =>
    (await execute(client, query)).rows.map((row) => omitNullish(row) as T);

export const selectOne = async <T = unknown>(
    client: PoolClient,
    query: Query
): Promise<T | undefined> => {
    const results = await execute(client, query);
    return results.rows.length !== 1
        ? undefined
        : (omitNullish(results.rows[0]) as T);
};

export const insert = async <T extends Entity.TableNames>(
    client: PoolClient,
    table: T,
    param: Entity.TableSchema<T>
): Promise<void> => {
    const record = nullishToNull(param);
    await execute(
        client,
        createInsertQuery(client.escapeIdentifier(table), record)
    );
};

export const selectAndUpsert = async <T extends Entity.TableNames>(
    client: PoolClient,
    table: T,
    param: Entity.UpsertTableSchema<T>
): Promise<void> => {
    if (!param) {
        Logger.warn({
            message: `bad parameters for selectAndUpsert ${param}`,
            callSite: {
                file: __filename,
                function: selectAndUpsert.name,
            },
        });
        throw new Error("bad parameters for selectAndUpsert");
    }
    const record = nullishToNull(param) as Record<string, unknown>;
    const uniqueKeys = Entity.getUniqueKeysForTable(table);
    const results = await execute(
        client,
        createFetchUniqueRecordQuery(
            client.escapeIdentifier(table),
            record,
            uniqueKeys
        )
    );
    if (results.rows.length === 0) {
        await execute(
            client,
            createInsertQuery(client.escapeIdentifier(table), record)
        );
    } else if (results.rows.length === 1) {
        await execute(
            client,
            createUpdateQuery(
                client.escapeIdentifier(table),
                record,
                results.rows[0]
            )
        );
    } else {
        Logger.warn({
            message: `Cannot Upsert With uniqueKeys : ${uniqueKeys} that cannot specify a record`,
            callSite: {
                file: __filename,
                function: selectAndUpsert.name,
            },
        });
    }
};

export const bulkInsert = async <T extends Entity.TableNames>(
    client: PoolClient,
    table: T,
    param: Entity.TableSchema<T>[]
): Promise<void> => {
    await execute(
        client,
        createBulkInsertQuery(client.escapeIdentifier(table), param)
    );
};

export const remove = async <T extends Entity.TableNames>(
    client: PoolClient,
    table: T,
    param: Partial<Entity.TableSchema<T>>
): Promise<void> => {
    await execute(
        client,
        createRemoveQuery(client.escapeIdentifier(table), param)
    );
};

export const removeAll = async <T extends Entity.TableNames>(
    client: PoolClient,
    table: T
): Promise<void> => {
    await execute(client, {
        sql: `DELETE FROM ${client.escapeIdentifier(table)};`,
        values: [],
    });
};
