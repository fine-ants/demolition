type Labels = {
    justNow: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
    month: string;
    months: string;
};
type DefaultProps = {
    fromDate: Date;
    toDate?: Date;
    language?: "ko" | "en";
};
type CustomProps = {
    fromDate: Date;
    toDate?: Date;
    language: "custom";
    customLabels: Labels;
};
type Props = DefaultProps | CustomProps;
/**
 * This function returns a string representing the elapsed time since a given target date compared to a reference date.
 *
 * @param {Object} Props - The properties object.
 * @param {Date} [Props.fromDate] - The target date to calculate the elapsed time from.
 * @param {Date} Props.toDate - The target date to calculate the elapsed time against (default: now).
 * @param {string} [Props.language] - The language to use for the time strings. Choose between "ko" and "en" (default: "en").
 * @param {Labels} [Props.customLabels] - Custom language object containing time strings. If provided, overrides the default language strings.
 */
export default function getElapsedSince(props: Props): string;
export {};
