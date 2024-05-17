import { useCallback, useState } from "react";

/**
 * This is a custom hook that makes it more convenient to use and manipulate boolean states.
 * Ex: `setOpposite()` will toggle the current boolean state.
 *
 * @param {boolean} [initialState] Optional. Defaults to `false`.
 */
export default function useBoolean(initialState: boolean = false) {
  const [state, setState] = useState(initialState);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const setOpposite = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return { state, setState, setTrue, setFalse, setOpposite };
}
