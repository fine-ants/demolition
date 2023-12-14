"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useText(options) {
    const { initialValue = "", validators } = options || {};
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
    return {
        value,
        error,
        isError: error !== "",
        onChange,
    };
}
exports.default = useText;
//# sourceMappingURL=useText.js.map