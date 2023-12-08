"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A function that validates nickname format.
// Default regExp: at least one alphabet or one korean, can include digits, 2~10 characters.
function validateNickname(nickname, options) {
  const { regExp, errorMessage } = options ?? {};
  const nicknameRegex =
    regExp ?? new RegExp(/^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,10}$/);
  if (!nicknameRegex.test(nickname)) {
    throw Error(
      errorMessage ??
        "Nickname must be between 2 to 5 characters and contain at least one alphabet or Korean, at least one number"
    );
  }
}
exports.default = validateNickname;
//# sourceMappingURL=validateNickname.js.map
