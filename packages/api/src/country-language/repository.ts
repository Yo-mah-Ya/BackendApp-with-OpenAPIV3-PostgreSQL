import { PoolClient } from "pg";
import { PostgreSql } from "@backend/common";

export const findOneOfCountryLanguage = async (
    client: PoolClient,
    countryCode: string,
    language: string
): Promise<PostgreSql.Entity.TableSchema<"country_language"> | undefined> =>
    await PostgreSql.selectOne<
        PostgreSql.Entity.TableSchema<"country_language">
    >(client, {
        sql: `SELECT * FROM country_language WHERE country_code = $1 AND language = $2`,
        values: [countryCode, language],
    });
