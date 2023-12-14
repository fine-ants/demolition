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
export default function useText(config?: Props): {
    value: string;
    error: string;
    isError: boolean;
    onChange: (newVal: string) => void;
};
export {};
