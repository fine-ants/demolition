import { useEffect, useState } from "react";

type Props = {
  initialValue?: string;
  validators?: Array<(value: string) => void>;
};

/**
 * This is a custom hook that handles text input with optional input validators.
 *
 * @param {Object} [config] Optional.
 * @param {string} [config.initialValue] Initial value of the text. Optional.
 * @param {Function[]} [config.validators] Array of validator functions. Optional.
 */
export default function useText(config?: Props) {
  const { initialValue = "", validators } = config || {};

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (newVal: string) => {
    if (!validators) {
      setValue(newVal);
      return;
    }

    // Reverse the order of validators to show the first error.
    validators.reverse().forEach((validator) => {
      try {
        validator(newVal);
        setError("");
      } catch (error) {
        setError((error as Error).message);
        return;
      }
    });

    setValue(newVal);
  };

  useEffect(() => {
    onChange(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    value,
    error,
    isError: error !== "",
    onChange,
  };
}
