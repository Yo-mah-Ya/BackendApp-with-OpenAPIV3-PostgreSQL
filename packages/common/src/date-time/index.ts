import { format, utcToZonedTime } from "date-fns-tz";

export const formatDate = (date: Date, timeZone?: string): string =>
    format(utcToZonedTime(date, timeZone ?? "UTC"), "yyyy-MM-dd", {
        timeZone: timeZone ?? "UTC",
    });

export const formatDateTime = (date: Date, timeZone?: string): string =>
    format(
        utcToZonedTime(date, timeZone ?? "UTC"),
        "yyyy-MM-dd'T'HH:mm:ssXXX",
        {
            timeZone: timeZone ?? "UTC",
        }
    );
