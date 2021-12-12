export const nullishToNull = <T extends Record<string, unknown>>(
    obj: T
): Exclude<T, undefined> =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) =>
            value == undefined ? [key, null] : [key, value]
        )
    ) as Exclude<T, undefined>;

export const omitNullish = <T extends Record<string, unknown>>(
    obj: T
): Exclude<T, undefined | null> =>
    Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value != undefined)
    ) as Exclude<T, undefined | null>;
