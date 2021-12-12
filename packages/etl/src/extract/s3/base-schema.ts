import * as t from "io-ts";

export interface Double {
    readonly double: unique symbol;
}
export const double = t.brand(
    t.string,
    (s: string): s is t.Branded<string, Double> => /^\d+\.\d+$/.test(s),
    "double"
);

export interface Integer {
    readonly integer: unique symbol;
}
export const integer = t.brand(
    t.string,
    (s: string): s is t.Branded<string, Integer> => /^\d+$/.test(s),
    "integer"
);

export interface DateString {
    readonly dateString: unique symbol;
}
export const dateString = t.brand(
    t.string,
    (s: string): s is t.Branded<string, DateString> =>
        /^\d{4}-\d{2}-\d{2}$/.test(s),
    "dateString"
);

export interface DateTimeString {
    readonly dateTimeString: unique symbol;
}
export const dateTimeString = t.brand(
    t.string,
    (s: string): s is t.Branded<string, DateTimeString> =>
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s),
    "dateTimeString"
);
