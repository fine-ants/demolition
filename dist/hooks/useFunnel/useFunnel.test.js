"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const useFunnel_1 = __importDefault(require("./useFunnel"));
function TestComponent() {
    const [Funnel, changeStep] = (0, useFunnel_1.default)(["step1", "step2"]);
    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Funnel, { children: [(0, jsx_runtime_1.jsx)(Funnel.Step, { name: "step1", children: "Step 1 UI" }), (0, jsx_runtime_1.jsx)(Funnel.Step, { name: "step2", children: "Step 2 UI" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => changeStep("step2"), children: "Next Step" })] }));
}
describe("useFunnel hook", () => {
    let consoleErrorSpy;
    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, "error");
        consoleErrorSpy.mockImplementation(() => { });
    });
    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });
    it("should return a tuple containing a Funnel component (with a Step property) and changeStep function", () => {
        const { result } = (0, react_1.renderHook)(() => (0, useFunnel_1.default)(["step1"]));
        const [Funnel, changeStep] = result.current;
        expect(Funnel).toBeDefined(); // Funnel
        expect(Funnel.Step).toBeDefined(); // Funnel.Step
        expect(changeStep).toBeDefined(); // changeStep
    });
    it("should only accept Funnel.Step as children in the Funnel component", () => {
        const { result } = (0, react_1.renderHook)(() => (0, useFunnel_1.default)(["step1", "step2"]));
        const [Funnel] = result.current;
        const renderWithInvalidChild = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(Funnel, { children: [(0, jsx_runtime_1.jsx)("div", { children: "I shouldn't be allowed" }), (0, jsx_runtime_1.jsx)(Funnel.Step, { name: "step1", children: "Step 1 UI" }), (0, jsx_runtime_1.jsx)(Funnel.Step, { name: "step2", children: "Step 2 UI" })] }) }));
        expect(renderWithInvalidChild).toThrow("div is not a <Funnel.Step> component. All component children of <Funnel> must be a <Funnel.Step>.");
    });
    it("should successfully render the first step in the funnel", () => {
        const { getByText, queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, {}));
        expect(getByText("Step 1 UI")).toBeDefined();
        expect(queryByText("Step 2 UI")).toBeNull();
    });
    it("should successfully unmount the first step and render the second step in the funnel", async () => {
        const { getByText, queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, {}));
        react_1.fireEvent.click(getByText("Next Step"));
        expect(getByText("Step 2 UI")).toBeDefined();
        expect(queryByText("Step 1 UI")).toBeNull();
    });
});
//# sourceMappingURL=useFunnel.test.js.map