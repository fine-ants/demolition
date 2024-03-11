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

    for (const validator of validators) {
      try {
        validator(newVal);
      } catch (error) {
        setError((error as Error).message);
        break;
      }
    }

    setValue(newVal);
  };

  useEffect(() => {
    onChange(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isError = error !== "" && value !== "";

  return {
    value,
    error,
    isError,
    onChange,
  };
}
