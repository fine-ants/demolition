"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a function that validates nickname format.
 *
 * Default RegExp: at least one alphabet or one korean, can include digits, and between 2-10 characters.
 *
 * @param {string} nickname
 * @param {config} [config] Validator configurations. Optional.
 * @throws Will throw an error if `nickname` is invalid.
 */
function validateNickname(nickname, config) {
    const { regExp, errorMessage } = config ?? {};
    const nicknameRegex = regExp ?? new RegExp(/^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,10}$/);
    if (!nicknameRegex.test(nickname)) {
        throw Error(errorMessage ??
            "Nickname must be between 2 to 5 characters and contain at least one alphabet or Korean, at least one number");
    }
}
exports.default = validateNickname;
//# sourceMappingURL=validateNickname.js.map