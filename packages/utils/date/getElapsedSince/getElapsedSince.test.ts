import getElapsedSince from "./getElapsedSince";

describe("getElapsedSince util function", () => {
  it('should return "방금" and "just now" for elapsed time less than a minute', () => {
    const toDate = new Date(new Date().getTime() - 59 * 1000);

    expect(getElapsedSince({ toDate, language: "kr" })).toBe("방금");
    expect(getElapsedSince({ toDate })).toBe("just now");
  });

  it('should return "1분 전" and "1minutes ago" for elapsed time 1 minutes', () => {
    const toDate = new Date("2024-03-01T10:00:00");
    const fromDate = new Date("2024-03-01T10:01:59");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "1분 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("1minute ago");
  });

  it('should return "5분 전" and "5minutes ago" for elapsed time 5 minutes', () => {
    const toDate = new Date("2024-03-01T10:00:00");
    const fromDate = new Date("2024-03-01T10:59:59");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "59분 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("59minutes ago");
  });

  it('should return "2시간 전" and "2hours ago" for elapsed time 2 hours', () => {
    const toDate = new Date("2024-03-01T10:00:00");
    const fromDate = new Date("2024-03-01T12:59:59");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "2시간 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("2hours ago");
  });

  it('should return "4일 전" and "4days ago" for elapsed time 4 days', () => {
    const toDate = new Date("2024-03-01T00:00:00");
    const fromDate = new Date("2024-03-05T23:59:59");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "4일 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("4days ago");
  });

  it('should return "5일 전" and "5days ago" for elapsed time 4 days', () => {
    const toDate = new Date("2024-03-01T00:00:00");
    const fromDate = new Date("2024-03-06T00:00:00");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "5일 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("5days ago");
  });

  it('should return "1달 전" and "1months ago" for elapsed time 1 months', () => {
    const toDate = new Date("2024-03-01T10:00:00");
    const fromDate = new Date("2024-04-01T10:00:00");

    expect(getElapsedSince({ toDate, fromDate, language: "kr" })).toBe(
      "1달 전"
    );
    expect(getElapsedSince({ toDate, fromDate })).toBe("1month ago");
  });

  it("should return elapsed time using custom language object", () => {
    const toDate = new Date("2024-03-01T10:00:00");
    const fromDate = new Date("2024-03-01T12:00:00");
    const customLabels = {
      justNow: "just now~",
      minute: "minute ago~",
      minutes: "minutes ago~",
      hour: "hour ago~",
      hours: "hours ago~",
      day: "day ago~",
      days: "days ago~",
      month: "month ago~",
      months: "months ago~",
    };

    expect(
      getElapsedSince({
        toDate,
        fromDate,
        language: "custom",
        customLabels,
      })
    ).toBe("2hours ago~");
  });
});
