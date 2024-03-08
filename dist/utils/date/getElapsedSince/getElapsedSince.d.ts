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
    toDate: Date;
    fromDate?: Date;
    language?: "kr" | "eng";
    customLabels?: Labels;
};
type CustomProps = {
    toDate: Date;
    fromDate?: Date;
    language: "custom";
    customLabels: Labels;
};
type Props = DefaultProps | CustomProps;
/**
 * This function returns a string representing the elapsed time since a given target date compared to a reference date.
 *
 * @param {Object} Props - The properties object.
 * @param {Date} Props.toDate - The target date to calculate the elapsed time from.
 * @param {Date} [Props.fromDate=new Date()] - The reference date to calculate the elapsed time against. (default: new Date())
 * @param {string} [Props.language="kr"] - The language to use for the time strings. Choose between "kr" and "eng". (defaults: "kr").
 * @param {Object} [Props.customLabels] - Custom language object containing time strings. If provided, overrides the default language strings.
 */
export default function getElapsedSince({ toDate, fromDate, language, customLabels, }: Props): string;
export {};
