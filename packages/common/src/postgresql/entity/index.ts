import { City, uniqueKeys as cityUniqueKeys } from "./city";
import { Country, uniqueKeys as countryUniqueKeys } from "./country";
import {
    CountryLanguage,
    uniqueKeys as countryLanguageUniqueKeys,
} from "./country-language";

export type TableColumns<T extends Record<"DEFAULT", unknown>> = Readonly<
    keyof (Omit<T, "DEFAULT"> & T["DEFAULT"])
>;
type TableSchemas = {
    city: City;
    country: Country;
    country_language: CountryLanguage;
};
export type TableNames = keyof TableSchemas;

export const getUniqueKeysForTable = <T extends TableNames>(
    table: T
): string[] =>
    ({
        city: cityUniqueKeys,
        country_language: countryLanguageUniqueKeys,
        country: countryUniqueKeys,
    }[table]);

export type TableSchema<T extends TableNames> = T extends TableNames
    ? TableSchemas[T]["DEFAULT"] extends Record<string, never>
        ? Omit<TableSchemas[T], "DEFAULT">
        : Omit<TableSchemas[T], "DEFAULT"> & TableSchemas[T]["DEFAULT"]
    : never;
export type UpsertTableSchema<T extends TableNames> = T extends TableNames
    ? TableSchemas[T]["DEFAULT"] extends Record<string, never>
        ? Omit<TableSchemas[T], "DEFAULT">
        : Omit<TableSchemas[T], "DEFAULT"> & Partial<TableSchemas[T]["DEFAULT"]>
    : never;
