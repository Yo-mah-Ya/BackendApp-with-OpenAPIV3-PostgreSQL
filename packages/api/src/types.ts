/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    readonly "/cities": {
        readonly get: operations["getCities"];
    };
    readonly "/countries": {
        readonly get: operations["getCountries"];
    };
    readonly "/countries/{code}": {
        readonly get: operations["getCountry"];
    };
    readonly "/country-languages/{code}": {
        readonly get: operations["getCountryLanguage"];
    };
}

export interface components {
    readonly schemas: {
        /** Error */
        readonly Error: {
            readonly message: string;
        };
        /** CursorPageInfo */
        readonly CursorPageInfo: {
            readonly endCursor?: string;
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor?: string;
        };
        /** OffsetPageInfo */
        readonly OffsetPageInfo: {
            readonly hasNextPage: boolean;
            readonly endOffset?: number;
        };
        readonly City: {
            readonly id: number;
            readonly name: string;
            readonly countryCode: string;
            readonly district: string;
            readonly population: number;
        };
        readonly Country: {
            readonly code: string;
            readonly name: string;
            readonly continent:
                | "Asia"
                | "Europe"
                | "North America"
                | "Africa"
                | "Oceania"
                | "Antarctica"
                | "South America";
            readonly region: string;
            readonly surfaceArea: number;
            readonly independentYear?: number;
            readonly population: number;
            readonly lifeExpectancy?: number;
            readonly gnp?: number;
            readonly gnpOld?: number;
            readonly localName: string;
            readonly governmentForm: string;
            readonly headOfState?: string;
            readonly capital?: number;
            readonly code2: string;
        };
        /** CountryLanguage */
        readonly CountryLanguage: {
            readonly countryCode: string;
            readonly language: string;
            readonly isOfficial: boolean;
            readonly percentage: number;
        };
    };
    readonly responses: {
        /** Unauthorized */
        readonly Unauthorized: {
            readonly content: {
                readonly "application/json": components["schemas"]["Error"];
            };
        };
    };
    readonly parameters: {
        readonly FirstInCursorPaginationQuery: number;
        readonly AfterInCursorPaginationQuery: string;
        readonly LastInCursorPaginationQuery: number;
        readonly BeforeInCursorPaginationQuery: string;
    };
}

export interface operations {
    readonly getCities: {
        readonly parameters: {
            readonly query: {
                readonly first?: components["parameters"]["FirstInCursorPaginationQuery"];
                readonly after?: components["parameters"]["AfterInCursorPaginationQuery"];
                readonly last?: components["parameters"]["LastInCursorPaginationQuery"];
                readonly before?: components["parameters"]["BeforeInCursorPaginationQuery"];
            };
        };
        readonly responses: {
            /** found countries */
            readonly 200: {
                readonly content: {
                    readonly "application/json": {
                        readonly pageInfo: components["schemas"]["CursorPageInfo"];
                        readonly totalCount: number;
                        readonly items: readonly components["schemas"]["City"][];
                    };
                };
            };
            readonly 401: components["responses"]["Unauthorized"];
        };
    };
    readonly getCountries: {
        readonly parameters: {
            readonly query: {
                readonly limit?: number;
                readonly offset?: number;
            };
        };
        readonly responses: {
            /** found countries */
            readonly 200: {
                readonly content: {
                    readonly "application/json": {
                        readonly pageInfo: components["schemas"]["OffsetPageInfo"];
                        readonly totalCount: number;
                        readonly items: readonly components["schemas"]["Country"][];
                    };
                };
            };
            readonly 401: components["responses"]["Unauthorized"];
        };
    };
    readonly getCountry: {
        readonly parameters: {
            readonly path: {
                readonly code: string;
            };
        };
        readonly responses: {
            /** found country */
            readonly 200: {
                readonly content: {
                    readonly "application/json": components["schemas"]["Country"];
                };
            };
            readonly 401: components["responses"]["Unauthorized"];
            /** Not Found */
            readonly 404: {
                readonly content: {
                    readonly "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    readonly getCountryLanguage: {
        readonly parameters: {
            readonly path: {
                readonly code: string;
            };
            readonly query: {
                readonly language: string;
            };
        };
        readonly responses: {
            /** found CountryLanguage */
            readonly 200: {
                readonly content: {
                    readonly "application/json": components["schemas"]["CountryLanguage"];
                };
            };
            readonly 401: components["responses"]["Unauthorized"];
            /** Not Found */
            readonly 404: {
                readonly content: {
                    readonly "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}