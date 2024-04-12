import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "../thousandsDelimiter/thousandsDelimiter";

type Props = {
  value: string;
  callback: (value: string) => void;
  includeDelimiter?: boolean;
  delimiter?: string;
};

/**
 * This function executes the provided callback using the provided value if the value is an empty string or number.
 *
 * Useful for ensuring numerical input in onChange events.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.value - The input value to be processed by the callback function.
 * @param {(value: string) => void} props.callback - A callback function receiving the value only if it's numeric or an empty string.
 * @param {boolean} [props.includeDelimiter=true] - A boolean flag to include thousands delimiter in the formatted value. (default: true)
 * @param {string} [props.delimiter=","] - The thousands delimiter to use. (default: ",")
 * **/

export function executeCbIfNumeric({
  value,
  callback,
  includeDelimiter = true,
  delimiter = ",",
}: Props) {
  const parsedValue = removeThousandsDelimiter(value, delimiter);

  if (parsedValue === "") {
    callback(parsedValue);
  } else if (!isNaN(Number(parsedValue))) {
    callback(
      includeDelimiter
        ? thousandsDelimiter(parsedValue, delimiter)
        : parsedValue
    );
  }
}
