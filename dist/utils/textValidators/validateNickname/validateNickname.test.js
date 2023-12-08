"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
describe("validateNickname util function", () => {
  it("should not throw an error if string is a valid nickname", () => {
    expect(() => (0, _1.default)("demolition")).not.toThrow();
  });
  it("should throw an error if string is not a valid nickname", () => {
    expect(() => (0, _1.default)("demolition1!")).toThrow();
  });
  it("should apply options if provided", () => {
    expect(() =>
      (0, _1.default)("Demo", {
        regExp: new RegExp(/^[a-zA-Z]{2,5}$/),
        errorMessage:
          "Nickname needs to be between 2 to 5 Lowercase/Uppercase Alphabets",
      })
    ).not.toThrow();
    expect(() =>
      (0, _1.default)("demolition1", {
        regExp: new RegExp(/^[a-zA-Z]{2,5}$/),
        errorMessage:
          "Nickname needs to be between 2 to 5 Lowercase/Uppercase Alphabets",
      })
    ).toThrow();
  });
});
//# sourceMappingURL=validateNickname.test.js.map
