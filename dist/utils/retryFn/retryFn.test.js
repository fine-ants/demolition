"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retryFn_1 = __importDefault(require("./retryFn"));
describe("retryFn util function", () => {
    const asyncFn = jest.fn();
    afterEach(() => {
        asyncFn.mockRestore();
    });
    it("should return a successful result on the first attempt", async () => {
        asyncFn.mockImplementationOnce(() => Promise.resolve("success"));
        const res = await (0, retryFn_1.default)(asyncFn);
        expect(asyncFn.mock.calls).toHaveLength(1);
        expect(res).toBe("success");
    });
    it("should return a successful result on the second attempt", async () => {
        asyncFn
            .mockImplementationOnce(() => Promise.reject("error"))
            .mockImplementationOnce(() => Promise.resolve("success"));
        const res = await (0, retryFn_1.default)(asyncFn);
        expect(asyncFn.mock.calls).toHaveLength(2);
        expect(res).toBe("success");
    });
    it("should return a successful result on the third attempt", async () => {
        asyncFn
            .mockImplementationOnce(() => Promise.reject("error"))
            .mockImplementationOnce(() => Promise.reject("error"))
            .mockImplementationOnce(() => Promise.resolve("success"));
        const res = await (0, retryFn_1.default)(asyncFn);
        expect(asyncFn.mock.calls).toHaveLength(3);
        expect(res).toBe("success");
    });
    it("should throw an error after the third attempt", async () => {
        asyncFn.mockImplementation(() => Promise.reject("error"));
        try {
            await (0, retryFn_1.default)(asyncFn);
        }
        catch (error) {
            expect(asyncFn.mock.calls).toHaveLength(3);
            expect(error).toBe("error");
        }
    });
    it("should throw an error after the given number of retries", async () => {
        asyncFn.mockImplementation(() => Promise.reject("error"));
        try {
            await (0, retryFn_1.default)(asyncFn, 2);
        }
        catch (error) {
            expect(asyncFn.mock.calls).toHaveLength(2);
            expect(error).toBe("error");
        }
    });
});
//# sourceMappingURL=retryFn.test.js.map