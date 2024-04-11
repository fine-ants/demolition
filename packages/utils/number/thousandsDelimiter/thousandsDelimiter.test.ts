import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "./thousandsDelimiter";

describe("thousandsDelimiter and removeThousandsDelimiter utility functions", () => {
  //thousandsDelimiter
  it("should correctly format single-digit positive integers", () => {
    expect(thousandsDelimiter(1)).toBe("1");
    expect(thousandsDelimiter("1")).toBe("1");

    expect(thousandsDelimiter(10)).toBe("10");
    expect(thousandsDelimiter("10")).toBe("10");

    expect(thousandsDelimiter(100)).toBe("100");
    expect(thousandsDelimiter("100")).toBe("100");
  });

  it("should correctly format triple-digit positive integers", () => {
    expect(thousandsDelimiter(1000)).toBe("1,000");
    expect(thousandsDelimiter("1000")).toBe("1,000");

    expect(thousandsDelimiter(1000000)).toBe("1,000,000");
    expect(thousandsDelimiter("1,000,000")).toBe("1,000,000");
  });

  it("should correctly format negative numbers", () => {
    expect(thousandsDelimiter(-1)).toBe("-1");
    expect(thousandsDelimiter("-1")).toBe("-1");

    expect(thousandsDelimiter(-1000)).toBe("-1,000");
    expect(thousandsDelimiter("-1000")).toBe("-1,000");
  });

  it("should correctly format decimal numbers", () => {
    expect(thousandsDelimiter(0.1)).toBe("0.1");
    expect(thousandsDelimiter("0.1")).toBe("0.1");

    expect(thousandsDelimiter(0.12345)).toBe("0.12345");
    expect(thousandsDelimiter("0.12345")).toBe("0.12345");

    expect(thousandsDelimiter(1111.12345)).toBe("1,111.12345");
    expect(thousandsDelimiter("1111.12345")).toBe("1,111.12345");
  });

  it("should throw an error for invalid number input", () => {
    expect(() => thousandsDelimiter("hi")).toThrow('Invalid number: "hi"');
    expect(() => thousandsDelimiter("192.168.0.1")).toThrow(
      'Invalid number: "192.168.0.1"'
    );
  });

  // removeThousandsDelimiter
  it("should remove thousands delimiter from string input", () => {
    expect(removeThousandsDelimiter("1,000")).toBe("1000");
    expect(removeThousandsDelimiter("1,000,000")).toBe("1000000");
    expect(removeThousandsDelimiter("1,000.12")).toBe("1000.12");
    expect(removeThousandsDelimiter("1,000,000.12")).toBe("1000000.12");
  });

  it("should handle string input without delimiter", () => {
    expect(removeThousandsDelimiter("1000")).toBe("1000");
    expect(removeThousandsDelimiter("1000.12")).toBe("1000.12");
  });
});
