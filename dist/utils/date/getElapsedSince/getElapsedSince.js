"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function returns a string representing the elapsed time since a given target date compared to a reference date.
 *
 * @param {Object} Props - The properties object.
 * @param {Date} Props.targetDate - The target date to calculate the elapsed time from.
 * @param {Date} [Props.referenceDate=new Date()] - The reference date to calculate the elapsed time against. (default: new Date())
 * @param {string} [Props.language="kr"] - The language to use for the time strings. Choose between "kr" and "eng". (defaults: "kr").
 * @param {Object} [Props.customLanguageObj] - Custom language object containing time strings. If provided, overrides the default language strings.
 */
function getElapsedSince({ targetDate, referenceDate = new Date(), language = "kr", customLanguageObj, }) {
    const languageObj = {
        kr: {
            justNow: "방금",
            minutesAgo: "분 전",
            hoursAgo: "시간 전",
            daysAgo: "일 전",
            monthsAgo: "달 전",
        },
        eng: {
            justNow: "now",
            minutesAgo: "minutes ago",
            hoursAgo: "hours ago",
            daysAgo: "days ago",
            monthsAgo: "months ago",
        },
    };
    const MS = 1000;
    const MINUTE = 60 * MS;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 31 * DAY;
    const diff = referenceDate.getTime() - targetDate.getTime();
    const strings = customLanguageObj === undefined ? languageObj[language] : customLanguageObj;
    if (diff < MINUTE) {
        return strings.justNow;
    }
    else if (diff < HOUR) {
        return Math.floor(diff / MINUTE) + strings.minutesAgo;
    }
    else if (diff < DAY) {
        return Math.floor(diff / HOUR) + strings.hoursAgo;
    }
    else if (diff < MONTH) {
        return Math.floor(diff / DAY) + strings.daysAgo;
    }
    else {
        return Math.floor(diff / MONTH) + strings.monthsAgo;
    }
}
exports.default = getElapsedSince;
//# sourceMappingURL=getElapsedSince.js.map