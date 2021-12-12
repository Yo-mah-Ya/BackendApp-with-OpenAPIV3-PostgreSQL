import { TableColumns } from "../index";

export enum Continent {
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "North America",
    Africa = "Africa",
    Oceania = "Oceania",
    Antarctica = "Antarctica",
    SouthAmerica = "South America",
}
export type Country = {
    code: string;
    name: string;
    continent:
        | "Asia"
        | "Europe"
        | "North America"
        | "Africa"
        | "Oceania"
        | "Antarctica"
        | "South America";
    region: string;
    surface_area: number;
    independent_year?: number;
    population: number;
    life_expectancy?: number;
    gnp?: number;
    gnp_old?: number;
    local_name: string;
    government_form: string;
    head_of_state?: string;
    capital?: number;
    code2: string;
    DEFAULT: Record<string, never>;
};
export const uniqueKeys: TableColumns<Country>[] = ["code"];
