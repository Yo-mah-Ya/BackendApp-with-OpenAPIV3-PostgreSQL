import { TableColumns } from "../index";

export type CountryLanguage = {
    country_code: string;
    language: string;
    percentage: number;
    DEFAULT: {
        is_official: 0 | 1;
    };
};
export const uniqueKeys: TableColumns<CountryLanguage>[] = [
    "country_code",
    "language",
];
