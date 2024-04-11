/**
 * This function adds a thousands delimiter(comma) to a numeric string.
 * @param {string | number} value - Value in numeric format
 * @throws {Error} If the input value is not a valid number.
 */
export function thousandsDelimiter(value: string | number) {
  const numStr = String(value);

  if (isNaN(Number(removeThousandsDelimiter(numStr)))) {
    throw Error(`Invalid number: "${numStr}"`);
  }

  const [intPart, decimalPart] = numStr.split(".");
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}

/**
 * This function removes thousands delimiter(commas) from a string.
 * @param {string} value - The input value to be processed
 */
export function removeThousandsDelimiter(value: string) {
  return value.replace(/,/g, "");
}
