"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
describe("validateEmail util function", () => {
    it("should not throw an error if string is a valid email", () => {
        expect(() => (0, _1.default)("blah@blah.com")).not.toThrow();
    });
    it("should throw an error if string is not a valid email", () => {
        expect(() => (0, _1.default)("blah")).toThrow();
    });
    it("should apply options if provided", () => {
        expect(() => (0, _1.default)("demolition@demolition.com", {
            regExp: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+com))$/),
            errorMessage: "Emails can only end in .com",
        })).not.toThrow();
        expect(() => (0, _1.default)("demolition@demolition.co", {
            regExp: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+com))$/),
            errorMessage: "Emails can only end in .com",
        })).toThrow();
    });
});
//# sourceMappingURL=validateEmail.test.js.map