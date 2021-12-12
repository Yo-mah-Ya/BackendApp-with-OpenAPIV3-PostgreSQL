import * as t from "io-ts";
import { ObjectKeys } from "../object-type";

export const country = t.intersection([
    t.type({
        code: t.string,
        name: t.string,
        continent: t.keyof({
            Asia: null,
            Europe: null,
            NorthAmerica: null,
            Africa: null,
            Oceania: null,
            Antarctica: null,
            SouthAmerica: null,
        }),
        region: t.string,
        surfaceArea: t.string,
        population: t.string,
        localName: t.string,
        governmentForm: t.string,
        code2: t.string,
    }),
    t.partial({
        independentYear: t.string,
        lifeExpectancy: t.string,
        gnp: t.string,
        gnpOld: t.string,
        headOfState: t.string,
        capital: t.string,
    }),
]);

export const isCountryObjectKey = (
    key: string
): key is Extract<ObjectKeys, "country"> => /^country.txt$/.test(key);
