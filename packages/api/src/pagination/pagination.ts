import { components } from "../types";
import * as t from "io-ts";
import { Util } from "@backend/common";

/**
 * Cursor Pagination
 */
// first time to get items.
const firstTimeCursorPagination = t.intersection([
    t.type({ first: t.number }),
    t.partial({ after: t.undefined, last: t.undefined, before: t.undefined }),
]);
type ParamFirstTimeCursorPagination = t.TypeOf<
    typeof firstTimeCursorPagination
>;
export const isParamFirstTimeCursorPagination = (
    paramPagination: unknown
): paramPagination is ParamFirstTimeCursorPagination =>
    firstTimeCursorPagination.is(paramPagination);
export type FirstTimeCursorPaginationQuery = Pick<
    ParamFirstTimeCursorPagination,
    "first"
>;

// set the "after" argument. The user would searches the next page
const searchingNextPageCursorPagination = t.intersection([
    t.type({ first: t.number, after: t.string }),
    t.partial({ last: t.undefined, before: t.undefined }),
]);
type ParamSearchingNextPageCursorPagination = t.TypeOf<
    typeof searchingNextPageCursorPagination
>;
export const isParamSearchingNextPageCursorPagination = (
    paramPagination: unknown
): paramPagination is ParamSearchingNextPageCursorPagination =>
    searchingNextPageCursorPagination.is(paramPagination);

export type SearchingNextPageCursorPaginationQuery = Pick<
    ParamSearchingNextPageCursorPagination,
    "first"
> & { after: unknown };

// set the "before" argument. The user would searches the previous page
const searchingPreviousPageCursorPagination = t.intersection([
    t.partial({ first: t.undefined, after: t.undefined }),
    t.type({ last: t.number, before: t.string }),
]);
type ParamSearchingPreviousPageCursorPagination = t.TypeOf<
    typeof searchingPreviousPageCursorPagination
>;
export const isParamSearchingPreviousPageCursorPagination = (
    paramPagination: unknown
): paramPagination is ParamSearchingPreviousPageCursorPagination =>
    searchingPreviousPageCursorPagination.is(paramPagination);
export type SearchingPreviousPageCursorPaginationQuery = Pick<
    ParamSearchingPreviousPageCursorPagination,
    "last"
> & { before: unknown };

type CursorPagination =
    | ParamFirstTimeCursorPagination
    | ParamSearchingNextPageCursorPagination
    | ParamSearchingPreviousPageCursorPagination;
export type CursorPaginationQueries =
    | FirstTimeCursorPaginationQuery
    | SearchingNextPageCursorPaginationQuery
    | SearchingPreviousPageCursorPaginationQuery;

export function getCursorPaginationQuery(
    paramPagination: ParamFirstTimeCursorPagination
): FirstTimeCursorPaginationQuery;
export function getCursorPaginationQuery(
    paramPagination: ParamSearchingNextPageCursorPagination
): SearchingNextPageCursorPaginationQuery;
export function getCursorPaginationQuery(
    paramPagination: ParamSearchingPreviousPageCursorPagination
): SearchingPreviousPageCursorPaginationQuery;
export function getCursorPaginationQuery(
    paramPagination: CursorPagination
): CursorPaginationQueries {
    if (isParamFirstTimeCursorPagination(paramPagination)) {
        return {
            first: Math.min(paramPagination.first, 500),
        };
    } else if (isParamSearchingNextPageCursorPagination(paramPagination)) {
        return {
            first: Math.min(paramPagination.first, 500),
            after: decodeCursor(paramPagination.after),
        };
    } else if (isParamSearchingPreviousPageCursorPagination(paramPagination)) {
        return {
            last: Math.min(paramPagination.last, 500),
            before: decodeCursor(paramPagination.before),
        };
    } else {
        throw Util.unexpectedDefault(
            paramPagination,
            new Error(
                `bad cursor pagination query : ${JSON.stringify(
                    paramPagination
                )}`
            )
        );
    }
}
export const cursorPageInfo = <T extends Record<string, unknown>>(
    items: T[],
    cursor: keyof T,
    paramPagination: CursorPagination
): components["schemas"]["CursorPageInfo"] => {
    const { firstItem, lastItem } = items.length
        ? { firstItem: items[0], lastItem: items[items.length - 1] }
        : { firstItem: undefined, lastItem: undefined };
    const startCursor =
        firstItem && cursor in firstItem
            ? encodeCursor(firstItem[cursor])
            : undefined;
    const endCursor =
        lastItem && cursor in lastItem
            ? encodeCursor(lastItem[cursor])
            : undefined;

    if (isParamFirstTimeCursorPagination(paramPagination)) {
        return {
            endCursor,
            hasPreviousPage: false,
            hasNextPage: paramPagination.first <= items.length,
            startCursor,
        };
    } else if (isParamSearchingNextPageCursorPagination(paramPagination)) {
        return {
            endCursor,
            hasPreviousPage: true,
            hasNextPage: paramPagination.first <= items.length,
            startCursor,
        };
    } else if (isParamSearchingPreviousPageCursorPagination(paramPagination)) {
        return {
            endCursor,
            hasPreviousPage: paramPagination.last <= items.length,
            hasNextPage: true,
            startCursor,
        };
    } else {
        throw Util.unexpectedDefault(
            paramPagination,
            new Error(
                `bad cursor pagination query : ${JSON.stringify(
                    paramPagination
                )}`
            )
        );
    }
};
const decodeCursor = (cursor: string): unknown =>
    JSON.parse(Buffer.from(cursor, "base64").toString());

const encodeCursor = (cursor: unknown): string =>
    Buffer.from(JSON.stringify(cursor)).toString("base64");

/**
 * Offset Pagination
 */
export type OffsetPagination = {
    limit: number;
    offset: number;
};
export const offsetPageInfo = (
    foundCount: number,
    paramPagination: OffsetPagination
): components["schemas"]["OffsetPageInfo"] => {
    if (foundCount === 0) {
        return {
            hasNextPage: false,
            endOffset: undefined,
        };
    }
    return {
        hasNextPage: paramPagination.limit <= foundCount,
        endOffset: paramPagination.offset + foundCount - 1,
    };
};

export const normalizeOffsetPagination = (
    paramPagination: Partial<OffsetPagination>
): OffsetPagination => ({
    limit: paramPagination.limit ? Math.min(paramPagination.limit, 500) : 500,
    offset: paramPagination.offset ? Math.min(paramPagination.offset, 500) : 0,
});
