import { PostgreSql } from "@backend/common";
import { operations as openapiSchemaOperations } from "../types";

type GetCountryResponse =
    openapiSchemaOperations["getCountry"]["responses"]["200"]["content"]["application/json"];
export const getCountryModel = (
    data: PostgreSql.Entity.TableSchema<"country">
): GetCountryResponse => ({
    code: data.code,
    name: data.name,
    continent: data.continent as GetCountryResponse["continent"],
    region: data.region,
    surfaceArea: data.surface_area,
    independentYear: data.independent_year,
    population: data.population,
    lifeExpectancy: data.life_expectancy,
    gnp: data.gnp,
    gnpOld: data.gnp_old,
    localName: data.local_name,
    governmentForm: data.government_form,
    headOfState: data.head_of_state,
    capital: data.capital,
    code2: data.code2,
});
