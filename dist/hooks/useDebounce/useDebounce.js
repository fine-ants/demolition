"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * A custom hook that debounces a value.
 *
 * @param {any} value
 * @param {number} delay - in milliseconds (default 250ms).
 */
function useDebounce(value, delay = 250) {
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
exports.default = useDebounce;
//# sourceMappingURL=useDebounce.js.map