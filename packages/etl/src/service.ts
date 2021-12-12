import { PoolConfig } from "pg";
import { PostgreSql, Util } from "@backend/common";

export type ServiceContext = {
    postgreSqlClient: PostgreSql.Client;
};
const createServiceContext = (): ServiceContext => {
    const config: PoolConfig = {
        host: Util.assertGetEnvValueFrom("POSTGRESQL_HOST"),
        port: Util.toNumber(Util.assertGetEnvValueFrom("POSTGRES_PORT")),
        database: Util.assertGetEnvValueFrom("POSTGRES_DB"),
        user: Util.assertGetEnvValueFrom("POSTGRESQL_USER"),
        password: Util.assertGetEnvValueFrom("POSTGRESQL_PASSWORD"),
    };
    const postgreSqlClient = PostgreSql.client(config);
    return {
        postgreSqlClient,
    };
};

export const startService = (): void => {
    createServiceContext();
};
