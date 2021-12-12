import * as t from "io-ts";
import { ObjectKeys } from "../object-type";

export const city = t.type({
    id: t.string,
    name: t.string,
    countryCode: t.string,
    district: t.string,
    population: t.string,
});

export const isCityObjectKey = (
    key: string
): key is Extract<ObjectKeys, "city"> => /^city.csv$/.test(key);
