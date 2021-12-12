import { isNotNullish } from "../../util/util";
import { nullishToNull } from "../util";

export type Query = {
    sql: string;
    values: unknown[];
};

export const createInsertQuery = (
    table: string,
    record: Record<string, unknown>
): Query => {
    const columns = Object.keys(record);
    return {
        sql: `INSERT INTO ${table} (${columns.join(",")}) VALUES (${columns
            .map((_, index) => `$${index + 1}`)
            .join(",")});`,
        values: Object.values(nullishToNull(record)),
    };
};

export const createUpdateQuery = (
    table: string,
    param: Record<string, unknown>,
    where: Record<string, unknown>
): Query => {
    let index = 1;
    return {
        sql: `UPDATE ${table} SET ${Object.keys(param)
            .map((column) => {
                const statement = `${column} = $${index}`;
                index++;
                return statement;
            })
            .join(", ")} WHERE 1 = 1 ${Object.keys(where)
            .map((column) => {
                const statement = `AND ${column} = $${index}`;
                index++;
                return statement;
            })
            .join(" ")};`,
        values: [
            ...Object.values(nullishToNull(param)),
            ...Object.values(nullishToNull(where)),
        ],
    };
};

export const createFetchUniqueRecordQuery = <T extends Record<string, unknown>>(
    table: string,
    record: T,
    uniqueKeys: (keyof T)[]
): Query => {
    let index = 1;
    return {
        sql: `SELECT * FROM ${table} WHERE 1 = 1 ${Object.entries(record)
            .map(([column, value]) => {
                if (uniqueKeys.includes(column)) {
                    if (value == undefined) {
                        return `AND ${column} IS NULL`;
                    }
                    const condition = `AND ${column} = $${index}`;
                    index++;
                    return condition;
                }
                return undefined;
            })
            .filter(isNotNullish)
            .join(" ")};`,
        values: Object.keys(record)
            .map((column) =>
                uniqueKeys.includes(column) && column in record
                    ? record[column]
                    : undefined
            )
            .filter(isNotNullish),
    };
};

export const createBulkInsertQuery = (
    table: string,
    records: Record<string, unknown>[]
): Query => {
    if (records.length === 0) throw new Error("records must be more than one");
    const columns = Object.keys(records[0]);
    const values = records
        .map((record) => Object.values(nullishToNull(record)))
        .flat();
    let index = 1;
    return {
        sql: `INSERT INTO ${table} (${columns.join(",")}) VALUES ${records
            .map(
                () =>
                    `(${[...Array(columns.length).keys()]
                        .map(() => {
                            const placeholder = `$${index}`;
                            index++;
                            return placeholder;
                        })
                        .join(",")})`
            )
            .join(", ")};`,
        values,
    };
};

export const createRemoveQuery = (
    table: string,
    record: Record<string, unknown>
): Query => {
    let index = 1;
    return {
        sql: `DELETE FROM ${table} WHERE 1 = 1 ${Object.entries(record)
            .map(([column, value]) => {
                if (value == undefined) {
                    return `AND ${column} IS NULL`;
                }
                const condition = `AND ${column} = $${index}`;
                index++;
                return condition;
            })
            .join(" ")};`,
        values: [...Object.values(nullishToNull(record))],
    };
};
