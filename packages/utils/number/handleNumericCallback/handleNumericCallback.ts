import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "../thousandsDelimiter/thousandsDelimiter";

/**
 * This function executes the provided callback using the provided value if the value is an empty string or number.
 *
 * Useful for ensuring numerical input in onChange events.
 *
 * @param {string} value - The input value to be processed by the callback function.
 * @param {(value: string) => void} callback - A callback function receiving the value only if it's numeric or an empty string.
 * @param {boolean} [commas=true] - A boolean flag to include thousands delimiter(comma) in the formatted value. (default: true).
 */
export function handleNumericCallback(
  value: string,
  callback: (value: string) => void,
  commas: boolean = true
) {
  const parsedValue = removeThousandsDelimiter(value);

  if (parsedValue === "") {
    callback(parsedValue);
  } else if (!isNaN(Number(parsedValue))) {
    callback(commas ? thousandsDelimiter(parsedValue) : parsedValue);
  }
}
