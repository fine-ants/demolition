"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A function that validates email format.
function validateEmail(email, options) {
  const { regExp, errorMessage } = options ?? {};
  const emailRegex =
    regExp ??
    new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!emailRegex.test(email)) {
    throw Error(errorMessage ?? "Invalid Email");
  }
}
exports.default = validateEmail;
//# sourceMappingURL=validateEmail.js.map
