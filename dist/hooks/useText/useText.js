"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * This is a custom hook that handles text input with optional input validators.
 *
 * @param {Object} [config] Optional.
 * @param {string} [config.initialValue] Initial value of the text. Optional.
 * @param {Function[]} [config.validators] Array of validator functions. Optional.
 */
function useText(config) {
    const { initialValue = "", validators } = config || {};
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const [error, setError] = (0, react_1.useState)("");
    const onChange = (newVal) => {
        if (!validators) {
            setValue(newVal);
            return;
        }
        // Reverse the order of validators to show the first error.
        validators.reverse().forEach((validator) => {
            try {
                validator(newVal);
                setError("");
            }
            catch (error) {
                setError(error.message);
                return;
            }
        });
        setValue(newVal);
    };
    (0, react_1.useEffect)(() => {
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
exports.default = useText;
//# sourceMappingURL=useText.js.map