"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a function that validates email format.
 *
 * Default RegExp: generic email format. Provide a more specific RegExp via `config` if needed.
 *
 * @param {string} email
 * @param {config} [config] Validator configurations. Optional.
 * @throws Will throw an error if `email` is invalid.
 */
function validateEmail(email, config) {
    const { regExp, errorMessage } = config ?? {};
    const emailRegex = regExp ??
        new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegex.test(email)) {
        throw Error(errorMessage ?? "Invalid Email");
    }
}
exports.default = validateEmail;
//# sourceMappingURL=validateEmail.js.map