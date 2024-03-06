"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a function that retries an async function `numRetries` times before throwing an error.
 *
 * @param {Function} asyncFn A function that returns a Promise.
 * @param {string} numRetries Default = 3.
 */
async function retryFn(asyncFn, numRetries = 3) {
    try {
        return await asyncFn();
    }
    catch (error) {
        if (numRetries > 1) {
            return await retryFn(asyncFn, numRetries - 1);
        }
        else {
            throw error;
        }
    }
}
exports.default = retryFn;
//# sourceMappingURL=retryFn.js.map