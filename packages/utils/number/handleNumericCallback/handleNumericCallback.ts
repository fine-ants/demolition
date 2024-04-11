import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "../thousandsDelimiter/thousandsDelimiter";

/**
 * This function if the value is empty string or numerical, it calls the callback with the value as an argument.
 *
 * Useful for ensuring numerical input in onChange events.
 *
 * @param {string} value - The input value to be processed.
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
