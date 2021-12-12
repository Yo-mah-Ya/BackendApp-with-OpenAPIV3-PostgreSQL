import { Readable } from "stream";
import { Logger, S3, Util } from "@backend/common";
import { objectParseWith, ObjectKeys, ObjectRecord } from "./object-type";

export const getObject = async (param: {
    Bucket: string;
    Key: string;
}): Promise<Readable> => {
    try {
        const res = await S3.getObject(param);
        return res.Body as Readable;
    } catch (error) {
        Logger.warn({
            message: Util.errorMessageOf(error),
            Bucket: param.Bucket,
            Key: param.Key,
            callSite: {
                file: __filename,
                function: getObject.name,
            },
        });
        throw error;
    }
};

export const fetch = async <T extends ObjectKeys>(param: {
    Bucket: string;
    Key: T;
}): Promise<AsyncIterable<ObjectRecord<T>>> => {
    const object = await getObject(param);
    return objectParseWith(param.Key, object);
};
