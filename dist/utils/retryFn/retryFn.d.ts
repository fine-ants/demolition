/**
 * This is a function that retries an async function `numRetries` times before throwing an error.
 *
 * @param {Function} asyncFn A function that returns a Promise.
 * @param {string} numRetries Default = 3.
 */
export default function retryFn<T>(asyncFn: () => Promise<T>, numRetries?: number): Promise<T>;
