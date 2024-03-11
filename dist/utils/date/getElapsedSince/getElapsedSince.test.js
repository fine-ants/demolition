"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElapsedSince_1 = __importDefault(require("./getElapsedSince"));
describe("getElapsedSince util function", () => {
    it('should return "방금" and "just now" for elapsed time less than a minute', () => {
        const fromDate = new Date(new Date().getTime() - 59 * 1000);
        expect((0, getElapsedSince_1.default)({ fromDate, language: "ko" })).toBe("방금");
        expect((0, getElapsedSince_1.default)({ fromDate })).toBe("just now");
    });
    it('should return "1분 전" and "1minutes ago" for elapsed time 1 minutes', () => {
        const fromDate = new Date("2024-03-01T10:00:00");
        const toDate = new Date("2024-03-01T10:01:59");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("1분 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("1 minute ago");
    });
    it('should return "5분 전" and "5minutes ago" for elapsed time 5 minutes', () => {
        const fromDate = new Date("2024-03-01T10:00:00");
        const toDate = new Date("2024-03-01T10:59:59");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("59분 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("59 minutes ago");
    });
    it('should return "2시간 전" and "2hours ago" for elapsed time 2 hours', () => {
        const fromDate = new Date("2024-03-01T10:00:00");
        const toDate = new Date("2024-03-01T12:59:59");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("2시간 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("2 hours ago");
    });
    it('should return "4일 전" and "4days ago" for elapsed time 4 days', () => {
        const fromDate = new Date("2024-03-01T00:00:00");
        const toDate = new Date("2024-03-05T23:59:59");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("4일 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("4 days ago");
    });
    it('should return "5일 전" and "5days ago" for elapsed time 4 days', () => {
        const fromDate = new Date("2024-03-01T00:00:00");
        const toDate = new Date("2024-03-06T00:00:00");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("5일 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("5 days ago");
    });
    it('should return "1달 전" and "1months ago" for elapsed time 1 months', () => {
        const fromDate = new Date("2024-03-01T10:00:00");
        const toDate = new Date("2024-04-01T10:00:00");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate, language: "ko" })).toBe("1달 전");
        expect((0, getElapsedSince_1.default)({ fromDate, toDate })).toBe("1 month ago");
    });
    it("should return elapsed time using custom language object", () => {
        const fromDate = new Date("2024-03-01T10:00:00");
        const toDate = new Date("2024-03-01T12:00:00");
        const customLabels = {
            justNow: "just now~",
            minute: " minute ago~",
            minutes: " minutes ago~",
            hour: " hour ago~",
            hours: " hours ago~",
            day: " day ago~",
            days: " days ago~",
            month: " month ago~",
            months: " months ago~",
        };
        expect((0, getElapsedSince_1.default)({
            fromDate,
            toDate,
            language: "custom",
            customLabels,
        })).toBe("2 hours ago~");
    });
});
//# sourceMappingURL=getElapsedSince.test.js.map