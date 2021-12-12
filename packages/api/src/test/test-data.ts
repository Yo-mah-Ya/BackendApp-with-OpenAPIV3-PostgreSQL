import { PostgreSql } from "@backend/common";

type TableNames = PostgreSql.Entity.TableNames;
export const testData = (): Record<
    TableNames,
    PostgreSql.Entity.UpsertTableSchema<TableNames>[]
> => ({
    city: [
        {
            id: 101,
            name: "New York",
            country_code: "USA",
            district: "New York",
            population: 8008278,
        },
        {
            id: 102,
            name: "Los Angeles",
            country_code: "USA",
            district: "California",
            population: 3694820,
        },
        {
            id: 103,
            name: "Chicago",
            country_code: "USA",
            district: "Illinois",
            population: 2896016,
        },
    ],
    country: [
        {
            code: "USA",
            name: "United States",
            continent: "North America",
            region: "North America",
            surface_area: 9363520.0,
            independent_year: 1776,
            population: 278357000,
            life_expectancy: 77.1,
            gnp: 8510700.0,
            gnp_old: 8110900.0,
            local_name: "United States",
            government_form: "Federal Republic",
            head_of_state: "George W. Bush",
            capital: 3813,
            code2: "US",
        },
    ],
    country_language: [
        {
            country_code: "USA",
            language: "Chinese",
            is_official: 0,
            percentage: 0.6,
        },
        {
            country_code: "USA",
            language: "English",
            is_official: 1,
            percentage: 86.2,
        },
        {
            country_code: "USA",
            language: "French",
            is_official: 0,
            percentage: 0.7,
        },
        {
            country_code: "USA",
            language: "German",
            is_official: 0,
            percentage: 0.7,
        },
        {
            country_code: "USA",
            language: "Italian",
            is_official: 0,
            percentage: 0.6,
        },
        {
            country_code: "USA",
            language: "Japanese",
            is_official: 0,
            percentage: 0.2,
        },
        {
            country_code: "USA",
            language: "Korean",
            is_official: 0,
            percentage: 0.3,
        },
        {
            country_code: "USA",
            language: "Polish",
            is_official: 0,
            percentage: 0.3,
        },
        {
            country_code: "USA",
            language: "Portuguese",
            is_official: 0,
            percentage: 0.2,
        },
        {
            country_code: "USA",
            language: "Spanish",
            is_official: 0,
            percentage: 7.5,
        },
        {
            country_code: "USA",
            language: "Tagalog",
            is_official: 0,
            percentage: 0.4,
        },
        {
            country_code: "USA",
            language: "Vietnamese",
            is_official: 0,
            percentage: 0.2,
        },
    ],
});
