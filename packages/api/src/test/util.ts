import { Pool, PoolClient } from "pg";
import { PostgreSql } from "@backend/common";
import { ServiceContext } from "../service";

export const serviceContextMock: ServiceContext = {
    postgreSqlClient: {
        pool: undefined as unknown as Pool,
        manualTransaction: jest.fn(),
        autoTransaction: jest.fn(),
    },
};

const cleanUp = async <T extends PostgreSql.Entity.TableNames>(
    client: PoolClient,
    testData: Record<T, PostgreSql.Entity.UpsertTableSchema<T>[]>,
    tables: T[]
): Promise<void> => {
    for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        const tableData = testData[table];
        for (let i = 0; i < tableData.length; i++) {
            await PostgreSql.Query.remove(client, table, tableData[i]);
        }
    }
};
const setUp = async <T extends PostgreSql.Entity.TableNames>(
    client: PoolClient,
    testData: Record<T, PostgreSql.Entity.UpsertTableSchema<T>[]>,
    tables: T[]
): Promise<void> => {
    for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        const tableData = testData[table];
        for (let i = 0; i < tableData.length; i++) {
            await PostgreSql.Query.insert(client, table, tableData[i]);
        }
    }
};
export const withTestData = async <
    T extends PostgreSql.Entity.TableNames,
    T2 extends T
>(
    postgreSqlClient: ServiceContext["postgreSqlClient"],
    testData: Record<T, PostgreSql.Entity.UpsertTableSchema<T>[]>,
    tables: T2[],
    func: () => Promise<void>
): Promise<void> => {
    const reversedTables = [...tables].reverse();
    await postgreSqlClient.autoTransaction(async (client) => {
        await cleanUp(client, testData, reversedTables);
        await setUp(client, testData, tables);
    });
    await func();
    await postgreSqlClient.autoTransaction(async (client) => {
        await cleanUp(client, testData, reversedTables);
    });
};
