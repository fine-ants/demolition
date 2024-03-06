type Props = {
    targetDate: Date;
    referenceDate?: Date;
    language?: "kr" | "eng";
    customLanguageObj?: {
        justNow: string;
        minutesAgo: string;
        hoursAgo: string;
        daysAgo: string;
        monthsAgo: string;
    };
};
/**
 * This function returns a string representing the elapsed time since a given target date compared to a reference date.
 *
 * @param {Object} Props - The properties object.
 * @param {Date} Props.targetDate - The target date to calculate the elapsed time from.
 * @param {Date} [Props.referenceDate=new Date()] - The reference date to calculate the elapsed time against. (default: new Date())
 * @param {string} [Props.language="kr"] - The language to use for the time strings. Choose between "kr" and "eng". (defaults: "kr").
 * @param {Object} [Props.customLanguageObj] - Custom language object containing time strings. If provided, overrides the default language strings.
 */
export default function getElapsedSince({ targetDate, referenceDate, language, customLanguageObj, }: Props): string;
export {};
