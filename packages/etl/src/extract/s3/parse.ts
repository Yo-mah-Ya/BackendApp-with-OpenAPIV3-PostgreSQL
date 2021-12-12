import * as Csv from "@fast-csv/parse";
import readline from "readline";
import { pipeline, Readable } from "stream";
import unzip from "unzip-stream";
import * as Iconv from "iconv-lite";
import { Util } from "@backend/common";
import { ObjectKeys, ObjectCodec, ObjectRecord } from "./object-type";

export const decodeToUTF8 = (input: Readable): NodeJS.ReadWriteStream =>
    pipeline(input, Iconv.decodeStream("Shift_JIS"), () => {});

const parseWith = (delimiter: string) =>
    async function* <T extends ObjectKeys>(
        codec: ObjectCodec<T>,
        headers: (string | undefined)[],
        input: Readable
    ): AsyncGenerator<ObjectRecord<T>> {
        const stream = pipeline(
            input,
            Csv.parse({ headers, delimiter }),
            () => {}
        );
        for await (const row of stream) {
            Util.assertWithCodec(codec, row);
            yield row;
        }
    };

export const parseCsv = parseWith(",");
export const parseTsv = parseWith("\t");

export async function* parseZip<T extends ObjectKeys>(
    codec: ObjectCodec<T>,
    headers: (string | undefined)[],
    input: Readable
): AsyncGenerator<ObjectRecord<T>> {
    const unzipped = pipeline(input, unzip.Parse(), () => {});

    for await (const event of unzipped.on("entry", () => {})) {
        const stream = pipeline(
            Readable.from([event]),
            Csv.parse({ headers, delimiter: "\t" }),
            () => {}
        );
        for await (const row of stream) {
            Util.assertWithCodec(codec, row);
            yield row;
        }
    }
}

export async function* readLines<T extends ObjectKeys>(
    codec: ObjectCodec<T>,
    input: Readable
): AsyncGenerator<ObjectRecord<T>> {
    const lines = readline.createInterface({
        input,
    });
    for await (const line of lines) {
        Util.assertWithCodec(codec, line);
        yield line;
    }
}
