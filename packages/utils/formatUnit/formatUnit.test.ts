import formatUnit from "./formatUnit";

describe("formatUnit util function", () => {
  it("should apply appropriate units", () => {
    expect(formatUnit(1)).toBe("1");
    expect(formatUnit(100)).toBe("100");
    expect(formatUnit(1_000)).toBe("1K");
    expect(formatUnit(1_000_000)).toBe("1M");
    expect(formatUnit(1_000_000_000)).toBe("1B");
    expect(formatUnit(1_000_000_000_000)).toBe("1T");
    expect(formatUnit(1_000_000_000_000_000)).toBe("1,000T");
  });

  it("should handle negative numbers", () => {
    expect(formatUnit(-1)).toBe("-1");
    expect(formatUnit(-100)).toBe("-100");
    expect(formatUnit(-1_000)).toBe("-1K");
    expect(formatUnit(-1_000_000)).toBe("-1M");
    expect(formatUnit(-1_000_000_000)).toBe("-1B");
    expect(formatUnit(-1_000_000_000_000)).toBe("-1T");
    expect(formatUnit(-1_000_000_000_000_000)).toBe("-1,000T");
  });

  it("should round at the specified decimal place", () => {
    // decimalPlacesToRoundAt = undefined, maxDecimalPlaces = undefined, forcedUnit = undefined (default)
    expect(formatUnit(1_668_000)).toBe("1.668M");
    expect(formatUnit(1_668_896)).toBe("1.668896M");
    // decimalPlacesToRoundAt = 2, maxDecimalPlaces = undefined, forcedUnit = undefined
    expect(formatUnit(1_668_000, { decimalPlaceToRoundAt: 2 })).toBe("1.67M");
    expect(formatUnit(166_050_000, { decimalPlaceToRoundAt: 2 })).toBe(
      "166.05M"
    );
    expect(formatUnit(166_055_000, { decimalPlaceToRoundAt: 2 })).toBe(
      "166.06M"
    );
    // decimalPlacesToRoundAt = 3, maxDecimalPlaces = undefined, forcedUnit = undefined
    expect(formatUnit(1_668_000, { decimalPlaceToRoundAt: 3 })).toBe("1.668M");
  });

  it("should show the specified number of decimal places and apply rounding", () => {
    expect(formatUnit(1_668_000, { maxDecimalPlaces: 2 })).toBe("1.67M");
    expect(formatUnit(166_050_000, { maxDecimalPlaces: 2 })).toBe("166.05M");
    expect(
      formatUnit(1_668_000, {
        decimalPlaceToRoundAt: 2,
        maxDecimalPlaces: 4,
      })
    ).toBe("1.6700M");
  });

  it("should apply appropriate units based on rounding", () => {
    expect(formatUnit(900_000_000_000)).toBe("900B");
    expect(formatUnit(999_999_999_999, { maxDecimalPlaces: 0 })).toBe("1,000B");
  });

  it("should apply the provided forced unit", () => {
    expect(formatUnit(1_000_000, { forcedUnit: "K" })).toBe("1,000K");
    expect(formatUnit(1_000_000_000, { forcedUnit: "M" })).toBe("1,000M");
    expect(formatUnit(1_000_000_000_000, { forcedUnit: "M" })).toBe(
      "1,000,000M"
    );
  });

  it("should handle extreme numbers appropriately", () => {
    expect(formatUnit(1_000_000_000_000_000)).toBe("1,000T");
    expect(formatUnit(Number.MAX_SAFE_INTEGER, { maxDecimalPlaces: 0 })).toBe(
      "9,007T"
    );
    expect(formatUnit(Number.MIN_SAFE_INTEGER, { maxDecimalPlaces: 0 })).toBe(
      "-9,007T"
    );
  });

  it("should throw an error for invalid inputs", () => {
    expect(() => formatUnit(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      "The given value is too large or too small to safely handle."
    );
    expect(() => formatUnit(Number.MIN_SAFE_INTEGER - 1)).toThrow(
      "The given value is too large or too small to safely handle."
    );
    expect(() => formatUnit(1, { decimalPlaceToRoundAt: -1 })).toThrow(
      "Decimal places must be a positive number."
    );
    expect(() => formatUnit(1, { maxDecimalPlaces: -1 })).toThrow(
      "Decimal places must be a positive number."
    );
    expect(() =>
      formatUnit(1, { decimalPlaceToRoundAt: 3, maxDecimalPlaces: 2 })
    ).toThrow(
      "The decimal place to round at cannot be greater than the number of decimal places."
    );
  });
});
