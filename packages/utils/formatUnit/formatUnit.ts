type Unit = "K" | "M" | "B" | "T" | "";
type Sign = "-" | "";

type Config = {
  decimalPlaceToRoundAt?: number;
  maxDecimalPlaces?: number;
  forcedUnit?: Unit;
};

/**
 * This is a function that shortens a number into appropriate units (supports until trillion).
 *
 * Ex: formatUnit(100_000_000) => "1M"
 *
 * Ex: formatUnit(155_555_555, { decimalPlaceToRoundAt: 2, maxDecimalPlaces: 3 }) => "155.560M"
 *
 * @param {number} value The number to shorten.
 * @param {Object} [config] Optional
 * @param {number | undefined} [config.decimalPlaceToRoundAt] The decimal place to round at. Optional.
 * @param {number | undefined} [config.maxDecimalPlaces] The maximum number of decimal places to show. Optional.
 * @param {Unit | undefined} [config.forcedUnit] The unit to force. Optional.
 */

export default function formatUnit(value: number, config?: Config) {
  const { decimalPlaceToRoundAt, maxDecimalPlaces, forcedUnit } = config || {};

  const absValue = Math.abs(value);

  if (absValue > Number.MAX_SAFE_INTEGER) {
    throw Error("The given value is too large or too small to safely handle.");
  }
  if (
    (decimalPlaceToRoundAt && decimalPlaceToRoundAt < 0) ||
    (maxDecimalPlaces && maxDecimalPlaces < 0)
  ) {
    throw Error("Decimal places must be a positive number.");
  }
  if (
    decimalPlaceToRoundAt &&
    maxDecimalPlaces &&
    decimalPlaceToRoundAt > maxDecimalPlaces
  ) {
    throw Error(
      "The decimal place to round at cannot be greater than the number of decimal places."
    );
  }

  const sign: Sign = value < 0 ? "-" : "";

  if (forcedUnit) {
    return abbreviate(
      absValue,
      decimalPlaceToRoundAt,
      maxDecimalPlaces,
      forcedUnit,
      sign
    );
  }

  let unit: Unit = "";
  if (absValue >= 1e12) {
    unit = "T";
  } else if (absValue >= 1e9) {
    unit = "B";
  } else if (absValue >= 1e6) {
    unit = "M";
  } else if (absValue >= 1e3) {
    unit = "K";
  }

  return abbreviate(
    absValue,
    decimalPlaceToRoundAt,
    maxDecimalPlaces,
    unit,
    sign
  );
}

function abbreviate(
  value: number,
  decimalPlaceToRoundAt: number | undefined,
  maxDecimalPlaces: number | undefined,
  unit: Unit,
  sign: Sign
) {
  let roundedValue = 0;
  switch (unit) {
    case "T":
      roundedValue = value / 1e12;
      break;
    case "B":
      roundedValue = value / 1e9;
      break;
    case "M":
      roundedValue = value / 1e6;
      break;
    case "K":
      roundedValue = value / 1e3;
      break;
    case "":
      roundedValue = value;
      break;
  }

  let roundedValueStr = roundedValue.toString();

  if (decimalPlaceToRoundAt !== undefined) {
    const regex = new RegExp(`\\.\\d{${decimalPlaceToRoundAt + 1},}$`);
    const hasValidDecimals = regex.test(roundedValue.toString());
    if (hasValidDecimals) {
      roundedValueStr = roundedValue.toFixed(decimalPlaceToRoundAt);
    }
  }

  if (maxDecimalPlaces !== undefined) {
    roundedValueStr = Number(roundedValueStr).toFixed(maxDecimalPlaces);
  }

  const splitRoundedValueStr = roundedValueStr.split(".");
  const finalValueStr = `${Number(splitRoundedValueStr[0]).toLocaleString()}${
    splitRoundedValueStr[1] ? "." + splitRoundedValueStr[1] : ""
  }`;

  return `${sign}${finalValueStr}${unit}`;
}
