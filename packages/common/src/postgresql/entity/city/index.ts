import { TableColumns } from "../index";
export type City = {
    id: number;
    name: string;
    country_code: string;
    district: string;
    DEFAULT: {
        population: number;
    };
};
export const uniqueKeys: TableColumns<City>[] = [
    "country_code",
    "district",
    "name",
];
