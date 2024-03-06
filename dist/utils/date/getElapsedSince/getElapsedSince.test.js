"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElapsedSince_1 = __importDefault(require("./getElapsedSince"));
describe("getElapsedSince util function", () => {
    it('should return "방금" and "now" for elapsed time less than a minute', () => {
        const targetDate = new Date(new Date().getTime() - 1 * 1000);
        expect((0, getElapsedSince_1.default)({ targetDate })).toBe("방금");
        expect((0, getElapsedSince_1.default)({ targetDate, language: "eng" })).toBe("now");
    });
    it('should return "5분 전" and "5minutes ago" for elapsed time 5 minutes', () => {
        const targetDate = new Date("2024-03-01T10:00:00");
        const referenceDate = new Date("2024-03-01T10:05:00");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate })).toBe("5분 전");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate, language: "eng" })).toBe("5minutes ago");
    });
    it('should return "2시간 전" and "2hours ago" for elapsed time 2 hours', () => {
        const targetDate = new Date("2024-03-01T10:00:00");
        const referenceDate = new Date("2024-03-01T12:00:00");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate })).toBe("2시간 전");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate, language: "eng" })).toBe("2hours ago");
    });
    it('should return "4일 전" and "4days ago" for elapsed time 4 days', () => {
        const targetDate = new Date("2024-03-01T10:00:00");
        const referenceDate = new Date("2024-03-05T10:00:00");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate })).toBe("4일 전");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate, language: "eng" })).toBe("4days ago");
    });
    it('should return "1달 전" and "1months ago" for elapsed time 1 months', () => {
        const targetDate = new Date("2024-03-01T10:00:00");
        const referenceDate = new Date("2024-04-01T10:00:00");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate })).toBe("1달 전");
        expect((0, getElapsedSince_1.default)({ targetDate, referenceDate, language: "eng" })).toBe("1months ago");
    });
    it("should return elapsed time using custom language object", () => {
        const targetDate = new Date("2024-03-01T10:00:00");
        const referenceDate = new Date("2024-03-01T12:00:00");
        const customLanguageObj = {
            justNow: "now~",
            minutesAgo: "minutes ago~",
            hoursAgo: "hours ago~",
            daysAgo: "days ago~",
            monthsAgo: "months ago~",
        };
        expect((0, getElapsedSince_1.default)({
            targetDate,
            referenceDate,
            customLanguageObj,
        })).toBe("2hours ago~");
    });
});
//# sourceMappingURL=getElapsedSince.test.js.map