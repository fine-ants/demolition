/**
 * This function adds a thousands delimiter(comma) to a numeric string.
 * @param {string | number} value - Value in numeric format
 * @param {string} delimiter - The thousands delimiter to use. (default: ",")
 * @throws {Error} If the input value is not a valid number.
 */
export function thousandsDelimiter(
  value: string | number,
  delimiter: string = ","
) {
  const numStr = String(value);

  if (isNaN(Number(removeThousandsDelimiter(numStr, delimiter)))) {
    throw Error(`Invalid number: "${numStr}"`);
  }

  const [intPart, decimalPart] = numStr.split(".");
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}

/**
 * This function removes thousands delimiter(commas) from a string.
 * @param {string} value - The input value to be processed
 * @param {string} delimiter - The thousands delimiter to remove. (default: ",")
 */
export function removeThousandsDelimiter(
  value: string,
  delimiter: string = ","
) {
  return value.replace(new RegExp(`\\${delimiter}`, "g"), "");
}
