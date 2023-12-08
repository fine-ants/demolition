"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const textValidators_1 = require("@utils/textValidators");
const test_utils_1 = require("react-dom/test-utils");
const useText_1 = __importDefault(require("./useText"));
describe("useText hook", () => {
  it("should successfully change the value", () => {
    const { result } = (0, react_1.renderHook)(() => (0, useText_1.default)());
    const { onChange } = result.current;
    (0, test_utils_1.act)(() => {
      onChange("hello");
    });
    expect(result.current.value).toBe("hello");
    expect(result.current.error).toBe("");
  });
  it("should throw an error for the first validator if multiple validators throw errors", () => {
    const { result } = (0, react_1.renderHook)(() =>
      (0, useText_1.default)({
        validators: [
          textValidators_1.validateEmail,
          textValidators_1.validatePassword,
        ],
      })
    );
    const { onChange } = result.current;
    (0, test_utils_1.act)(() => {
      onChange("hello");
    });
    expect(result.current.error).toBe("Invalid Email");
  });
});
//# sourceMappingURL=useText.test.js.map
