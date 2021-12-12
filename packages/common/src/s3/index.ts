import * as S3 from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3.S3Client({ region: process.env.AWS_REGION });

export const getObject = async (
    input: S3.GetObjectCommandInput
): Promise<S3.GetObjectCommandOutput> =>
    await s3.send(new S3.GetObjectCommand(input));

export const listObjectV2 = async (
    param: S3.ListObjectsV2CommandInput
): Promise<S3.ListObjectsV2CommandOutput["Contents"][]> => {
    const contents: S3.ListObjectsV2CommandOutput["Contents"][] = [];
    const input = {
        ...param,
    };
    for (;;) {
        const response = await s3.send(new S3.ListObjectsV2Command(input));
        if ("Contents" in response) {
            contents.concat(response.Contents);
            if ("NextContinuationToken" in response) {
                input.ContinuationToken = response.NextContinuationToken;
                continue;
            }
        }
        break;
    }
    return contents;
};

export const putObject = async (
    input: S3.PutObjectCommandInput
): Promise<void> => {
    await s3.send(new S3.PutObjectCommand(input));
};

export const upload = async (
    input: S3.PutObjectCommandInput
): Promise<void> => {
    const upload = new Upload({
        client: s3,
        params: input,
    });
    await upload.done();
};
