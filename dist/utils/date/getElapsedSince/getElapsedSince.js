"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function returns a string representing the elapsed time since a given target date compared to a reference date.
 *
 * @param {Object} Props - The properties object.
 * @param {Date} [Props.fromDate] - The target date to calculate the elapsed time from.
 * @param {Date} Props.toDate - The target date to calculate the elapsed time against (default: now).
 * @param {string} [Props.language] - The language to use for the time strings. Choose between "ko" and "en" (default: "en").
 * @param {Labels} [Props.customLabels] - Custom language object containing time strings. If provided, overrides the default language strings.
 */
function getElapsedSince(props) {
    const { fromDate, toDate = new Date(), language = "en" } = props;
    const customLabels = "customLabels" in props ? props.customLabels : undefined;
    const labels = language === "custom" ? customLabels : labelsObj[language];
    const MS = 1000;
    const MINUTE = 60 * MS;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 31 * DAY;
    const diff = toDate.getTime() - fromDate.getTime();
    if (diff < MINUTE) {
        return labels.justNow;
    }
    else if (diff < HOUR) {
        return formatLabel(Math.floor(diff / MINUTE), labels.minute, labels.minutes);
    }
    else if (diff < DAY) {
        return formatLabel(Math.floor(diff / HOUR), labels.hour, labels.hours);
    }
    else if (diff < MONTH) {
        return formatLabel(Math.floor(diff / DAY), labels.day, labels.days);
    }
    else {
        return formatLabel(Math.floor(diff / MONTH), labels.month, labels.months);
    }
}
exports.default = getElapsedSince;
const labelsObj = {
    ko: {
        justNow: "방금",
        minute: "분 전",
        minutes: "분 전",
        hour: "시간 전",
        hours: "시간 전",
        day: "일 전",
        days: "일 전",
        month: "달 전",
        months: "달 전",
    },
    en: {
        justNow: "just now",
        minute: " minute ago",
        minutes: " minutes ago",
        hour: " hour ago",
        hours: " hours ago",
        day: " day ago",
        days: " days ago",
        month: " month ago",
        months: " months ago",
    },
};
const formatLabel = (number, singular, plural) => {
    return number + (number === 1 ? singular : plural);
};
//# sourceMappingURL=getElapsedSince.js.map