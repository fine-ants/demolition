import { ValidatorConfig } from "../types";

/**
 * This is a function that validates password format.
 *
 * Default RegExp: at least one alphabet, one number, one special character, and between 8-16 characters.
 *
 * @param {string} password
 * @param {config} [config] Validator configurations. Optional.
 * @throws Will throw an error if `password` is invalid.
 */
export default function validatePassword(
  password: string,
  config?: ValidatorConfig
) {
  const { regExp, errorMessage } = config ?? {};

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
