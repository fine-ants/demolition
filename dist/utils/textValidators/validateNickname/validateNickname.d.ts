import { ValidatorConfig } from "../types";
/**
 * This is a function that validates nickname format.
 *
 * Default RegExp: at least one alphabet or one korean, can include digits, and between 2-10 characters.
 *
 * @param {string} nickname
 * @param {config} [config] Validator configurations. Optional.
 * @throws Will throw an error if `nickname` is invalid.
 */
export default function validateNickname(nickname: string, config?: ValidatorConfig): void;
