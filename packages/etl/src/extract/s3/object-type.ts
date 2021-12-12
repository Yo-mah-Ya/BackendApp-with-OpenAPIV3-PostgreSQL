import * as t from "io-ts";
import { Readable } from "stream";
import { city } from "./city/schema";
import { country } from "./country/schema";
import { countryLanguage } from "./country-language/schema";
import { parseCsv, parseZip, readLines } from "./parse";

const objectKeysWithCodecsAndParser = {
    country: {
        codec: country,
        parser: (input: Readable) => readLines(country, input),
    },
    countryLanguage: {
        codec: countryLanguage,
        parser: (input: Readable) =>
            parseZip(countryLanguage, Object.keys(countryLanguage), input),
    },
    city: {
        codec: city,
        parser: (input: Readable) =>
            parseCsv(
                city,
                ["id", "name", "countryCode", "district", "population"],
                input
            ),
    },
};

export type ObjectKeys = keyof typeof objectKeysWithCodecsAndParser;
export type ObjectCodec<T extends ObjectKeys> =
    typeof objectKeysWithCodecsAndParser[T]["codec"];
export type ObjectRecord<T extends ObjectKeys> = t.TypeOf<ObjectCodec<T>>;

export const objectParseWith = <T extends ObjectKeys>(
    key: T,
    object: Readable
): AsyncIterable<ObjectRecord<T>> =>
    objectKeysWithCodecsAndParser[key].parser(object);
