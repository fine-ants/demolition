"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
describe("validatePassword util function", () => {
    it("should not throw an error if string is a valid password", () => {
        expect(() => (0, _1.default)("hello123!")).not.toThrow();
    });
    it("should throw an error if string is not a valid password", () => {
        expect(() => (0, _1.default)("hello")).toThrow();
    });
    it("should apply options if provided", () => {
        expect(() => (0, _1.default)("demo1", {
            regExp: new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/),
            errorMessage: "Password needs to be between 5-10 characters and must contain at least one alphabet, number",
        })).not.toThrow();
        expect(() => (0, _1.default)("demolition1!", {
            regExp: new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/),
            errorMessage: "Password needs to be between 8-16 characters and must contain at least one alphabet, number",
        })).toThrow();
    });
});
//# sourceMappingURL=validatePassword.test.js.map