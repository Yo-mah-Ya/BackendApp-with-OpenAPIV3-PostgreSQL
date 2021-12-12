import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as Logger from "./logger";
import { errorMessageOf } from "./util/util";
import { httpStatusCodes } from "./util/http-status-codes";
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status in httpStatusCodes) {
            const status = error.response
                .status as keyof typeof httpStatusCodes;
            Logger.warn({
                message: errorMessageOf(error),
                callSite: {
                    file: __filename,
                    function: axios.interceptors.response.use.name,
                },
                status,
                statusMessage: httpStatusCodes[status],
            });
        } else {
            Logger.warn({
                message: errorMessageOf(error),
                callSite: {
                    file: __filename,
                    function: axios.interceptors.response.use.name,
                },
            });
        }
        throw error;
    }
);

export const axiosRequest = async <T = unknown>(
    requestConfig: AxiosRequestConfig
): Promise<AxiosResponse<T>> => await axios.request<T>(requestConfig);
