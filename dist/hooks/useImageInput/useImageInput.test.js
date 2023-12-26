"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = require("react");
const useImageInput_1 = __importDefault(require("./useImageInput"));
function TestComponent() {
    const { imageFilePath, imageFile, error, onChange } = (0, useImageInput_1.default)();
    return ((0, jsx_runtime_1.jsxs)(react_2.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { title: "image-input", type: "file", accept: "image/*", onChange: onChange }), (0, jsx_runtime_1.jsx)("p", { title: "input-error", children: error }), (0, jsx_runtime_1.jsx)("p", { title: "image-file-path", children: imageFilePath }), (0, jsx_runtime_1.jsx)("p", { title: "image-file-name", children: imageFile?.name })] }));
}
describe("useImageInput hook", () => {
    it("should successfully change the image file", async () => {
        const { getByTitle } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, {}));
        react_1.fireEvent.change(getByTitle("image-input"), {
            target: {
                files: [
                    new File(["hello"], "hello.png", {
                        type: "image/png",
                    }),
                ],
            },
        });
        await (0, react_1.waitFor)(() => {
            expect(getByTitle("image-file-name").textContent).toBe("hello.png");
            expect(getByTitle("image-file-path").textContent).not.toBe("");
            expect(getByTitle("input-error").textContent).toBe("");
        });
    });
    it("should not accept the image file if it is too large", async () => {
        const { getByTitle } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, {}));
        const largeFile = new File(["0".repeat(2000001)], "largeFile.png", {
            type: "image/png",
        });
        (0, react_1.act)(() => {
            react_1.fireEvent.change(getByTitle("image-input"), {
                target: {
                    files: [largeFile],
                },
            });
        });
        await (0, react_1.waitFor)(() => {
            expect(getByTitle("image-file-name").textContent).toBe("");
            expect(getByTitle("image-file-path").textContent).toBe("");
            expect(getByTitle("input-error").textContent).toBe("Max. Size: 2MB");
        });
    });
    it("should not accept the image file if the extension is invalid", async () => {
        const { getByTitle } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, {}));
        const svgFile = new File(["0".repeat(2000000)], "svgFile.svg", {
            type: "image/svg+xml",
        });
        (0, react_1.act)(() => {
            react_1.fireEvent.change(getByTitle("image-input"), {
                target: {
                    files: [svgFile],
                },
            });
        });
        await (0, react_1.waitFor)(() => {
            expect(getByTitle("image-file-name").textContent).toBe("");
            expect(getByTitle("image-file-path").textContent).toBe("");
            expect(getByTitle("input-error").textContent).toBe("Image extension not supported");
        });
    });
});
//# sourceMappingURL=useImageInput.test.js.map