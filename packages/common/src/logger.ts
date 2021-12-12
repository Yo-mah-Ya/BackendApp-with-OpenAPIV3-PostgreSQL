import { formatDateTime } from "./date-time";

type LogMessage = {
    message: string;
    callSite?: {
        file: string;
        function?: string;
        line?: string;
    };
};

const logLevel = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    CRITICAL: 5,
} as const;
type LogLevel = keyof typeof logLevel;
const specifiedLogLevel =
    process.env.LOG_LEVEL && process.env.LOG_LEVEL in logLevel
        ? (process.env.LOG_LEVEL as LogLevel)
        : ("INFO" as LogLevel);
const createMessageWith =
    (paramLogLevel: LogLevel) =>
    <T extends LogMessage>(message: T): void => {
        if (logLevel[specifiedLogLevel] > logLevel[paramLogLevel]) return;
        console.dir(
            `[${paramLogLevel}] ${formatDateTime(new Date())} ${JSON.stringify(
                message
            )}`
        );
    };

export const trace = createMessageWith("TRACE");
export const debug = createMessageWith("DEBUG");
export const info = createMessageWith("INFO");
export const warn = createMessageWith("WARN");
export const error = createMessageWith("ERROR");
export const critical = createMessageWith("CRITICAL");
