"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = require("react");
const useDebounce_1 = __importDefault(require("./useDebounce"));
describe("useText hook", () => {
    it("should successfully change the value", () => {
        jest.useFakeTimers();
        const mockSetTimeout = jest.spyOn(global, "setTimeout");
        function Component() {
            const [text, setText] = (0, react_2.useState)("");
            const debouncedValue = (0, useDebounce_1.default)(text, 500);
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { title: "input", type: "text", value: text, onChange: (e) => setText(e.target.value) }), (0, jsx_runtime_1.jsx)("p", { title: "debounced-value", children: debouncedValue })] }));
        }
        const { getByTitle } = (0, react_1.render)((0, jsx_runtime_1.jsx)(Component, {}));
        const input = getByTitle("input");
        const debouncedValue = getByTitle("debounced-value");
        react_1.fireEvent.change(input, { target: { value: "hello" } });
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(250);
        });
        expect(debouncedValue.textContent).toBe("");
        react_1.fireEvent.change(input, { target: { value: "hello world" } });
        (0, react_1.act)(() => {
            jest.advanceTimersByTime(500);
        });
        expect(mockSetTimeout).toHaveBeenCalledTimes(3); // initial render + 2 fireEvents
        expect(debouncedValue.textContent).toBe("hello world");
    });
});
//# sourceMappingURL=useDebounce.test.js.map