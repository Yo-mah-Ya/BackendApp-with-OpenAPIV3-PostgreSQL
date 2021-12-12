import * as t from "io-ts";
import { ObjectKeys } from "../object-type";
import { double } from "../base-schema";

export const countryLanguage = t.type({
    countryCode: t.string,
    language: t.string,
    isOfficial: t.keyof({
        "0": null,
        "1": null,
    }),
    percentage: double,
});

export const isCountryLanguageObjectKey = (
    key: string
): key is Extract<ObjectKeys, "countryLanguage"> =>
    /^countryLanguage.txt$/.test(key);
