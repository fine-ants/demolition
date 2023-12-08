"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A function that validates password format.
// Default regExp: at least one alphabet, one number, one special character, 8~16 characters.
function validatePassword(password, options) {
  const { regExp, errorMessage } = options ?? {};
  const passwordRegex =
    regExp ??
    new RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/
    );
  if (!passwordRegex.test(password)) {
    throw Error(
      errorMessage ??
        "Password needs to be between 8-16 characters and must contain at least one alphabet, number and special character"
    );
  }
}
exports.default = validatePassword;
//# sourceMappingURL=validatePassword.js.map
